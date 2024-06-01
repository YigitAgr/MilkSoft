package com.MilkSoft.dto;

public class CreateFarmDTO {
    private int farmerId;
    private String farmName;

    // Getters and setters...
    public int getFarmerId() {
        return farmerId;
    }

    public void setFarmerId(int farmerId) {
        this.farmerId = farmerId;
    }

    public String getFarmName() {
        return farmName;
    }

    public void setFarmName(String farmName) {
        this.farmName = farmName;
    }
}