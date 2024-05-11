package com.MilkSoft.service;

import com.MilkSoft.dto.MonthlyReport;
import com.MilkSoft.model.Farm;
import com.MilkSoft.model.TemperatureRecord;
import com.MilkSoft.repository.FarmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MonthlyReportService {

    @Autowired
    private FarmRepository farmRepository;

    @Autowired
    private CSVCreator csvCreator;

    public void generateCSV(String fileName) {
        List<Farm> farms = farmRepository.findAll();
        List<MonthlyReport> reports = new ArrayList<>();

        for (Farm farm : farms) {
            // Populate the MonthlyReport object with data from Farm and Association
            MonthlyReport report = new MonthlyReport();
            report.setBreed(farm.getBreed());
            report.setDailyMilkProduction(farm.getDailyMilkProduction());
            report.setCity(farm.getAssociation().getCity());

            // Get temperature records from Association
            List<TemperatureRecord> temperatureRecords = farm.getAssociation().getTemperatureRecords();

            // Calculate min, max, and average temperature
            List<Float> temperatures = temperatureRecords.stream()
                    .map(TemperatureRecord::getTemperature)
                    .collect(Collectors.toList());
            float minTemperature = temperatures.stream().min(Float::compare).orElse(Float.NaN);
            float maxTemperature = temperatures.stream().max(Float::compare).orElse(Float.NaN);
            float avgTemperature = (float) temperatures.stream().mapToDouble(val -> val).average().orElse(Double.NaN);

            report.setMinTemperature(minTemperature);
            report.setMaxTemperature(maxTemperature);
            report.setAvgTemperature(avgTemperature);

            reports.add(report);
        }
        // Specify the path to the dataread folder
        String filePath = "src/main/java/com/MilkSoft/dataread/" + fileName;
        System.out.println("Number of reports: " + reports.size());
        csvCreator.createCSV(reports, filePath);
    }
}