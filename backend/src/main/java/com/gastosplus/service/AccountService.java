package com.gastosplus.service;

import com.gastosplus.dto.account.CreateAccountDTO;
import com.gastosplus.entity.Account;
import com.gastosplus.entity.User;
import com.gastosplus.repository.AccountRepository;
import com.gastosplus.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;

    private final UserRepository userRepository;

    public void createAccount(CreateAccountDTO data){
        User user = userRepository.findById(data.userId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Account account = new Account(
                data.accountName(),
                data.balance(),
                user
        );

        accountRepository.save(account);
    }

}
