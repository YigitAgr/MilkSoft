package com.MilkSoft.dto;

import com.opencsv.bean.CsvBindByName;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class MonthlyReport {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @CsvBindByName
    private String breed;

    @CsvBindByName
    private String city;

    @CsvBindByName
    private String month;

    @CsvBindByName
    private float averageTemperature;

    @CsvBindByName
    private float averageWet;

    @CsvBindByName
    private int dailyMilkProduction;

    @CsvBindByName
    private float minTemperature;

    @CsvBindByName
    private float maxTemperature;

    @CsvBindByName
    private float avgTemperature;

}