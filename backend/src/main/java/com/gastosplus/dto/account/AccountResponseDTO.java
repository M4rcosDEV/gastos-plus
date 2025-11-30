package com.gastosplus.dto.account;

import com.gastosplus.entity.Account;

import java.math.BigDecimal;

public record AccountResponseDTO(
        String id,
        String accountName,
        BigDecimal balance,
        String avatar,
        String color
){
    public static AccountResponseDTO fromEntity(Account ac){
        return new AccountResponseDTO(
                ac.getId(),
                ac.getAccountName(),
                ac.getBalance(),
                ac.getAvatar(),
                ac.getColor()
        );
    }
}
