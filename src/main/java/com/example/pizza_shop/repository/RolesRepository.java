package com.example.pizza_shop.repository;

import com.example.pizza_shop.entity.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolesRepository extends JpaRepository<Roles, Integer> {}
