package com.gastosplus.service;

import com.gastosplus.dto.category.CreateCategotyDTO;
import com.gastosplus.entity.Category;
import com.gastosplus.entity.User;
import com.gastosplus.repository.CategoryRepository;
import com.gastosplus.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    private final UserRepository userRepository;

    public void createCategory(CreateCategotyDTO data){

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();

        boolean categoryExists = categoryRepository
                .existsByNameIgnoreCaseAndUserId(data.name(), user.getId());

        if (categoryExists) {
            throw new RuntimeException("O nome da conta já existe para este usuário.");
        }

        Category category = new Category(
                data.name(),
                data.icon(),
                data.color(),
                data.observacao(),
                user
        );

        categoryRepository.save(category);
    }

}
