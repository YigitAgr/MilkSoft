package com.MilkSoft.controller;

import com.MilkSoft.model.Farmer;
import org.springframework.web.bind.annotation.*;
import com.MilkSoft.service.FarmerService;

import java.util.List;

@RestController
@RequestMapping("/api/farmer")
public class FarmerController {
    private FarmerService farmerService;

    public FarmerController(FarmerService farmerService){
        this.farmerService = farmerService;
    }

    @GetMapping("/")
    public List<Farmer> getUsers(){
        return farmerService.getUsers();
    }


    @GetMapping("/{id}")
    public Farmer getUserbyId(@PathVariable int id){
        return farmerService.getUserById(id);
    }

    @PostMapping("/create")
    public Farmer createUser(@RequestBody Farmer farmer){
        return farmerService.createUser(farmer);
    }

    @PutMapping("/")
    public Farmer updateUser(@RequestBody Farmer farmer){
        return farmerService.updateUser(farmer);
    }

}
