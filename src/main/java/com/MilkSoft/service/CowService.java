package com.MilkSoft.service;

import com.MilkSoft.dto.CowDTO;
import com.MilkSoft.model.Cow;
import com.MilkSoft.model.Farm;
import com.MilkSoft.repository.CowRepository;
import com.MilkSoft.repository.FarmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CowService {


    private final CowRepository cowRepository;
    private  final FarmRepository farmRepository;

    @Autowired
    public CowService(FarmRepository farmRepository,CowRepository cowRepository) {
        this.farmRepository = farmRepository;
        this.cowRepository = cowRepository;
    }

    public Cow createCow(CowDTO cowDTO) {
        Cow cow = new Cow();
        // Set cow properties from cowDTO
        cow.setEarTag(cowDTO.getEarTag());
        cow.setBreed(cowDTO.getBreed());
        cow.setBirthDate(cowDTO.getBirthDate());
        cow.setIsAdult(cowDTO.getIsAdult());
        cow.setIsPregnant(cowDTO.getIsPregnant());


        Farm farm = farmRepository.findById(cowDTO.getFarmId())
                .orElseThrow(() -> new RuntimeException("Farm not found with id " + cowDTO.getFarmId()));
        cow.setFarm(farm);

        farm.getCows().add(cow);

        farmRepository.save(farm);
        return cowRepository.save(cow);
    }


    public void deleteCow(int id) {
        cowRepository.deleteById(id);
    }


}