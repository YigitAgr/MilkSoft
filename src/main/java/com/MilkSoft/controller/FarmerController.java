package com.MilkSoft.controller;

import com.MilkSoft.dto.AssociationDTO;
import com.MilkSoft.model.Association;
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
}