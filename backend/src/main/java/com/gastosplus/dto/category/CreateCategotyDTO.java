package com.gastosplus.dto.category;

import com.gastosplus.entity.User;

public record CreateCategotyDTO(String name, String icon, String color, String observacao, Long userId) {
}
