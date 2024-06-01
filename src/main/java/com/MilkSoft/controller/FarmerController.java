package com.MilkSoft.controller;

import com.MilkSoft.dto.AssociationDTO;
import com.MilkSoft.dto.CreateFarmDTO;
import com.MilkSoft.model.Association;
import com.MilkSoft.model.Farm;
import com.MilkSoft.model.Farmer;
import com.MilkSoft.service.FarmerService;
import org.springframework.web.bind.annotation.*;
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

    @GetMapping("/associations/{userId}")
    public AssociationDTO getAssociationByUserId(@PathVariable Integer userId) {
        return farmerService.getAssociationByUserId(userId);
    }

    @PostMapping("/createFarm")
    public Farm createFarm(@RequestBody CreateFarmDTO createFarmDTO) {
        return farmerService.createFarm(createFarmDTO);
    }
    @GetMapping("/{userId}")
    public Integer getFarmerIdByUserId(@PathVariable Integer userId) {
        return farmerService.getFarmerIdByUserId(userId);
    }

}