package com.gastosplus.repository;

import com.gastosplus.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    public boolean existsByNameIgnoreCaseAndUserId (
            String name,
            long id
    );
}
