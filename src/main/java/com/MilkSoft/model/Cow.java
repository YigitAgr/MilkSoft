package com.MilkSoft.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.Id;

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

}
