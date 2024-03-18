package com.MilkSoft.controller;

import com.MilkSoft.model.User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.MilkSoft.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class UserController {
    private UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping("/")
    public List<User> getUsers(){
        return userService.getUsers();
    }

    @GetMapping("/{id}")
    public User getUserbyId(@PathVariable int id){
        return userService.getUserById(id);
    }

    @PostMapping("/create")
    public User createUser(@RequestBody User user){
        return userService.createUser(user);
    }

    @PutMapping("/")
    public User updateUser(@RequestBody User user){
        return userService.updateUser(user);
    }

}
