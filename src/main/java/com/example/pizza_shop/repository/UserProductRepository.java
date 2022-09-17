package com.example.pizza_shop.repository;

import com.example.pizza_shop.entity.UserProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;


import java.util.List;

public interface UserProductRepository extends JpaRepository<UserProduct, Integer> {

    @Modifying
    @Query(value = "DELETE FROM user_product WHERE auth_name = ?1", nativeQuery = true)
    void deleteByAuthName(String authName);
    List<UserProduct> findByAuthName(String authName);
}
