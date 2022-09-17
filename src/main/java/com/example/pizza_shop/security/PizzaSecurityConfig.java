package com.example.pizza_shop.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
public class PizzaSecurityConfig  {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        http.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
                .and().authorizeRequests().mvcMatchers("/register**").permitAll()
                .and().authorizeRequests().mvcMatchers("/login**").permitAll()
                .and().authorizeRequests().mvcMatchers("/menu**").permitAll()
                .and().csrf().disable().httpBasic();
        return http.build();
    }

}
