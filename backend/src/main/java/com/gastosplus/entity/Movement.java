package com.gastosplus.entity;

import com.gastosplus.enums.PaymentMethods;
import com.gastosplus.enums.TypeMovement;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "movements")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Movement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "value_mov", length = 50, nullable = false)
    private BigDecimal valueMov = BigDecimal.ZERO;

    @Column(name = "date_mov", nullable = false)
    private LocalDate dateMov;

    @Column(name = "payment_methods", length = 50, nullable = false)
    @Enumerated(EnumType.STRING)
    private PaymentMethods paymentMethods;

    @Column(name = "type_mov", length = 50, nullable = false)
    @Enumerated(EnumType.STRING)
    private TypeMovement typeMov;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    public Movement(BigDecimal valueMov, LocalDate dateMov, PaymentMethods paymentMethods, TypeMovement typeMov, Account account, Category category) {
        this.valueMov = valueMov;
        this.dateMov = dateMov;
        this.paymentMethods = paymentMethods;
        this.typeMov = typeMov;
        this.account = account;
        this.category = category;
    }
}
