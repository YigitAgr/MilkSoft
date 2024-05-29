package com.MilkSoft.repository;

import com.MilkSoft.model.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FarmerRepository extends JpaRepository<Farmer, Integer> {
    List<Farmer> findAll();

    int countByAssociation_Id(Integer associationId);

    List<Farmer> findAllByAssociation_Id(Integer associationId);
}