package com.example.pizza_shop.annotation;

import com.example.pizza_shop.validation.FieldsMatchValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = FieldsMatchValidator.class)
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface FieldsMatch {
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
    String message() default "Fields do not match";
    String fieldOne();
    String fieldTwo();


    @Target(ElementType.TYPE)
    @Retention(RetentionPolicy.RUNTIME)
    @interface List {
        FieldsMatch[] value();
    }
}
