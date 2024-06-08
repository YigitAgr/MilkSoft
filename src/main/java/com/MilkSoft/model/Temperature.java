package com.MilkSoft.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
@Entity
@Table(name = "temperature")
public class Temperature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private float temperature;

    private float averageWet;

    private String month;

    @ManyToOne
    @JoinColumn(name = "temperature_record_id")
    @JsonBackReference
    private TemperatureRecord temperatureRecord;
}
