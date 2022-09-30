package com.example.pizza_shop.controller;

import com.example.pizza_shop.entity.UserProduct;
import com.example.pizza_shop.model.HttpCustomResponse;
import com.example.pizza_shop.model.Response;
import com.example.pizza_shop.repository.UserProductRepository;
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
@RequestMapping("/user")
public class UserProductRestController {
    @Autowired
    private UserProductRepository userProductRepository;

    @GetMapping("/get")
    public List<UserProduct> getListOfProducts(@RequestParam String authName) {
        return userProductRepository.findByAuthName(authName);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<HttpCustomResponse> deleteProduct(RequestEntity<UserProduct> request) {
        UserProduct product = request.getBody();
        assert product != null;
        userProductRepository.deleteById(product.getId());
        return ResponseEntity.status(HttpStatus.OK)
                .body(new HttpCustomResponse(200, "Product deleted successfully"));
    }


    @PostMapping("/add")
    public ResponseEntity<Response> addUserProduct(@Valid @RequestBody UserProduct userProduct, Errors errors) {
        System.out.println(userProduct);
        if(errors.hasErrors()) {
            if(errors.getFieldError("pizzaName") != null)
                return ResponseEntity.status(505).body(new Response("Pizza name can't be empty"));
            else if(errors.getFieldError("price") != null)
                return ResponseEntity.status(506).body(new Response("Price can't be empty or contain letters"));
            else if(errors.getFieldError("authName") != null)
                return ResponseEntity.status(507).body(new Response("AuthName can't be empty"));
            else if(errors.getFieldError("size") != null)
                return ResponseEntity.status(508).body(new Response("Please pick a size"));
            else if(errors.getFieldError("name") != null)
                return ResponseEntity.status(509).body(new Response("Name can't be empty"));
            else if(errors.getFieldError("email") != null)
                return ResponseEntity.status(510).body(new Response("Email can't be empty"));
            else if(errors.getFieldError("phone") != null)
                return ResponseEntity.status(511).body(new Response("Phone must be exactly 10 digits"));
            else if(errors.getFieldError("address") != null)
                return ResponseEntity.status(512).body(new Response("Address can't be empty"));
        }
        userProductRepository.save(userProduct);
        return ResponseEntity.status(HttpStatus.OK)
                .body(new Response("Product added successfully"));
        }

    }
