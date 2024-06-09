package com.MilkSoft.service;


import com.MilkSoft.model.Cow;
import com.MilkSoft.model.Farm;
import com.MilkSoft.model.Farmer;
import com.MilkSoft.model.MonthlyMilkProduction;
import com.MilkSoft.repository.FarmRepository;
import com.MilkSoft.repository.FarmerRepository;
import com.MilkSoft.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FarmService {

    private final FarmRepository farmRepository;
    private final FarmerRepository farmerRepository;

    @Autowired
    public FarmService(FarmRepository farmRepository,FarmerRepository farmerRepository) {
        this.farmRepository = farmRepository;
        this.farmerRepository = farmerRepository;
    }

    public Optional<Integer> getFarmId(int farmerId) {
        Optional<Farmer> farmer = farmerRepository.findById(farmerId);
        if (farmer.isPresent() && farmer.get().getFarm() != null) {
            return Optional.of(farmer.get().getFarm().getId());
        } else {
            return Optional.empty();
        }
    }

    public List<Farm> getFarmsByAssociationId(int associationId) {
        return farmRepository.findByAssociationId(associationId);
    }

    public List<MonthlyMilkProduction> getSelectedFarmProductions(int farmId) {
        Optional<Farm> farmOptional = farmRepository.findById(farmId);
        if (farmOptional.isPresent()) {
            Farm farm = farmOptional.get();
            return farm.getMonthlyMilkProductions();
        } else {
            throw new EntityNotFoundException("Farm not found with id: " + farmId);
        }
    }


    public void updateFarmBreed(int farmId) {
        Optional<Farm> farmOptional = farmRepository.findById(farmId);
        if (farmOptional.isPresent()) {
            Farm farm = farmOptional.get();
            List<Cow> cows = farm.getCows();
            if (cows != null && !cows.isEmpty()) {
                // Count occurrences of each breed
                Map<String, Long> breedCount = cows.stream()
                        .collect(Collectors.groupingBy(Cow::getBreed, Collectors.counting()));

                // Find the breed with the maximum count
                String mostCommonBreed = breedCount.entrySet().stream()
                        .max(Map.Entry.comparingByValue())
                        .map(Map.Entry::getKey)
                        .orElse(null);

                // Update the farm's breed if a common breed is found
                if (mostCommonBreed != null) {
                    farm.setBreed(mostCommonBreed);
                    farmRepository.save(farm);
                }
            }
        } else {
            throw new EntityNotFoundException("Farm not found with id: " + farmId);
        }
    }
}
