package com.gastosplus.dto.user;

import java.time.Instant;

public record LoginResponseDTO(String token, Instant expiresIn, UserDTO user) {
}
