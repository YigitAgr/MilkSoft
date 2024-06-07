package com.MilkSoft.service;

import com.MilkSoft.dto.MonthlyMilkProductionDTO;
import com.MilkSoft.model.Farm;
import com.MilkSoft.model.MonthlyMilkProduction;
import com.MilkSoft.repository.FarmRepository;
import com.MilkSoft.repository.FarmerRepository;
import com.MilkSoft.repository.MonthlyMilkProductionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.YearMonth;
import java.util.List;

@Service
public class MonthlyMilkProductionService {


    private MonthlyMilkProductionRepository monthlyMilkProductionRepository;
    private final FarmRepository farmRepository;

    @Autowired
    public MonthlyMilkProductionService(MonthlyMilkProductionRepository monthlyMilkProductionRepository,FarmRepository farmRepository){
        this.farmRepository=farmRepository;
        this.monthlyMilkProductionRepository=monthlyMilkProductionRepository;
    }

    public List<MonthlyMilkProduction> getMonthlyMilkProductionsByFarmId(int farmId) {
        return monthlyMilkProductionRepository.findByFarmId(farmId);
    }

    public MonthlyMilkProduction getMonthlyMilkProductionByFarmIdAndMonth(int farmId, YearMonth month) {
        return monthlyMilkProductionRepository.findByFarmIdAndMonth(farmId, month);
    }

    public MonthlyMilkProduction addOrUpdateMonthlyMilkProduction(MonthlyMilkProductionDTO dto) {
        // Find the farm by ID
        Farm farm = farmRepository.findById(dto.getFarmId())
                .orElseThrow(() -> new RuntimeException("Farm not found"));

        // Convert the month string to a YearMonth object
        YearMonth yearMonth = YearMonth.parse(dto.getMonth());

        // Create a new MonthlyMilkProduction object
        MonthlyMilkProduction monthlyMilkProduction = new MonthlyMilkProduction();
        monthlyMilkProduction.setFarm(farm);
        monthlyMilkProduction.setMonth(yearMonth);
        monthlyMilkProduction.setTotalMilkProduced(dto.getTotalMilkProduced());

        // Save the monthly milk production in the database
        return monthlyMilkProductionRepository.save(monthlyMilkProduction);
    }

}
