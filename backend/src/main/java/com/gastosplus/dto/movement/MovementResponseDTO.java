package com.gastosplus.dto.movement;

import com.gastosplus.enums.PaymentMethods;
import com.gastosplus.enums.TypeMovement;

import java.math.BigDecimal;
import java.time.LocalDate;

public record MovementResponseDTO(
        LocalDate DateMov,
        PaymentMethods paymentMethods,
        TypeMovement typeMovement,
        BigDecimal valueMov,
        String accountId,
        Long categoryId
) { }
