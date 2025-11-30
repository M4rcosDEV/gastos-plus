package com.gastosplus.service;

import com.gastosplus.dto.account.AccountResponseDTO;
import com.gastosplus.dto.account.CreateAccountDTO;
import com.gastosplus.dto.account.UpdateAccountDTO;
import com.gastosplus.entity.Account;
import com.gastosplus.entity.Movement;
import com.gastosplus.entity.User;
import com.gastosplus.enums.PaymentMethods;
import com.gastosplus.enums.TypeMovement;
import com.gastosplus.mapper.AccountMapper;
import com.gastosplus.repository.AccountRepository;
import com.gastosplus.repository.MovementRepository;
import com.gastosplus.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;

    private final MovementRepository movementRepository;

    private final AccountMapper accountMapper;

    private final UserRepository userRepository;

    public void createAccount(CreateAccountDTO data){

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();

        boolean accountExists = accountRepository
                .existsByAccountNameIgnoreCaseAndUserId(data.accountName(), user.getId());

        if (accountExists) {
            throw new RuntimeException("O nome da conta já existe para este usuário.");
        }

        Account account = new Account(
                data.accountName(),
                data.balance(),
                data.color(),
                data.avatar()
        );

        account.setUser(user);

        accountRepository.save(account);

        Movement initialMove = new Movement(
            data.balance(),
            LocalDate.now(),
            PaymentMethods.DINHEIRO,
            TypeMovement.INITIAL,
            account,
            "Saldo inicial"
        );

        movementRepository.save(initialMove);
    }

    @Transactional
    public void updateAccount(String id, UpdateAccountDTO dto) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();

        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        boolean accountExists = accountRepository
                .existsByAccountNameIgnoreCaseAndUserId(account.getAccountName(), user.getId());

        if ("Carteira".equalsIgnoreCase(dto.accountName())) {
            throw new RuntimeException("Este nome é reservado e não pode ser utilizado.");
        }

        boolean nameExists = accountRepository
                .existsByAccountNameIgnoreCaseAndUserIdAndIdNot(
                        dto.accountName(),
                        user.getId(),
                        id
                );

        if (nameExists) {
            throw new RuntimeException("Já existe outra conta com esse nome.");
        }

        accountMapper.updateAccountFromDto(dto, account);

        accountRepository.save(account);
    }

    public List<Account> findAllByUserId(Long userId){
        return accountRepository.findByUserId(userId);
    }
}
