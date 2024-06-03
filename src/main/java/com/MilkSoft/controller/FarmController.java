package com.MilkSoft.controller;

import com.MilkSoft.service.FarmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/farm")
public class FarmController {

    @Autowired
    private FarmService farmService;


    @GetMapping("/getFarmId/{farmerId}")
    public ResponseEntity<Optional<Integer>> getFarmId(@PathVariable int farmerId) {
        return ResponseEntity.ok(farmService.getFarmId(farmerId));
    }


}