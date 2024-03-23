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
@Table(name = "supplies")
public class Supplies {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String SupplyName;

    private int Quantity;

    private Date purcahseDate;

}
