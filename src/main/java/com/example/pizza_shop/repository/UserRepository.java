package com.example.pizza_shop.repository;

import com.example.pizza_shop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    void deleteByName(String name);

    //update accessToken by mail
    @Modifying
    @Query(value = "UPDATE User SET accessToken = ?1 WHERE email = ?2")
    void updateAccessToken(String accessToken, String email);

    @Query("SELECT u FROM User u WHERE u.name = ?1")
    User getByName(String name);

    User getByEmail(String email);

    @Query(value = "SELECT email FROM users WHERE name = ?1", nativeQuery = true)
    String getEmailByName(String name);


    @Query(value = "SELECT pwd FROM users WHERE name = ?1", nativeQuery = true)
    String getPasswordByName(String name);
    @Query(value = "SELECT * FROM users WHERE access_token = ?1", nativeQuery = true)
    User getByAccessToken(String token);
    @Query(value = "SELECT * FROM users WHERE reset_password_token = ?1", nativeQuery = true)
    User getByResetPasswordToken(String token);
}
