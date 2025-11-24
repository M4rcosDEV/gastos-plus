package com.gastosplus.dto.user;

import com.gastosplus.enums.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterDTO(
        @NotBlank(message = "Nome obrigatório")
        String name,

        @NotBlank(message = "email obrigatório")
        @Email(message = "Email invalido")
        String email,

        @NotBlank(message = "Senha obrigatório")
        @Size(min=4, message = "Senha deve ter pelo menos 4 caracteres")
        String password,

        String photoUrl,

        UserRole role
) { }
