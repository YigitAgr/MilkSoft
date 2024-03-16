package com.MilkSoft.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int Id;
    private String Name;
    private String Password;
    private String Email;
    private String Role;
}
