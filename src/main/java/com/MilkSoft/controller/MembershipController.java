package com.MilkSoft.controller;

import com.MilkSoft.model.MembershipRequest;
import com.MilkSoft.service.MembershipService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/membership")
@RequiredArgsConstructor
public class MembershipController {

    private final MembershipService membershipService;

    @PostMapping("/sendRequest")
    public ResponseEntity<MembershipRequest> sendRequest(
            @RequestParam int farmerId,
            @RequestParam int associationId) {
        return ResponseEntity.ok(membershipService.sendRequest(farmerId, associationId));
    }

    @PostMapping("/respondRequest")
    public ResponseEntity<MembershipRequest> respondToRequest(
            @RequestParam int requestId,
            @RequestParam MembershipRequest.RequestStatus status) {
        return ResponseEntity.ok(membershipService.respondToRequest(requestId, status));
    }
}
