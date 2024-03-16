package com.MilkSoft.model;

import jakarta.persistence.*;

@Entity
@Table(name = "association")
public class Association {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int Id;

    private String Name;
    private String Password;
    private String Email;
    private String Role;
}