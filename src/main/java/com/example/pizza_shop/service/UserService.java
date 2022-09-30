package com.example.pizza_shop.service;

import com.example.pizza_shop.entity.User;
import com.example.pizza_shop.model.Response;
import com.example.pizza_shop.repository.RolesRepository;
import com.example.pizza_shop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private RolesRepository rolesRepository;

    public Response createUser(User user) {
        if(user != null && (userRepository.getByName(user.getName()) == null && userRepository.getByEmail(user.getEmail()) == null)) {
            user.setRole(rolesRepository.findById(3).get());
            user.setPwd(passwordEncoder.encode(user.getPwd()));
            userRepository.save(user);
            return new Response("");
        }
        return null;
    }

    public void deleteByName(String name) {
        userRepository.deleteByName(name);
    }


    public void updateResetTokenByMail(String token, String email) {
       userRepository.updateAccessToken(token, email);
    }



    public String getPwd(String name) {
        return userRepository.getPasswordByName(name);
    }

    public User findByName(String name) {
        for(User user : userRepository.findAll()) {
            if(user.getName().equals(name))
                return user;
        }
        return null;
    }



    public String getEmail(String name) {
        return userRepository.getEmailByName(name);
    }

    public User getByAccessToken(String token) {
        return userRepository.getByAccessToken(token);
    }


    public void updateActivateFieldByToken(String access) {
        User user = userRepository.getByAccessToken(access);
        user.setActive("true");
        userRepository.save(user);
    }

    public void updateResetPasswordToken(String token, String email) {
        User user  = userRepository.getByEmail(email);
        if(user != null) {
            user.setResetPasswordToken(token);
        }else {
            throw new UsernameNotFoundException("Couldn't find user with email: " + email);
        }
    }

    public User getByResetPasswordToken(String token) {
        return userRepository.getByResetPasswordToken(token);
    }

    public void updatePassword(User myUser, String newPassword) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String encodedPassword = passwordEncoder.encode(newPassword);
        myUser.setPwd(encodedPassword);
        myUser.setResetPasswordToken(null);
        userRepository.save(myUser);
    }

}
