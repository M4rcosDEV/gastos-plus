package com.gastosplus.service;

import com.gastosplus.dto.category.CreateCategotyDTO;
import com.gastosplus.entity.Category;
import com.gastosplus.entity.User;
import com.gastosplus.repository.CategoryRepository;
import com.gastosplus.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    private final UserRepository userRepository;

    public void createCategory(CreateCategotyDTO data){
        User user = userRepository.findById(data.userId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        Category category = new Category(
                data.name(),
                user
        );

        categoryRepository.save(category);
    }

}
