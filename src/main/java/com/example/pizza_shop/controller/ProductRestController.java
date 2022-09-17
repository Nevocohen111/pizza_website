package com.example.pizza_shop.controller;

import com.example.pizza_shop.model.HttpCustomResponse;
import com.example.pizza_shop.entity.Product;
import com.example.pizza_shop.model.Response;
import com.example.pizza_shop.repository.ProductRepository;
import com.example.pizza_shop.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;


import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000",allowedHeaders = "*",allowCredentials = "true")
@RequestMapping("/menu")
public class ProductRestController {
    @Autowired
    private ProductService productService;

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }


    @PostMapping("/add")
    public ResponseEntity<Response> addProduct(@Valid @RequestBody Product product,Errors errors) {
        if(errors.hasErrors()) {
            if(errors.getFieldError("name") != null)
                return ResponseEntity.status(505).body(new Response("name can't be empty"));
            else if(errors.getFieldError("price") != null)
                return ResponseEntity.status(506).body(new Response("price name can't be empty or contain letters"));
            else if(errors.getFieldError("size") != null)
                return ResponseEntity.status(507).body(new Response("Pick a size"));
            else if(errors.getFieldError("authName") != null)
                return ResponseEntity.status(508).body(new Response("AuthName can't be empty"));
        }
        return productService.saveProduct(product);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<HttpCustomResponse> deleteProduct(RequestEntity<Product> request) {
        Product product = request.getBody();
        assert product != null;
        productRepository.deleteById(product.getId());
        return ResponseEntity.status(HttpStatus.OK)
                .body(new HttpCustomResponse(200, "Product deleted successfully"));
    }

}
