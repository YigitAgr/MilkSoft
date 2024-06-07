package com.MilkSoft.repository;

import com.MilkSoft.model.TemperatureRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TemperatureRecordRepository extends JpaRepository<TemperatureRecord, Integer> {
}
