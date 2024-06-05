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

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

        // Set father by ear tag (if provided)
        if (cowDTO.getFatherEarTag() != null && !cowDTO.getFatherEarTag().isEmpty()) {
            Cow father = cowRepository.findByEarTag(cowDTO.getFatherEarTag())
                    .orElseThrow(() -> new RuntimeException("Father cow not found with ear tag " + cowDTO.getFatherEarTag()));
            cow.setFather(father);
        }

        // Set mother by ear tag (if provided)
        if (cowDTO.getMotherEarTag() != null && !cowDTO.getMotherEarTag().isEmpty()) {
            Cow mother = cowRepository.findByEarTag(cowDTO.getMotherEarTag())
                    .orElseThrow(() -> new RuntimeException("Mother cow not found with ear tag " + cowDTO.getMotherEarTag()));
            cow.setMother(mother);
        }

        farm.getCows().add(cow);

        farmRepository.save(farm);
        return cow;
    }

    public void deleteCow(int id) {
        cowRepository.deleteById(id);
    }

    public List<Cow> getAllCows() {
        return cowRepository.findAll();
    }

    public Cow editCow(int id, CowDTO cowDTO) {
        // Find the cow by its ID
        Cow cow = cowRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cow not found with id " + id));

        // Update the cow's properties with the data from the CowDTO
        cow.setEarTag(cowDTO.getEarTag());
        cow.setBreed(cowDTO.getBreed());
        cow.setBirthDate(cowDTO.getBirthDate());
        cow.setIsAdult(cowDTO.getIsAdult());
        cow.setIsPregnant(cowDTO.getIsPregnant());

        // Save the updated cow back to the database
        cowRepository.save(cow);

        // Return the updated cow
        return cow;
    }



    public List<Cow> getCowsByFarmId(int farmId) {
        return cowRepository.findByFarmId(farmId);
    }

    public Integer getCowCountByFarmId(int farmId) {
        return cowRepository.countByFarmId(farmId);
    }

    public List<Cow> getCowsInCalfByFarmId(int farmId) {
        // Filter the list of cows by isPregnant being true
        List<Cow> cowsInCalf = cowRepository.findByFarmId(farmId)
                .stream()
                .filter(Cow::getIsPregnant)
                .collect(Collectors.toList());

        if (cowsInCalf.isEmpty()) {
            throw new RuntimeException("No cows in calf found for farm ID: " + farmId);
        }

        return cowsInCalf;
    }
}
