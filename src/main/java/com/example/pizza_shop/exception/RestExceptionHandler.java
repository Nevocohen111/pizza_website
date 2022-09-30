package com.example.pizza_shop.exception;

import com.example.pizza_shop.model.HttpCustomResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice(annotations = RestController.class)
@Order(1)
public class RestExceptionHandler {
    @ExceptionHandler(Exception.class)
    public ResponseEntity<HttpCustomResponse> exceptionHandler(Exception e, Errors errors) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new HttpCustomResponse(500,errors.getFieldErrors().stream().map(DefaultMessageSourceResolvable::getDefaultMessage)
                         .reduce((x, y) -> x + " " + y)
                         .orElse(e.getMessage())));
    }



}
