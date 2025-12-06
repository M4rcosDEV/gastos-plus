package com.gastosplus.service;

import com.gastosplus.dto.movement.CreateMovementDTO;
import com.gastosplus.dto.movement.MovementFilterDTO;
import com.gastosplus.dto.movement.MovementResponseDTO;
import com.gastosplus.entity.Account;
import com.gastosplus.entity.Category;
import com.gastosplus.entity.Movement;
import com.gastosplus.enums.TypeMovement;
import com.gastosplus.mapper.MovementMapper;
import com.gastosplus.repository.AccountRepository;
import com.gastosplus.repository.CategoryRepository;
import com.gastosplus.repository.MovementRepository;
import com.gastosplus.specification.MovementSpecs;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MovementService {

    private final MovementRepository movementRepository;

    private final AccountRepository accountRepository;

    private final CategoryRepository categoryRepository;

    private final MovementMapper movementMapper;

    @Transactional
    public void registerMovement(CreateMovementDTO data) {
        Account account = accountRepository.findById(data.accountId())
                .orElseThrow(() -> new RuntimeException("Account not found"));

        Category category = categoryRepository.findById(data.categoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Movement movement = movementMapper.toEntity(data);

        movement.setAccount(account);
        movement.setCategory(category);

        movementRepository.save(movement);

        BigDecimal currentBalance = account.getBalance();

        if(data.typeMov() == TypeMovement.INCOME){
            BigDecimal newBalance = currentBalance.add(data.valueMov());
            account.setBalance(newBalance);
            accountRepository.save(account);

        } else if (data.typeMov() == TypeMovement.EXPENSE) {
            BigDecimal newBalance = currentBalance.subtract(data.valueMov());
            account.setBalance(newBalance);
            accountRepository.save(account);
        }else{
            throw new IllegalArgumentException("Type movement not supported");
        }
    }

    public List<Map<String, Object>> getLast6Months(Long userId, String type){

        var teste = movementRepository.sumLast6MonthsByType(userId, type);
        System.out.println("?>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        System.out.println(teste);
        return teste;
    }

    public Page<MovementResponseDTO> findAllFilter(MovementFilterDTO filter, Pageable pageable){
        Specification<Movement> spec = MovementSpecs.filter(filter);

        return movementRepository.findAll(spec, pageable)
                .map(movement -> new MovementResponseDTO(
                        movement.getDescription(),
                        movement.getDateMov(),
                        movement.getPaymentMethods(),
                        movement.getTypeMov(),
                        movement.getValueMov(),
                        movement.getAccount().getId(),
                        movement.getCategory().getId()
                ));

    }

}
