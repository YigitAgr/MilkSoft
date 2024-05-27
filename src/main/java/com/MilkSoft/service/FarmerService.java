package com.MilkSoft.service;

import com.MilkSoft.dto.AssociationDTO;
import com.MilkSoft.model.Association;
import com.MilkSoft.repository.AssociationRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FarmerService {

    private final AssociationRepository associationRepository;

    public FarmerService(AssociationRepository associationRepository) {
        this.associationRepository = associationRepository;
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
}