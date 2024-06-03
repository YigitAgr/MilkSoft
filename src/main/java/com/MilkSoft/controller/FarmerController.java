package com.MilkSoft.controller;

import com.MilkSoft.dto.AssociationDTO;
import com.MilkSoft.dto.CreateFarmDTO;
import com.MilkSoft.model.Association;
import com.MilkSoft.model.Farm;
import com.MilkSoft.dto.IdsDTO;
import com.MilkSoft.model.Farmer;
import com.MilkSoft.service.FarmerService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/farmer")
public class FarmerController {

    private final FarmerService farmerService;

    public FarmerController(FarmerService farmerService) {
        this.farmerService = farmerService;
    }

    @GetMapping("/associations")
    public List<AssociationDTO> getAllAssociations() {
        return farmerService.getAllAssociations();
    }

    @GetMapping("/associations/farmer/{farmerId}")
    public AssociationDTO getAssociationByFarmerId(@PathVariable Integer farmerId) {
        return farmerService.getAssociationByFarmerId(farmerId);
    }

    @PostMapping("/createFarm")
    public Farm createFarm(@RequestBody CreateFarmDTO createFarmDTO) {
        return farmerService.createFarm(createFarmDTO);
    }

    @GetMapping("/{userId}")
    public IdsDTO getIdsByUserId(@PathVariable Integer userId) {
        return farmerService.getIdsByUserId(userId);
    }

    @GetMapping("/{userId}/farm")
    public Farm getFarmByUserId(@PathVariable Integer userId) {
        return farmerService.getFarmByUserId(userId);
    }

    @DeleteMapping("/deleteFarm/{farmId}")
    public void deleteFarm(@PathVariable Integer farmId) {
        farmerService.deleteFarm(farmId);
    }

}