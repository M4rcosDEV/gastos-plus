package com.gastosplus.service;

import com.gastosplus.dto.movement.MonthlyComparisonDTO;
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
import com.gastosplus.repository.projection.MonthProjection;
import com.gastosplus.specification.MovementSpecs;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.math.RoundingMode;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MovementService {

    private final MovementRepository movementRepository;

    private final AccountRepository accountRepository;

    private final CategoryRepository categoryRepository;

    private final MovementMapper movementMapper;

    // @Scheduled(cron = "0 * * * * *", zone = "America/Sao_Paulo")
    @Scheduled(cron = "0 0 0,12 * * *", zone = "America/Sao_Paulo") // 00:00 e 12:00
    public void processarMovimentosFuturos() {
        System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
        System.out.println("Processando movimentos futuros...");
    }

    @Transactional
    public void registerMovement(CreateMovementDTO data) {
        Account account = accountRepository.findById(data.accountId())
                .orElseThrow(() -> new RuntimeException("Account not found"));

        Category category = null;

        if(data.categoryId() != null){
            category = categoryRepository.findById(data.categoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
        }

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
        return movementRepository.sumLast6MonthsByType(userId, type);
    }

    public MonthlyComparisonDTO getMonthBalanceTotal(Long userId){
        MonthProjection projection = movementRepository.getMonthBalance(userId);
        return buildMonthlyComparison(projection);
    }

    public MonthlyComparisonDTO getIncome(Long userId){
        MonthProjection projection = movementRepository.getIncome(userId);
        return buildMonthlyComparison(projection);
    }

    public MonthlyComparisonDTO getExpense(Long userId){
        MonthProjection projection = movementRepository.getExpense(userId);
        return buildMonthlyComparison(projection);
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

    public MonthlyComparisonDTO buildMonthlyComparison(MonthProjection projection){
        BigDecimal current =
                Optional.ofNullable(projection.getCurrentMonth()).orElse(BigDecimal.ZERO);
        BigDecimal previous =
                Optional.ofNullable(projection.getPreviousMonth()).orElse(BigDecimal.ZERO);

        BigDecimal percent = calculatePercentage(previous, current);

        return new MonthlyComparisonDTO(current, previous, percent);
    }

    private static BigDecimal calculatePercentage(BigDecimal previousTotal, BigDecimal currentTotal) {
        BigDecimal percent;
        BigDecimal differenceTotal = currentTotal.subtract(previousTotal);

        if(previousTotal.compareTo(BigDecimal.ZERO) == 0){
            if(currentTotal.compareTo(BigDecimal.ZERO) > 0){
                percent = BigDecimal.valueOf(100);
            }else{
                percent = BigDecimal.ZERO;
            }
        }else{
            final int SCALE = 4;
            BigDecimal ratio = differenceTotal.divide(previousTotal.abs(), SCALE, RoundingMode.HALF_UP);
            percent = ratio.multiply(new BigDecimal(100)).setScale(1, RoundingMode.HALF_UP); ;

        }
        return percent;
    }

}
