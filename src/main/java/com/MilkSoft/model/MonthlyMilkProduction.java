package com.MilkSoft.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.YearMonth;

@Data
@Entity
@Table(name = "monthly_milk_production")
public class MonthlyMilkProduction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private YearMonth month; // Using YearMonth to represent the month

    private int totalMilkProduced;


    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "farm_id")
    private Farm farm;
}
