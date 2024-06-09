package com.MilkSoft.model;

import com.MilkSoft.repository.FarmRepository;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Random;

@Component
public class FarmInitializer {

    private final FarmRepository farmRepository;

    public FarmInitializer(FarmRepository farmRepository) {
        this.farmRepository = farmRepository;
    }

    @PostConstruct
    public void initializeFarms() {
        List<Farm> farms = farmRepository.findAll();
        farms.forEach(this::setRandomDailyMilkProduction);
    }

    private void setRandomDailyMilkProduction(Farm farm) {
        // Generate a random daily milk production value between 25 and 35
        Random random = new Random();
        int randomValue = random.nextInt(11) + 25; // Generates a random value between 25 and 35
        farm.setDailyMilkProduction(randomValue);
        farmRepository.save(farm);
    }
}
