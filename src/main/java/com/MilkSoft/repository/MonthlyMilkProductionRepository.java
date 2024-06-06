package com.MilkSoft.repository;

import com.MilkSoft.model.MonthlyMilkProduction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.YearMonth;
import java.util.List;

@Repository
public interface MonthlyMilkProductionRepository extends JpaRepository<MonthlyMilkProduction, Integer> {
    List<MonthlyMilkProduction> findByFarmId(int farmId);
    MonthlyMilkProduction findByFarmIdAndMonth(int farmId, YearMonth month);
}
