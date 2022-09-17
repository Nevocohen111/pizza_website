package com.example.pizza_shop.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Entity
@Data
public class UserProduct extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    //allow only letter and space
    @Pattern(regexp = "^[a-zA-Z ]*$", message = "Name should contain only letters and spaces")
    private String pizzaName;
    private String price;
    //must be inserted only "small", "medium" or "large"
    @Pattern(regexp = "^(Small|Medium|Large)$", message = "Only small, medium or large are allowed")
    private String size;
    @NotBlank(message = "Can't be Empty")
    private String authName;
    @Pattern(regexp = "^[a-zA-Z ]*$", message = "Name should contain only letters and spaces")
    private String name;
    @Email(message = "Email is required")
    private String email;
    @Pattern(regexp = "^[0-9]{10}$", message = "Only 10 numbers are allowed")
    private String phone;
    @NotBlank(message = "Address Can't be Empty")
    private String address;

}
