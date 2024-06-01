package com.MilkSoft.service;

import com.MilkSoft.dto.AssociationDTO;
import com.MilkSoft.dto.CreateFarmDTO;
import com.MilkSoft.model.Association;
import com.MilkSoft.model.Farm;
import com.MilkSoft.model.Farmer;
import com.MilkSoft.model.User;
import com.MilkSoft.repository.AssociationRepository;
import com.MilkSoft.repository.FarmRepository;
import com.MilkSoft.repository.FarmerRepository;
import com.MilkSoft.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FarmerService {

    private final AssociationRepository associationRepository;

    private final UserRepository userRepository;

    private final FarmerRepository farmerRepository;

    private final FarmRepository farmRepository;

    public FarmerService(AssociationRepository associationRepository, UserRepository userRepository,FarmerRepository farmerRepository,FarmRepository farmRepository) {
        this.associationRepository = associationRepository;
        this.userRepository = userRepository;
        this.farmerRepository= farmerRepository;
        this.farmRepository = farmRepository;
    }

    public List<AssociationDTO> getAllAssociations() {
        return associationRepository.findAll().stream()
                .map(association -> {
                    AssociationDTO dto = new AssociationDTO();
                    dto.setId(association.getId());
                    dto.setName(association.getName());
                    dto.setCity(association.getCity());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    public AssociationDTO getAssociationByUserId(Integer userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Association association = user.getAssociation();
        if (association != null) {
            AssociationDTO dto = new AssociationDTO();
            dto.setId(association.getId());
            dto.setName(association.getName());
            dto.setCity(association.getCity());
            return dto;
        } else {
            throw new RuntimeException("User is not associated with any association");
        }
    }


    public Farm createFarm(CreateFarmDTO createFarmDTO) {
        // Find the farmer by ID
        Farmer farmer = farmerRepository.findById(createFarmDTO.getFarmerId())
                .orElseThrow(() -> new RuntimeException("Farmer not found"));

        // Create a new Farm object
        Farm farm = new Farm();
        farm.setName(createFarmDTO.getFarmName());
        farm.setFarmer(farmer);

        // Save the farm in the database
        return farmRepository.save(farm);
    }

    public Integer getFarmerIdByUserId(Integer userId) {
        return farmerRepository.findByUserId(userId)
                .map(Farmer::getId)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));
    }
}