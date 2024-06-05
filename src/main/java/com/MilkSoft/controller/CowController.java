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


    @GetMapping("/farm/{farmId}")
    public List<Cow> getCowsByFarmId(@PathVariable int farmId) {
        return cowService.getCowsByFarmId(farmId);
    }

    @GetMapping("/count/{farmId}")
    public Integer getCowCount(@PathVariable int farmId) {
        return cowService.getCowCountByFarmId(farmId);
    }

    @GetMapping("/cowincalf/{farmId}")
    public List<Cow> getCowsInCalf(@PathVariable int farmId) {
        return cowService.getCowsInCalfByFarmId(farmId);
    }


}
