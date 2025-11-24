package com.gastosplus.dto.movement;

import com.gastosplus.enums.PaymentMethods;
import com.gastosplus.enums.TypeMovement;

import java.math.BigDecimal;
import java.time.LocalDate;

public record MovementFilterDTO(
        LocalDate date,
        LocalDate startDate,
        LocalDate endDate,
        PaymentMethods paymentMethods,
        TypeMovement typeMov,
        BigDecimal minValue,
        BigDecimal maxValue,
        Long accountId,
        Long userId
) { }
