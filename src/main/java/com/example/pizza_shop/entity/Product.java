package com.example.pizza_shop.entity;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import javax.persistence.*;
import javax.validation.constraints.Pattern;

@Data
@Entity
@Table(name = "product")
public class Product extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @GenericGenerator(name = "native", strategy = "native")
    private Integer id;
    //allow only letter and space
    @Pattern(regexp = "^[a-zA-Z ]*$", message = "Name should contain only letters and spaces")
    private String name;
    @Pattern(regexp = "^[0-9]+$", message = "Only numbers are allowed")
    private String price;
    //must be inserted only "small", "medium" or "large"
    @Pattern(regexp = "^(Small|Medium|Large)$", message = "Only small, medium or large are allowed")
    private String size;


}
