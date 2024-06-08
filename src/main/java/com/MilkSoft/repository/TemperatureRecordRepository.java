package com.MilkSoft.repository;

import com.MilkSoft.model.TemperatureRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TemperatureRecordRepository extends JpaRepository<TemperatureRecord, Integer> {
    List<TemperatureRecord> findByAssociationId(int associationId);

    List<TemperatureRecord> findByTemperaturesMonth(String month);
}
