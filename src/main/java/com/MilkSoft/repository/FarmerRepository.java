package com.MilkSoft.repository;

import com.MilkSoft.model.Farmer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FarmerRepository extends JpaRepository<Farmer, Integer> {

}
