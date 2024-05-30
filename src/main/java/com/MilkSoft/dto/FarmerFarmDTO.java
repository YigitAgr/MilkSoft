package com.MilkSoft.dto;

import com.MilkSoft.model.Farm;
import lombok.Data;

@Data
public class FarmerFarmDTO {
    private int id;
    private String name;
    private String surname;
    private Farm farm;
}