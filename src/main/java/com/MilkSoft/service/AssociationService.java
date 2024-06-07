package com.MilkSoft.service;


import com.MilkSoft.dto.FarmMonthlyProductionDTO;
import com.MilkSoft.dto.FarmerFarmDTO;
import com.MilkSoft.model.MonthlyMilkProduction;
import com.MilkSoft.dto.FarmMonthlyProductionDTO;
import com.MilkSoft.dto.MembershipRequestDTO;
import com.MilkSoft.model.Association;
import com.MilkSoft.model.Farm;
import com.MilkSoft.model.Farmer;
import com.MilkSoft.model.MembershipRequest;
import com.MilkSoft.repository.AssociationRepository;
import com.MilkSoft.repository.FarmRepository;
import com.MilkSoft.repository.FarmerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.YearMonth;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
public class AssociationService {

    private AssociationRepository associationRepository;
    private FarmerRepository farmerRepository;
    private FarmRepository farmRepository;

    @Autowired
    public AssociationService(AssociationRepository associationRepository, FarmerRepository farmerRepository, FarmRepository farmRepository) {
        this.associationRepository = associationRepository;
        this.farmerRepository = farmerRepository;
        this.farmRepository = farmRepository;
    }



    public List<Association> getAssociations(){
        return associationRepository.findAll();
    }


    public List<MembershipRequestDTO> getPendingRequests(Integer associationId) {
        return associationRepository.findPendingRequests(associationId, MembershipRequest.RequestStatus.PENDING).stream()
                .map(request -> new MembershipRequestDTO(
                        request.getId(),
                        request.getFarmerId(),
                        request.getFarmerName(),
                        request.getAssociationId(),
                        request.getStatus()
                ))
                .collect(Collectors.toList());
    }

    public int getUserCount(Integer associationId) {
        return farmerRepository.countByAssociation_Id(associationId);
    }

    public List<FarmerFarmDTO> getFarmersAndFarms(Integer associationId) {
        // Fetch all farmers associated with the given association ID
        List<Farmer> farmers = farmerRepository.findAllByAssociation_Id(associationId);

        // Map each farmer to a FarmerFarmDTO object
        return farmers.stream()
                .map(farmer -> {
                    FarmerFarmDTO dto = new FarmerFarmDTO();
                    dto.setId(farmer.getId());
                    dto.setName(farmer.getName());
                    dto.setSurname(farmer.getSurname());
                    dto.setFarm(farmer.getFarm());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    public Integer getAssociationIdByUserId(Integer userId) {
        return associationRepository.findAssociationIdByUserId(userId);
    }


    public List<FarmMonthlyProductionDTO> getFarmsMonthlyProduction(Integer associationId) {
        YearMonth currentMonth = YearMonth.now();
        List<Farm> farms = farmRepository.findByAssociationId(associationId);

        return farms.stream().map(farm -> {
            Map<YearMonth, Integer> monthlyProductions = farm.getMonthlyMilkProductions().stream()
                    .collect(Collectors.groupingBy(
                            MonthlyMilkProduction::getMonth,
                            Collectors.summingInt(MonthlyMilkProduction::getTotalMilkProduced)
                    ));

            int currentMonthTotal = monthlyProductions.getOrDefault(currentMonth, 0);

            FarmMonthlyProductionDTO dto = new FarmMonthlyProductionDTO();
            dto.setFarmId(farm.getId());
            dto.setFarmName(farm.getName());
            dto.setMonthlyProductions(monthlyProductions);
            dto.setCurrentMonthTotal(currentMonthTotal);

            return dto;
        }).collect(Collectors.toList());
    }
}

