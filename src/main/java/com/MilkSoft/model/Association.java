package com.MilkSoft.model;


import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
@Entity
@Table(name = "association")
public class Association {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;

    private String Name;
    private String City;

    @OneToMany(mappedBy = "association")
    private List<Farm> farms;

    @OneToMany(mappedBy = "association", cascade = CascadeType.ALL)
    private List<TemperatureRecord> temperatureRecords;
}