package com.MilkSoft.dto;

import com.MilkSoft.model.MembershipRequest;
import lombok.Data;

@Data
public class MembershipRequestDTO {
    private int id;
    private int farmerId;
    private String farmerName; // New field
    private int associationId;
    private MembershipRequest.RequestStatus status;


    public MembershipRequestDTO(int id, int farmerId, String farmerName, int associationId, MembershipRequest.RequestStatus status) {
        this.id = id;
        this.farmerId = farmerId;
        this.farmerName = farmerName;
        this.associationId = associationId;
        this.status = status;
    }
    // Getters and setters for all fields
}