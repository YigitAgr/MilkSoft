package com.MilkSoft.dto;

import com.MilkSoft.model.Farm;
import com.MilkSoft.model.Farmer;
import lombok.Data;

@Data
public class FarmerFarmDTO {
    private Farmer farmer;
    private Farm farm;

    // getters and setters
}