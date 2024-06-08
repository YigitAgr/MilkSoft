package com.MilkSoft.service;

import com.MilkSoft.dto.TemperatureDTO;
import com.MilkSoft.dto.TemperatureRecordDTO;
import com.MilkSoft.model.Association;
import com.MilkSoft.model.Temperature;
import com.MilkSoft.model.TemperatureRecord;
import com.MilkSoft.repository.TemperatureRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public List<TemperatureRecord> getTemperatureRecordsByAssociationId(int associationId) {
        List<TemperatureRecord> temperatureRecords = temperatureRecordRepository.findByAssociationId(associationId);

        // Extracting only the temperatures section
        return temperatureRecords.stream()
                .map(temperatureRecord -> {
                    TemperatureRecord tempRecord = new TemperatureRecord();
                    tempRecord.setTemperatures(temperatureRecord.getTemperatures());
                    return tempRecord;
                })
                .collect(Collectors.toList());
    }


    public TemperatureRecord saveTemperatureRecord(TemperatureRecordDTO temperatureRecordDTO) {
        // Convert TemperatureRecordDTO to TemperatureRecord
        TemperatureRecord temperatureRecord = new TemperatureRecord();

        // Assuming TemperatureRecordDTO has a List<TemperatureDTO> temperatures field
        List<Temperature> temperatures = new ArrayList<>();
        for (TemperatureDTO temperatureDTO : temperatureRecordDTO.getTemperatures()) {
            Temperature temperature = new Temperature();
            temperature.setTemperature(temperatureDTO.getTemperature());
            temperature.setAverageWet(temperatureDTO.getAverageWet());
            temperature.setMonth(temperatureDTO.getMonth());
            temperature.setTemperatureRecord(temperatureRecord); // Assuming bidirectional relationship
            temperatures.add(temperature);
        }
        temperatureRecord.setTemperatures(temperatures);

        // Set the association ID for the TemperatureRecord
        Association association = new Association();
        association.setId(temperatureRecordDTO.getAssociationId()); // Set the association ID based on the DTO
        temperatureRecord.setAssociation(association);

        // Save the TemperatureRecord to the database using a repository
        return temperatureRecordRepository.save(temperatureRecord);
    }

    public List<TemperatureRecord> findByMonth(String month) {
        return temperatureRecordRepository.findByTemperaturesMonth(month);
    }


    public TemperatureRecord updateTemperatureRecord(Integer id, TemperatureRecordDTO temperatureRecordDTO) {
        Optional<TemperatureRecord> optionalRecord = temperatureRecordRepository.findById(id);
        if (optionalRecord.isPresent()) {
            TemperatureRecord existingRecord = optionalRecord.get();

            // Update the existing record with the new data from temperatureRecordDTO
            List<Temperature> temperatures = existingRecord.getTemperatures();
            List<TemperatureDTO> temperatureDTOs = temperatureRecordDTO.getTemperatures();

            if (temperatureDTOs != null && !temperatureDTOs.isEmpty()) {
                for (int i = 0; i < Math.min(temperatures.size(), temperatureDTOs.size()); i++) {
                    Temperature temperature = temperatures.get(i);
                    TemperatureDTO temperatureDTO = temperatureDTOs.get(i);

                    temperature.setTemperature(temperatureDTO.getTemperature());
                    temperature.setAverageWet(temperatureDTO.getAverageWet());
                    temperature.setMonth(temperatureDTO.getMonth());
                }
            } else {
                throw new RuntimeException("TemperatureDTOs list is null or empty.");
            }

            // Save the updated record
            TemperatureRecord updatedRecord = temperatureRecordRepository.save(existingRecord);
            return updatedRecord;
        } else {
            throw new RuntimeException("Temperature record not found with id: " + id);
        }
    }



}
