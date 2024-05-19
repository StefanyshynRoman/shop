package com.example.order.repository;

import com.example.order.entity.Order;
import com.example.order.entity.OrderItems;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<OrderItems,Long> {

    List<OrderItems> findOrderItemsByOrder(Order order);
}
