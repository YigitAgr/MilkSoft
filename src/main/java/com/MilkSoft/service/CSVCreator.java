package com.MilkSoft.service;

import com.MilkSoft.dto.MonthlyReport;
import com.opencsv.CSVWriter;
import com.opencsv.bean.ColumnPositionMappingStrategy;
import com.opencsv.bean.StatefulBeanToCsv;
import com.opencsv.bean.StatefulBeanToCsvBuilder;
import org.springframework.stereotype.Service;

import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@Service
public class CSVCreator {

    public void createCSV(List<MonthlyReport> reports, String filePath) {
        try (CSVWriter csvWriter = new CSVWriter(new FileWriter(filePath))) {
            String[] columnNames = {"Breed", "City", "Month", "AverageTemperature", "AverageWet", "DailyMilkProduction"};
            csvWriter.writeNext(columnNames);

            for (MonthlyReport report : reports) {
                String[] rowData = {
                        report.getBreed(),
                        report.getCity(),
                        report.getMonth(),
                        String.valueOf(report.getAverageTemperature()),
                        String.valueOf(report.getAverageWet()),
                        String.valueOf(report.getDailyMilkProduction())
                };
                csvWriter.writeNext(rowData);
            }

            System.out.println("CSV file created successfully at: " + filePath);
        } catch (IOException e) {
            System.err.println("Error occurred while creating CSV file: " + e.getMessage());
        }
    }
}