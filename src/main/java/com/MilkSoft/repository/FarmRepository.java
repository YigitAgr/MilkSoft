package com.MilkSoft.repository;

import com.MilkSoft.model.Farm;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FarmRepository extends JpaRepository<Farm, Integer> {
    List<Farm> findByAssociationId(int associationId);
}