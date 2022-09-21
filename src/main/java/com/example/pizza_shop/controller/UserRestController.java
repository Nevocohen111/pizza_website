package com.example.pizza_shop.controller;

import com.example.pizza_shop.entity.User;
import com.example.pizza_shop.model.HttpCustomResponse;
import com.example.pizza_shop.model.Response;
import com.example.pizza_shop.repository.UserProductRepository;
import com.example.pizza_shop.service.UserService;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;
import javax.validation.Valid;
import java.io.UnsupportedEncodingException;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/register")
public class UserRestController {

    private String access;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserService userService;

    @Autowired
    private UserProductRepository userProductRepository;


    @PostMapping(value = "/add", consumes = MediaType.ALL_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
    @Transactional
    public ResponseEntity<Response> addUser(@Valid @RequestBody User user) throws MessagingException, UnsupportedEncodingException {
        if (userService.createUser(user) != null) {
             access = RandomString.make(30);
            userService.updateResetTokenByMail(access, user.getEmail());
            String activate = "http://localhost:8080/activate?access=" + access;
            sendEmail(user.getEmail(), activate);
            return ResponseEntity.status(HttpStatus.OK).body(new Response(user.getName() + ", Welcome to Pizzarela"));
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response("Username or email are already taken"));
        }

    @PostMapping(value = "/activateAccount", consumes = MediaType.ALL_VALUE,produces = MediaType.APPLICATION_JSON_VALUE)
    @Transactional
    public ResponseEntity<Response> activateAccount(@RequestParam(value = "access") String access) {
        User user = userService.getByAccessToken(access);
        if (user != null) {
            userService.updateActivateFieldByToken(access);
            return ResponseEntity.status(HttpStatus.OK).body(new Response("Account activated"));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new Response("An error has occurred,Please try again later."));
    }

    @Transactional
    @DeleteMapping("/delete")
    public ResponseEntity<HttpCustomResponse> deleteUser(RequestEntity<User> requestEntity) {
        User user = requestEntity.getBody();
        assert user != null;
        userService.deleteByName(user.getName());
        if(!userProductRepository.findByAuthName(user.getName()).isEmpty())
            userProductRepository.deleteByAuthName(user.getName());

        return ResponseEntity.status(HttpStatus.OK)
                .body(new HttpCustomResponse(200, "User deleted successfully"));
    }



    public void sendEmail(String recipientEmail, String link) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = mailSender.createMimeMessage();
        //create user only when the user clicks the link in the email.
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom("support@Hotmail.com", "Pizzarela");
        helper.setTo(recipientEmail);
        String subject = "Activate account";
        String content = "<p>Hello</p>" +
                "<p>In order to log in please click the link below</p>" +
                "<p><a href='" + link + "'>Activate account</a></p>" +
                "<br>" +
                "<p>Thanks and have a wonderful day</p>";
        helper.setSubject(subject);
        helper.setText(content, true);
        mailSender.send(message);
    }

}
