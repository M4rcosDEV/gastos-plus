package com.gastosplus.service;

import com.gastosplus.dto.category.CategoryDTO;
import com.gastosplus.dto.category.CreateCategotyDTO;
import com.gastosplus.entity.Category;
import com.gastosplus.entity.User;
import com.gastosplus.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<CategoryDTO> findCategories(){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();

        List<Category> categories = categoryRepository.findAllByUserId(user.getId());

        return categories.stream()
                .map(c -> new CategoryDTO(
                        c.getId(),
                        c.getName(),
                        c.getIcon(),
                        c.getColor(),
                        c.getObservation()
                ))
                .toList();
    }

    public void createCategory(CreateCategotyDTO data){

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        User user = (User) auth.getPrincipal();

        boolean categoryExists = categoryRepository
                .existsByNameIgnoreCaseAndUserId(data.name(), user.getId());

        if (categoryExists) {
            throw new RuntimeException("Categoria já está cadastrada.");
        }

        Category category = new Category(
                data.name(),
                data.icon(),
                data.color(),
                data.observation(),
                user
        );

        categoryRepository.save(category);
    }

}
