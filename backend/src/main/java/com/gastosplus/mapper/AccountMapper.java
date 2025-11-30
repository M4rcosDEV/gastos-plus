package com.gastosplus.mapper;

import com.gastosplus.dto.account.CreateAccountDTO;
import com.gastosplus.dto.account.UpdateAccountDTO;
import com.gastosplus.entity.Account;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface AccountMapper {

    Account toEntity(CreateAccountDTO dto);

    void updateAccountFromDto(UpdateAccountDTO dto, @MappingTarget Account account);
}