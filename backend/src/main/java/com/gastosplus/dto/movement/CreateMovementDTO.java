package com.gastosplus.dto.movement;

import com.gastosplus.enums.PaymentMethods;
import com.gastosplus.enums.TypeMovement;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.math.BigDecimal;
import java.time.LocalDate;

public record CreateMovementDTO(
        String description,

        @NotNull(message = "The transaction value is mandatory.")
        @Positive(message = "The value must be positive.")
        BigDecimal valueMov,

        LocalDate dateMov,

        PaymentMethods paymentMethods,

        TypeMovement typeMov,

        Long categoryId,

        String accountId,

        String observation
) { }
