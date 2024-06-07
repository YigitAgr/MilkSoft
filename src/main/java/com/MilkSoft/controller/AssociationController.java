package com.MilkSoft.controller;

import com.MilkSoft.dto.*;
import com.MilkSoft.model.Association;
import com.MilkSoft.service.AssociationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/association")
public class AssociationController {

    private final AssociationService associationService;

    public AssociationController(AssociationService associationService) {
        this.associationService = associationService;
    }

    @GetMapping("/pendingRequests/{associationId}")
    public List<MembershipRequestDTO> getPendingRequests(@PathVariable Integer associationId) {
        return associationService.getPendingRequests(associationId);
    }

    @GetMapping("/userCount/{associationId}")
    public int getUserCount(@PathVariable Integer associationId) {
        return associationService.getUserCount(associationId);
    }

    @GetMapping("/farmersAndFarms/{associationId}")
    public List<FarmerFarmDTO> getFarmersAndFarms(@PathVariable Integer associationId) {
        return associationService.getFarmersAndFarms(associationId);
    }


    @GetMapping("/getAssociationId/{userId}")
    public Integer getAssociationIdByUserId(@PathVariable Integer userId) {
        return associationService.getAssociationIdByUserId(userId);
    }

    @GetMapping("/farmsMonthlyProduction/{associationId}")
    public List<FarmMonthlyProductionDTO> getFarmsMonthlyProduction(@PathVariable Integer associationId) {
        return associationService.getFarmsMonthlyProduction(associationId);
    }


    @GetMapping("/info/{associationId}")
    public AssociationDTO getAssociationInfo(@PathVariable Integer associationId) {
        return associationService.getAssociationInfo(associationId);
    }

    @PutMapping("/update/{associationId}")
    public Association updateAssociation(@PathVariable Integer associationId, @RequestBody UpdateAssociationDTO updateAssociationDTO) {
        return associationService.updateAssociation(associationId, updateAssociationDTO);
    }




}