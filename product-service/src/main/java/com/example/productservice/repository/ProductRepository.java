package com.example.productservice.repository;

import com.example.productservice.entity.Product;
import com.example.productservice.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query(nativeQuery = true, value = "SELECT count(*) FROM products where activate is true ")
    long countActiveProducts();

    List<ProductEntity> findByNameAndCreateAt(String name, LocalDate date);
    Optional<ProductEntity> findByUid(String uuid);


}
