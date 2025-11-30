package com.gastosplus.repository;

import com.gastosplus.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account, String> {

    public List<Account> findByUserId(Long userId);

    public boolean existsByAccountNameIgnoreCaseAndUserId (
            String accountName,
            long id
    );

    boolean existsByAccountNameIgnoreCaseAndUserIdAndIdNot(
            String accountName,
            Long userId,
            String id
    );
}
