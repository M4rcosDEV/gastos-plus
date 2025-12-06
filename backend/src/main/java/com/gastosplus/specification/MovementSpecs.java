package com.gastosplus.specification;

import com.gastosplus.dto.movement.MovementFilterDTO;
import com.gastosplus.entity.Movement;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;


public class MovementSpecs {

    public static Specification<Movement> filter(MovementFilterDTO filter){
        return ((root, query, cb) -> {

            List<Predicate> predicates = new ArrayList<>();

            if (filter.description() != null && !filter.description().isEmpty()) {
                predicates.add(cb.like(cb.lower(root.get("description")), "%" + filter.description().toLowerCase() + "%"));
            }

            if (filter.date() != null) {
                predicates.add(cb.equal(root.get("dateMov"), filter.date()));
            }

            if (filter.startDate() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("dateMov"), filter.startDate()));
            }

            if (filter.endDate() != null){
                predicates.add(cb.lessThanOrEqualTo(root.get("dateMov"), filter.endDate()));
            }


            if (filter.paymentMethods() != null) {
                predicates.add(cb.equal(root.get("paymentMethods"), filter.paymentMethods()));
            }

            if (filter.typeMov() != null) {
                predicates.add(cb.equal(root.get("typeMov"), filter.typeMov()));
            }

            if (filter.minValue() != null) {
                predicates.add(cb.greaterThanOrEqualTo(root.get("valueMov"), filter.minValue()));
            }

            if (filter.maxValue() != null) {
                predicates.add(cb.lessThanOrEqualTo(root.get("valueMov"), filter.maxValue()));
            }

            if (filter.accountId() != null) {
                predicates.add(cb.equal(root.get("account").get("id"), filter.accountId()));
            }

            if (filter.userId() != null) {
                predicates.add(cb.equal(root.get("account").get("user").get("id"), filter.userId()));
            }

            return cb.and(predicates.toArray(new Predicate[0]));
        });
    }

}
