package com.MilkSoft.controller;

import com.MilkSoft.model.Cow;
import com.MilkSoft.service.CowService;
import com.MilkSoft.dto.CowDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cow")
public class CowController {

    @Autowired
    private CowService cowService;

    @PostMapping("/create")
    public Cow createCow(@RequestBody CowDTO cowDTO) {
        return cowService.createCow(cowDTO);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCow(@PathVariable int id) {
        cowService.deleteCow(id);
        return ResponseEntity.ok("Cow deleted successfully");
    }


    @GetMapping("/all")
    public List<Cow> getAllCows() {
        return cowService.getAllCows();
    }

    @PutMapping("/edit/{id}")
    public Cow editCow(@PathVariable int id, @RequestBody CowDTO cowDTO) {
        return cowService.editCow(id, cowDTO);
    }
}
