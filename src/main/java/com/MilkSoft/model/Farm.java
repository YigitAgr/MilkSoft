package com.MilkSoft.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
@Entity
@Table(name = "farm")
public class Farm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    private int totalCows;

    private int dailyMilkProduction;

    private String Breed;

    @OneToMany(mappedBy = "farm",cascade = CascadeType.ALL)
    private List<Cow> cows;

    @OneToOne(mappedBy = "farm")
    private Farmer farmer;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "association_id")
    private Association association;
}