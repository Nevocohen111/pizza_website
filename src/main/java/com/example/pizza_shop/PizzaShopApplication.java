package com.example.pizza_shop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;


@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "AuditAwareBean")
public class PizzaShopApplication {
	public static void main(String[] args) {
		SpringApplication.run(PizzaShopApplication.class, args);
	}

}
