package com.example.pizza_shop.validation;

import com.example.pizza_shop.annotation.FieldsMatch;
import org.springframework.beans.BeanWrapperImpl;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class FieldsMatchValidator implements ConstraintValidator<FieldsMatch,Object> {
    private String fieldOne;
    private String fieldTwo;

    @Override
    public void initialize(FieldsMatch constraintAnnotation) {
        fieldOne = constraintAnnotation.fieldOne();
        fieldTwo = constraintAnnotation.fieldTwo();
    }

    @Override
    public boolean isValid(Object o, ConstraintValidatorContext constraintValidatorContext) {
        Object fieldOneValue = new BeanWrapperImpl(o).getPropertyValue(fieldOne);
        Object fieldTwoValue = new BeanWrapperImpl(o).getPropertyValue(fieldTwo);
        if(fieldOneValue != null && fieldTwoValue != null)
            return fieldOneValue.equals(fieldTwoValue);
        else
            return false;
    }
}
