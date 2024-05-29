package com.MilkSoft.service;


import com.MilkSoft.dto.MembershipRequestDTO;
import com.MilkSoft.model.Association;
import com.MilkSoft.model.MembershipRequest;
import com.MilkSoft.repository.AssociationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class AssociationService {

    private AssociationRepository associationRepository;

    @Autowired
    public AssociationService(AssociationRepository associationRepository) {
        this.associationRepository = associationRepository;
    }

    public List<Association> getAssociations(){
        return associationRepository.findAll();
    }


    public List<MembershipRequestDTO> getPendingRequests(Integer associationId) {
        return associationRepository.findPendingRequests(associationId, MembershipRequest.RequestStatus.PENDING).stream()
                .map(request -> new MembershipRequestDTO(
                        request.getId(),
                        request.getFarmerId(),
                        request.getFarmerName(),
                        request.getAssociationId(),
                        request.getStatus()
                ))
                .collect(Collectors.toList());
    }

}

