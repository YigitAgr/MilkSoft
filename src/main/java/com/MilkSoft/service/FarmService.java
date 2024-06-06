package com.MilkSoft.service;


import com.MilkSoft.model.Farm;
import com.MilkSoft.model.Farmer;
import com.MilkSoft.repository.FarmRepository;
import com.MilkSoft.repository.FarmerRepository;
import com.MilkSoft.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
}
