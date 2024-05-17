package com.MilkSoft.controller;

import com.MilkSoft.model.User;
import com.MilkSoft.service.MyUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class LoginController {

    @Autowired
    private MyUserDetailsService userDetailsService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody User loginRequest) {
        // Implement your authentication logic here
        // For simplicity, let's just return the loginRequest
        return ResponseEntity.ok(loginRequest);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User registrationRequest) {
        userDetailsService.saveUser(registrationRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully");
    }
}
