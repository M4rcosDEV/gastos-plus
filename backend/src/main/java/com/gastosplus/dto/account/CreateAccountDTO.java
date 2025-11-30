package com.gastosplus.dto.account;

import com.gastosplus.entity.User;

import java.math.BigDecimal;

public record CreateAccountDTO(
        String accountName,
        BigDecimal balance,
        String color,
        String avatar
) { }
