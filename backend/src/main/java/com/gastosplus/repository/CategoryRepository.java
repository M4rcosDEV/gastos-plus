package com.gastosplus.repository;

import com.gastosplus.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    public boolean existsByNameIgnoreCaseAndUserId (
            String name,
            long id
    );

    public List<Category> findAllByUserId(
            Long userId
    );
}
