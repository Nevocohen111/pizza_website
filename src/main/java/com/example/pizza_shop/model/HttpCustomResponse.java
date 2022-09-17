package com.example.pizza_shop.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class HttpCustomResponse {
    private int statusCode;
    private String message;
}
