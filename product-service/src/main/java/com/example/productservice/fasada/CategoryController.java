package com.example.productservice.fasada;

import com.example.productservice.entity.CategoryDTO;
import com.example.productservice.mediator.CategoryMediator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/category")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryMediator categoryMediator;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<CategoryDTO>> getCategory() {
        return categoryMediator.getCategory();
    }
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> createCategory(@RequestParam CategoryDTO categoryDTO){
        try {
            categoryMediator.createCategory(categoryDTO);
        }catch (Exception e){
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok("");
    }
}
