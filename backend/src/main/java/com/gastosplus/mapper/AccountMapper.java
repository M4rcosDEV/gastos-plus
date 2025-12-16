package com.gastosplus.mapper;

import com.gastosplus.dto.account.UpdateAccountDTO;
import com.gastosplus.entity.Account;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface AccountMapper {
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "observation", ignore = true)
    @Mapping(target = "user", ignore = true)
    void updateAccountFromDto(UpdateAccountDTO dto, @MappingTarget Account account);
}