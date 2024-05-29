package com.MilkSoft.service;

import com.MilkSoft.model.*;
import com.MilkSoft.repository.AssociationRepository;
import com.MilkSoft.repository.FarmerRepository;
import com.MilkSoft.repository.MembershipRequestRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MembershipService {

    private final MembershipRequestRepository membershipRequestRepository;
    private final FarmerRepository farmerRepository;
    private final AssociationRepository associationRepository;

    public MembershipRequest sendRequest(int farmerId, int associationId) {
        MembershipRequest existingRequest = membershipRequestRepository.findByFarmerIdAndAssociationId(farmerId, associationId);

        if (existingRequest != null) {
            throw new IllegalArgumentException("A request from this user to this association already exists.");
        }
        Farmer farmer = farmerRepository.findById(farmerId).orElseThrow();
        Association association = associationRepository.findById(associationId).orElseThrow();

        MembershipRequest request = new MembershipRequest();
        request.setFarmer(farmer);
        request.setAssociation(association);
        request.setStatus(MembershipRequest.RequestStatus.PENDING);

        return membershipRequestRepository.save(request);
    }

    public MembershipRequest respondToRequest(int requestId, MembershipRequest.RequestStatus status) {
        MembershipRequest request = membershipRequestRepository.findById(requestId)
                .orElseThrow(() -> new IllegalArgumentException("Request not found"));

        request.setStatus(status);

        if (status == MembershipRequest.RequestStatus.ACCEPTED) {
            Farmer farmer = request.getFarmer();
            Association association = request.getAssociation();

            farmer.setAssociation(association);
            association.getFarmers().add(farmer);

            farmerRepository.save(farmer);
            associationRepository.save(association);
        }

        return membershipRequestRepository.save(request);
    }
}
