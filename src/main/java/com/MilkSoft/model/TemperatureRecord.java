package com.MilkSoft.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
@Entity
@Table(name = "temperature_record")
public class TemperatureRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToMany(mappedBy = "temperatureRecord", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Temperature> temperatures;

    @ManyToOne
    @JoinColumn(name = "association_id")
    private Association association;
}
