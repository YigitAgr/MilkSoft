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

}
