package com.gastosplus.controller;

import com.gastosplus.dto.category.CreateCategotyDTO;
import com.gastosplus.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<String> newCategory(@RequestBody @Valid CreateCategotyDTO data){
        categoryService.createCategory(data);
        return ResponseEntity.status(HttpStatus.CREATED).body("Category created success");
    }
}
