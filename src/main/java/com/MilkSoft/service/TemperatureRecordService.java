package com.MilkSoft.service;

import com.MilkSoft.model.TemperatureRecord;
import com.MilkSoft.repository.TemperatureRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TemperatureRecordService {

    private final TemperatureRecordRepository temperatureRecordRepository;

    @Autowired
    public TemperatureRecordService(TemperatureRecordRepository temperatureRecordRepository) {
        this.temperatureRecordRepository = temperatureRecordRepository;
    }

    public List<TemperatureRecord> getAllTemperatureRecords() {
        return temperatureRecordRepository.findAll();
    }

    public TemperatureRecord saveTemperatureRecord(TemperatureRecord temperatureRecord) {
        return temperatureRecordRepository.save(temperatureRecord);
    }

    // Add other methods as needed
}
