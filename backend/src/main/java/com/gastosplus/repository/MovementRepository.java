package com.gastosplus.repository;

import com.gastosplus.entity.Movement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface MovementRepository extends JpaRepository<Movement, Long>, JpaSpecificationExecutor<Movement> {
    @Query(value = """
        SELECT 
            to_char(m.date_mov, 'YYYY-MM') AS month,
            SUM(m.value_mov) AS total
        FROM movements m
        JOIN accounts a ON m.account_id = a.id
        JOIN users u ON a.user_id = u.id
        WHERE u.id = :userId
          AND m.type_mov = :type
          AND m.date_mov >= (CURRENT_DATE - INTERVAL '6 months')
        GROUP BY 1
        ORDER BY 1
        """, nativeQuery = true)
    List<Map<String, Object>> sumLast6MonthsByType(
            @Param("userId") Long userId,
            @Param("type") String type
    );

}
