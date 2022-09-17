package com.example.pizza_shop.service;

import com.example.pizza_shop.entity.Product;
import com.example.pizza_shop.model.Response;
import com.example.pizza_shop.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

   public ResponseEntity<Response> saveProduct(Product product) {
       if(product.getName() != null) {
           productRepository.save(product);
              return ResponseEntity.ok(new Response("Product added successfully"));
       }else {
              return ResponseEntity.badRequest().body(new Response("Product name can't be empty"));
       }
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}
