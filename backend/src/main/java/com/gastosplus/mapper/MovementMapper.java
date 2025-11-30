package com.gastosplus.mapper;

import com.gastosplus.dto.movement.CreateMovementDTO;
import com.gastosplus.entity.Movement;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface MovementMapper {

    Movement toEntity(CreateMovementDTO dto);

}
