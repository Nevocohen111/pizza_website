package com.example.pizza_shop.controller;

import com.example.pizza_shop.entity.User;
import com.example.pizza_shop.service.UserService;
import com.example.pizza_shop.util.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "http://localhost:3000",allowedHeaders = "*",allowCredentials = "true")
@RequestMapping("/login")
public class LoginRestController {

    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private UserService userService;


    @Autowired
    private PasswordEncoder passwordEncoder;


    @PostMapping("/add")
    public ResponseEntity<User> login(@Valid @RequestBody User user) {
        User user1 = userService.findByName(user.getName());
        if (user1 != null && passwordEncoder.matches(user.getPwd(),user1.getPwd())) {
            if (userService.getEmail(user.getName()).equals(user.getEmail())) {
                if(user1.getActive().equals("true") && user1.getAccessToken() != null) {
                    return ResponseEntity.status(HttpStatus.OK).body(user1);
                }else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(user1);
                }
            }
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(user1);

    }

}
