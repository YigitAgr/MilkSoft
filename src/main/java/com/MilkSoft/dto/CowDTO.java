package com.MilkSoft.dto;

import lombok.Data;

import java.util.Date;

@Data
public class CowDTO {

    private String earTag;
    private String breed;
    private Date birthDate;
    private Boolean isAdult;
    private Boolean isPregnant;
    private int farmId;
    private String fatherEarTag;
    private String motherEarTag;
}
