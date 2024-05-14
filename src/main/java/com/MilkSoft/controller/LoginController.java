package com.MilkSoft.controller;

import com.MilkSoft.model.Farmer;
import com.MilkSoft.service.FarmerDetailsService;
import com.MilkSoft.config.JwtUtil;  // make sure this import is correct
import com.MilkSoft.service.FarmerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class LoginController {
    @Autowired
    private FarmerService farmerService;

    private final AuthenticationManager authenticationManager;
    private final FarmerDetailsService farmerDetailsService;
    private final JwtUtil jwtUtil;

    public LoginController(AuthenticationManager authenticationManager, FarmerDetailsService farmerDetailsService, JwtUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.farmerDetailsService = farmerDetailsService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public String login(@RequestBody Farmer farmer) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(farmer.getUsername(), farmer.getPassword())
        );
        UserDetails userDetails = farmerDetailsService.loadUserByUsername(farmer.getUsername());
        return jwtUtil.generateToken(userDetails);
    }

    @PostMapping("/register")
    public Farmer register(@RequestBody Farmer farmer) {
        if (farmer.getRole() == null) {
            throw new IllegalArgumentException("Role cannot be null");
        }
        return farmerService.createUser(farmer);
    }

    @GetMapping("/getAllUsers")
    public List<Farmer> getAllUsers() {
        return farmerDetailsService.getAllUsers();
    }


    @DeleteMapping("/deleteAllUsers")
    public ResponseEntity<?> deleteAllUsers() {
        farmerService.deleteAllUsers();
        return ResponseEntity.ok().build();
    }
}