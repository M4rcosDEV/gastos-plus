package com.gastosplus.dto.account;

import java.math.BigDecimal;

public record CreateAccountDTO(
        String accountName,
        BigDecimal balance,
        Long userId
) { }
