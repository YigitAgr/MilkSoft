package com.MilkSoft.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
@Table(name = "association")
public class Association {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String city;

    @JsonManagedReference
    @OneToMany(mappedBy = "association", cascade = CascadeType.ALL)
    private List<Farmer> farmers;

    @OneToMany(mappedBy = "association")
    private List<Farm> farms;

    @OneToMany(mappedBy = "association", cascade = CascadeType.ALL)
    private List<TemperatureRecord> temperatureRecords;

    @JsonBackReference
    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "association")
    private List<MembershipRequest> membershipRequests;
}
