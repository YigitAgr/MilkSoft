package com.MilkSoft.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Data
@Getter
@Setter
@Entity
@Table(name = "temperature_record")
public class TemperatureRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private float temperature;

    private float averageWet; // New field to store average wetness

    private Date date;

    @ManyToOne
    @JoinColumn(name = "association_id")
    private Association association;

}