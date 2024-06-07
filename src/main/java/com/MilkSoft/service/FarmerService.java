package com.MilkSoft.service;

import com.MilkSoft.dto.AssociationDTO;
import com.MilkSoft.dto.CreateFarmDTO;
import com.MilkSoft.dto.IdsDTO;
import com.MilkSoft.model.Association;
import com.MilkSoft.model.Farm;
import com.MilkSoft.model.Farmer;
import com.MilkSoft.model.User;
import com.MilkSoft.repository.AssociationRepository;
import com.MilkSoft.repository.FarmRepository;
import com.MilkSoft.repository.FarmerRepository;
import com.MilkSoft.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;
import java.io.IOException;

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



    public Farm createFarm(CreateFarmDTO createFarmDTO) {
        // Find the farmer by ID
        Farmer farmer = farmerRepository.findById(createFarmDTO.getFarmerId())
                .orElseThrow(() -> new RuntimeException("Farmer not found"));

        // Find the association by ID
        Association association = associationRepository.findById(createFarmDTO.getAssociationId())
                .orElseThrow(() -> new RuntimeException("Association not found"));

        // Create a new Farm object
        Farm farm = new Farm();
        farm.setName(createFarmDTO.getFarmName());
        farm.setFarmer(farmer);
        farm.setAssociation(association);

        // Save the farm in the database
        Farm savedFarm = farmRepository.save(farm);

        // Add the farm to the association's list of farms
        association.getFarms().add(savedFarm);
        // Save the updated association in the database
        associationRepository.save(association);

        // Set the farm to the farmer and save the farmer
        farmer.setFarm(savedFarm);
        farmerRepository.save(farmer);

        return savedFarm;
    }

    public IdsDTO getIdsByUserId(Integer userId) {
        IdsDTO idsDTO = new IdsDTO();
        Farmer farmer = farmerRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));

        idsDTO.setFarmerId(farmer.getId());

        Association association = farmer.getAssociation();
        if (association != null) {
            idsDTO.setAssociationId(association.getId());
        } else {
            idsDTO.setAssociationId(null); // Set association ID to null if association is null
        }

        return idsDTO;
    }





    public Farm getFarmByUserId(Integer userId) {
        // Find the farmer by user ID
        Farmer farmer = farmerRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Return the farm associated with the farmer
        return farmer.getFarm();
    }


    @Transactional
    public void deleteFarm(Integer farmId) {
        // Find the farm by ID
        Farm farm = farmRepository.findById(farmId)
                .orElseThrow(() -> new RuntimeException("Farm not found"));

        // Get the farmer of the farm
        Farmer farmer = farm.getFarmer();

        // Set the farm of the farmer to null and save the farmer
        farmer.setFarm(null);
        farmerRepository.save(farmer);

        // Get the association of the farm
        Association association = farm.getAssociation();

        // Remove the farm from the association's list of farms
        association.getFarms().remove(farm);

        // Save the updated association in the database
        associationRepository.save(association);

        // Delete the farm from the database
        farmRepository.delete(farm);
    }

    public AssociationDTO getAssociationByFarmerId(Integer farmerId) {
        // Find the farmer by ID
        Farmer farmer = farmerRepository.findById(farmerId)
                .orElseThrow(() -> new RuntimeException("Farmer not found"));

        // Get the association of the farmer
        Association association = farmer.getAssociation();

        // Convert the association to AssociationDTO
        AssociationDTO dto = new AssociationDTO();
        dto.setId(association.getId());
        dto.setName(association.getName());
        dto.setCity(association.getCity());

        // Return the AssociationDTO
        return dto;
    }
}