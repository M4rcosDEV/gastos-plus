package com.gastosplus.repository.projection;

import java.math.BigDecimal;

public interface MonthProjection {
    BigDecimal getCurrentMonth();
    BigDecimal getPreviousMonth();
}
