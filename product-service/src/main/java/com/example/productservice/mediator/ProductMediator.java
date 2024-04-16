package com.example.productservice.mediator;

import com.example.productservice.entity.ProductEntity;
import com.example.productservice.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ProductMediator {
    private final ProductService productService;
    public ResponseEntity<?> getProduct(int page, int limit, String name,
                                        String category, Float price_min,
                                        Float price_max, String data) {
        long totalCount=productService.countActiveProducts(name, category, price_min, price_max);
        List<ProductEntity>product=productService.getProduct(name, category,price_min, price_max,data, page, limit);
        return ResponseEntity.ok().header("X-Total-Count", String.valueOf(totalCount)).body(product);
    }
}

