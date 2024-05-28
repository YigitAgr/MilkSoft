package com.MilkSoft.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "membership_requests")
public class MembershipRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "farmer_id")
    private Farmer farmer;

    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "association_id")
    private Association association;

    @Enumerated(EnumType.STRING)
    private RequestStatus status;

    public enum RequestStatus {
        PENDING,
        ACCEPTED,
        REJECTED
    }
}
