package com.MilkSoft.service;

import com.MilkSoft.model.MonthlyMilkProduction;
import com.MilkSoft.repository.MonthlyMilkProductionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.YearMonth;
import java.util.List;

@Service
public class MonthlyMilkProductionService {

    @Autowired
    private MonthlyMilkProductionRepository monthlyMilkProductionRepository;

    public List<MonthlyMilkProduction> getMonthlyMilkProductionsByFarmId(int farmId) {
        return monthlyMilkProductionRepository.findByFarmId(farmId);
    }

    public MonthlyMilkProduction getMonthlyMilkProductionByFarmIdAndMonth(int farmId, YearMonth month) {
        return monthlyMilkProductionRepository.findByFarmIdAndMonth(farmId, month);
    }

    public MonthlyMilkProduction addOrUpdateMonthlyMilkProduction(MonthlyMilkProduction monthlyMilkProduction) {
        MonthlyMilkProduction existingRecord = monthlyMilkProductionRepository.findByFarmIdAndMonth(
                monthlyMilkProduction.getFarm().getId(),
                monthlyMilkProduction.getMonth()
        );

        if (existingRecord != null) {
            existingRecord.setTotalMilkProduced(existingRecord.getTotalMilkProduced() + monthlyMilkProduction.getTotalMilkProduced());
            return monthlyMilkProductionRepository.save(existingRecord);
        } else {
            return monthlyMilkProductionRepository.save(monthlyMilkProduction);
        }
    }
}
