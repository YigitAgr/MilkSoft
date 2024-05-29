package com.MilkSoft.service;


import com.MilkSoft.dto.FarmerFarmDTO;
import com.MilkSoft.dto.MembershipRequestDTO;
import com.MilkSoft.model.Association;
import com.MilkSoft.model.Farmer;
import com.MilkSoft.model.MembershipRequest;
import com.MilkSoft.repository.AssociationRepository;
import com.MilkSoft.repository.FarmerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class AssociationService {

    private AssociationRepository associationRepository;
    private FarmerRepository farmerRepository;

    @Autowired
    public AssociationService(AssociationRepository associationRepository, FarmerRepository farmerRepository) {
        this.associationRepository = associationRepository;
        this.farmerRepository = farmerRepository;
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

    public int getUserCount(Integer associationId) {
        return farmerRepository.countByAssociation_Id(associationId);
    }

    public List<FarmerFarmDTO> getFarmersAndFarms(Integer associationId) {
        // Fetch all farmers associated with the given association ID
        List<Farmer> farmers = farmerRepository.findAllByAssociation_Id(associationId);

        // Map each farmer to a FarmerFarmDTO object
        return farmers.stream()
                .map(farmer -> {
                    FarmerFarmDTO dto = new FarmerFarmDTO();
                    dto.setFarmer(farmer);
                    dto.setFarm(farmer.getFarm());
                    return dto;
                })
                .collect(Collectors.toList());
    }
}

