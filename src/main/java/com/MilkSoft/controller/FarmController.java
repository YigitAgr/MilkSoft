package com.MilkSoft.controller;

import com.MilkSoft.model.Cow;
import com.MilkSoft.model.Farm;
import com.MilkSoft.model.MonthlyMilkProduction;
import com.MilkSoft.service.FarmService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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


    @GetMapping("/getFarms/{associationId}")
    public List<Farm> getFarmsByAssociationId(@PathVariable int associationId) {
        return farmService.getFarmsByAssociationId(associationId);
    }

    @GetMapping("/selectedFarmProductions/{farmId}")
    public ResponseEntity<List<MonthlyMilkProduction>> getSelectedFarmProductions(@PathVariable int farmId) {
        List<MonthlyMilkProduction> productions = farmService.getSelectedFarmProductions(farmId);
        return ResponseEntity.ok(productions);
    }

}