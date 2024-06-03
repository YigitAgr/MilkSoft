package com.MilkSoft.service;

import com.MilkSoft.dto.CowDTO;
import com.MilkSoft.model.Cow;
import com.MilkSoft.model.Farm;
import com.MilkSoft.repository.CowRepository;
import com.MilkSoft.repository.FarmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class CowService {

    private final CowRepository cowRepository;
    private final FarmRepository farmRepository;

    @Autowired
    public CowService(FarmRepository farmRepository, CowRepository cowRepository) {
        this.farmRepository = farmRepository;
        this.cowRepository = cowRepository;
    }

    public Cow createCow(CowDTO cowDTO) {
        // Check if a cow with the same ear tag already exists
        Optional<Cow> existingCow = cowRepository.findByEarTag(cowDTO.getEarTag());
        if (existingCow.isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "A cow with the ear tag " + cowDTO.getEarTag() + " already exists."
            );
        }

        Cow cow = new Cow();
        // Set cow properties from cowDTO
        cow.setEarTag(cowDTO.getEarTag());
        cow.setBreed(cowDTO.getBreed());
        cow.setBirthDate(cowDTO.getBirthDate());
        cow.setIsAdult(cowDTO.getIsAdult());
        cow.setIsPregnant(cowDTO.getIsPregnant());

        // Set farm
        Farm farm = farmRepository.findById(cowDTO.getFarmId())
                .orElseThrow(() -> new RuntimeException("Farm not found with id " + cowDTO.getFarmId()));
        cow.setFarm(farm);

        // Set father by ear tag
        if (cowDTO.getFatherEarTag() != null) {
            Cow father = cowRepository.findByEarTag(cowDTO.getFatherEarTag())
                    .orElseThrow(() -> new RuntimeException("Father cow not found with ear tag " + cowDTO.getFatherEarTag()));
            cow.setFather(father);
        }

        // Set mother by ear tag
        if (cowDTO.getMotherEarTag() != null) {
            Cow mother = cowRepository.findByEarTag(cowDTO.getMotherEarTag())
                    .orElseThrow(() -> new RuntimeException("Mother cow not found with ear tag " + cowDTO.getMotherEarTag()));
            cow.setMother(mother);
        }

        farm.getCows().add(cow);

        farmRepository.save(farm);
        return cowRepository.save(cow);
    }

    public void deleteCow(int id) {
        cowRepository.deleteById(id);
    }
}
