package com.MilkSoft.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "cow")
public class Cow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String earTag;

    private String breed;

    private Date birthDate;

    private Boolean isAdult;

    private Boolean isPregnant;

    @ManyToOne
    @JoinColumn(name = "farm_id")
    private Farm farm;

    @ManyToOne
    @JoinColumn(name = "father_id")
    private Cow father;

    @ManyToOne
    @JoinColumn(name = "mother_id")
    private Cow mother;
}
