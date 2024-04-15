package com.example.productservice.fasada;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/v1/product")
@RequiredArgsConstructor
public class ProductController {
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> get(HttpServletRequest request,
                                 @RequestParam(required = false, defaultValue = "8") int page,
                                 @RequestParam(required = false, defaultValue = "10") int limit) {
        return null;
    }
}
