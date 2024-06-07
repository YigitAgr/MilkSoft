package com.MilkSoft.dto;

import lombok.Data;
import java.time.YearMonth;
import java.util.Map;

@Data
public class FarmMonthlyProductionDTO {
    private int farmId;
    private String farmName;
    private Map<YearMonth, Integer> monthlyProductions;
    private int currentMonthTotal;
}
