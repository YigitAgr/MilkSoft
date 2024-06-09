package com.MilkSoft.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Random;

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

    @JsonManagedReference
    @OneToMany(mappedBy = "farm",cascade = CascadeType.ALL)
    private List<Cow> cows;

    @JsonIgnore
    @OneToOne(mappedBy = "farm")
    private Farmer farmer;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "association_id")
    private Association association;

    @JsonManagedReference
    @OneToMany(mappedBy = "farm", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<MonthlyMilkProduction> monthlyMilkProductions;

    // Other methods...

    public void addMonthlyMilkProduction(MonthlyMilkProduction monthlyMilkProduction) {
        monthlyMilkProductions.add(monthlyMilkProduction);
        monthlyMilkProduction.setFarm(this);
    }

    public void removeMonthlyMilkProduction(MonthlyMilkProduction monthlyMilkProduction) {
        monthlyMilkProductions.remove(monthlyMilkProduction);
        monthlyMilkProduction.setFarm(null);
    }

    public Farm() {
        // Generate a random daily milk production value between 25 and 35
        Random random = new Random();
        this.dailyMilkProduction = random.nextInt(11) + 25;
    }

}