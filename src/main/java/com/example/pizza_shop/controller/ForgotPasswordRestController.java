package com.example.pizza_shop.controller;

import com.example.pizza_shop.entity.User;
import com.example.pizza_shop.model.Response;
import com.example.pizza_shop.service.UserService;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;
import java.io.UnsupportedEncodingException;

@RestController
@CrossOrigin(origins = "http://localhost:3000",allowedHeaders = "*",allowCredentials = "true")
@RequestMapping("/forgot")
public class ForgotPasswordRestController {

    private String token;

    @Autowired
    private UserService userService;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @PostMapping("/find")
    public Response findUserByMail(@RequestBody User user) {
        String email = user.getEmail();
         token = RandomString.make(30);
        try {
            userService.updateResetPasswordToken(token, email);
            String resetPasswordLink = "http://localhost:8080/resetPassword?token=" + token;
            sendEmail(email, resetPasswordLink);
            return new Response(token);
        } catch (UsernameNotFoundException ex) {
            return new Response("Email not found");
        } catch (UnsupportedEncodingException | MessagingException e) {
            return new Response("Error while sending email");
        }
    }

  @Transactional
  @PutMapping("/resetPassword")
    public Response resetPassword(@RequestParam(value = "token",required = false)String token,@RequestBody String pwd) {
        if(token != null) {
            //get only the password from the object
            String password = pwd.substring(13,pwd.length()-2);
            User user1 = userService.getByResetPasswordToken(token);
            if(user1 != null ) {
                if(!password.matches("^(?=.*[A-Z])(?=.*[0-9]).{6,}$"))
                    return new Response("Password must contain at least 1 uppercase letter and 6 digits");
                else {
                    userService.updatePassword(user1, password);
                    return new Response("Password updated successfully");
                }
            } else {
                return new Response("Invalid token");
            }
        } else {
            return new Response("Token expired");
        }
  }

    public void sendEmail(String recipientEmail, String link) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom("support@Hotmail.com", "Pizzarela Support");
        helper.setTo(recipientEmail);
        String subject = "Reset Password";
        String content = "<p>!Hello</p>" +
                "<p>.You have requested to reset your password</p>" +
                "<p>.Please click on the link below to reset your password</p>" +
                "<p><a href='" + link + "'>Reset Password</a></p>" +
                "<br>" +
                "<p>.Ignore this email if you do remember your password</p>" +
                "<p>!Thanks and have a wonderful day</p>";
        helper.setSubject(subject);
        helper.setText(content, true);
        mailSender.send(message);
    }


}
