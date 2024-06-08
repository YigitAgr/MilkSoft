package com.MilkSoft.dto;

import lombok.Data;

@Data
public class TemperatureDTO {

    private int id;

    private float temperature;

    private float averageWet;

    private String month;
}
