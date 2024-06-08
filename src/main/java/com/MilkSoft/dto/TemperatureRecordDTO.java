package com.MilkSoft.dto;

import lombok.Data;

import java.util.List;

@Data
public class TemperatureRecordDTO {

    private List<TemperatureDTO> temperatures;

    private int associationId;
}
