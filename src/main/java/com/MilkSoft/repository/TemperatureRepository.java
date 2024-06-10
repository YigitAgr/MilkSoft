package com.MilkSoft.repository;

import com.MilkSoft.model.Temperature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TemperatureRepository extends JpaRepository<Temperature, Integer> {
    // You can add custom query methods here if needed
}
