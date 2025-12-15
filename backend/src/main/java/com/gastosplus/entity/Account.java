package com.gastosplus.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.math.BigDecimal;

@Entity
@Table(name = "accounts")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "account_name", length = 50, nullable = false)
    private String accountName;

    @Column(nullable = false)
    private BigDecimal balance = BigDecimal.ZERO;

    private String color;

    private String avatar;

    @Column(columnDefinition = "TEXT")
    private String observation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    public Account(String accountName, BigDecimal balance, String color, String avatar) {
        this.accountName = accountName;
        this.balance = balance;
        this.color = color;
        this.avatar = avatar;
    }
}
