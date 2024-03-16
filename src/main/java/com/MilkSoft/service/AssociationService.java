package com.MilkSoft.service;


import com.MilkSoft.model.Association;
import com.MilkSoft.repository.AssociationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


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
}
