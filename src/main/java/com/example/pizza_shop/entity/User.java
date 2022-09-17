package com.example.pizza_shop.entity;

import com.example.pizza_shop.annotation.FieldsMatch;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
@Entity
@Table(name = "users")
public class User extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @GenericGenerator(name = "native", strategy = "native")
    private Integer id;
    @NotBlank(message = "First name is required")
    private String name;
    @Email(message = "Email is required")
    private String email;
    @Transient
    private String confirmEmail;
    @Pattern(regexp = "^(?=.*[A-Z]).{6,}$", message = "Password should contain at least 1 uppercase letter and 6 characters long")
    private String pwd;
    @Transient
    private String confirmPwd;
    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "role_id", referencedColumnName = "roleId",nullable = false)
    private Roles role;
    private String accessToken;
    private String active;
    private String resetPasswordToken;

}
