package com.gastosplus.dto.movement;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.gastosplus.enums.PaymentMethods;
import com.gastosplus.enums.TypeMovement;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;
import java.time.LocalDate;

public record CreateMovementDTO(
        @JsonProperty("value_mov")
        @NotNull(message = "The transaction value is mandatory.")
        @Positive(message = "The value must be positive.")
        BigDecimal valueMov,

        @JsonProperty("date_mov")
        LocalDate dateMov,

        @JsonProperty("payment_methods")
        PaymentMethods paymentMethods,

        @JsonProperty("type_mov")
        TypeMovement typeMov,

        @JsonProperty("category_id")
        Long categoryId,

        @JsonProperty("account_id")
        Long accountId
) { }
