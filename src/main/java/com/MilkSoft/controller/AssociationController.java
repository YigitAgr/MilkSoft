package com.MilkSoft.controller;

import com.MilkSoft.dto.FarmerFarmDTO;
import com.MilkSoft.dto.MembershipRequestDTO;
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


}