package com.gastosplus.dto.movement;

import java.math.BigDecimal;

public record MonthlyComparisonDTO(
        BigDecimal currentTotal,
        BigDecimal previousTotal,
        BigDecimal percent
) {}
