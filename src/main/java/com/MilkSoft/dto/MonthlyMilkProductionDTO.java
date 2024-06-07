package com.MilkSoft.dto;

import lombok.Data;

import java.time.YearMonth;
@Data
public class MonthlyMilkProductionDTO {
    private int farmId;
    private String month; // Use String to receive month in "YYYY-MM" format
    private int totalMilkProduced;

    // Getters and setters
    public int getFarmId() {
        return farmId;
    }

    public void setFarmId(int farmId) {
        this.farmId = farmId;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public int getTotalMilkProduced() {
        return totalMilkProduced;
    }

    public void setTotalMilkProduced(int totalMilkProduced) {
        this.totalMilkProduced = totalMilkProduced;
    }
}