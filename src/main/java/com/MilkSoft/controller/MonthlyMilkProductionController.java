package com.MilkSoft.controller;

import com.MilkSoft.model.MonthlyMilkProduction;
import com.MilkSoft.service.MonthlyMilkProductionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.YearMonth;
import java.util.List;

@RestController
@RequestMapping("/api/monthlyMilkProduction")
public class MonthlyMilkProductionController {

    @Autowired
    private MonthlyMilkProductionService monthlyMilkProductionService;

    @GetMapping("/farm/{farmId}")
    public List<MonthlyMilkProduction> getMonthlyMilkProductionsByFarmId(@PathVariable int farmId) {
        return monthlyMilkProductionService.getMonthlyMilkProductionsByFarmId(farmId);
    }

    @GetMapping("/farm/{farmId}/month/{month}")
    public MonthlyMilkProduction getMonthlyMilkProductionByFarmIdAndMonth(@PathVariable int farmId, @PathVariable YearMonth month) {
        return monthlyMilkProductionService.getMonthlyMilkProductionByFarmIdAndMonth(farmId, month);
    }

    @PostMapping
    public MonthlyMilkProduction addOrUpdateMonthlyMilkProduction(@RequestBody MonthlyMilkProduction monthlyMilkProduction) {
        return monthlyMilkProductionService.addOrUpdateMonthlyMilkProduction(monthlyMilkProduction);
    }
}
