package com.MilkSoft.service;

import com.MilkSoft.dto.AssociationDTO;
import com.MilkSoft.model.Association;
import com.MilkSoft.model.User;
import com.MilkSoft.repository.AssociationRepository;
import com.MilkSoft.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FarmerService {

    private final AssociationRepository associationRepository;

    private final UserRepository userRepository;

    public FarmerService(AssociationRepository associationRepository, UserRepository userRepository) {
        this.associationRepository = associationRepository;
        this.userRepository = userRepository;
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
}