package com.MilkSoft.service;

import com.MilkSoft.dto.MonthlyReport;
import com.MilkSoft.model.Farm;
import com.MilkSoft.model.Temperature;
import com.MilkSoft.model.TemperatureRecord;
import com.MilkSoft.repository.FarmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class MonthlyReportService {

    private final FarmRepository farmRepository;
    private final CSVCreator csvCreator;
    private final String DATA_FOLDER_PATH = "src/main/java/com/MilkSoft/dataread/";

    @Autowired
    public MonthlyReportService(FarmRepository farmRepository, CSVCreator csvCreator) {
        this.farmRepository = farmRepository;
        this.csvCreator = csvCreator;
    }

    public void generateCSV(String fileName) {
        List<Farm> farms = farmRepository.findAll();
        List<MonthlyReport> allReports = new ArrayList<>(); // Collect all reports from farms

        for (Farm farm : farms) {
            List<MonthlyReport> reports = createMonthlyReport(farm); // Generate reports for each farm
            allReports.addAll(reports); // Add reports to the list of all reports
        }

        String filePath = DATA_FOLDER_PATH + fileName;
        System.out.println("Number of reports: " + allReports.size());
        csvCreator.createCSV(allReports, filePath); // Pass all reports to CSVCreator
    }


    private List<MonthlyReport> createMonthlyReport(Farm farm) {
        List<MonthlyReport> reports = new ArrayList<>();
        List<TemperatureRecord> temperatureRecords = farm.getAssociation().getTemperatureRecords();
        List<Temperature> temperatures = new ArrayList<>();

        // Gather all temperatures from all temperature records
        for (TemperatureRecord record : temperatureRecords) {
            temperatures.addAll(record.getTemperatures());
        }

        // Group temperatures by month
        Map<String, List<Temperature>> temperaturesByMonth = temperatures.stream()
                .collect(Collectors.groupingBy(Temperature::getMonth));

        // Iterate over each month
        for (Map.Entry<String, List<Temperature>> entry : temperaturesByMonth.entrySet()) {
            String month = entry.getKey();
            List<Temperature> temperaturesForMonth = entry.getValue();
            float avgTemperature = calculateAverageTemperature(temperaturesForMonth);
            float avgWet = calculateAverageWet(temperaturesForMonth);

            // Create a MonthlyReport object for each month
            MonthlyReport report = new MonthlyReport();
            report.setBreed(farm.getBreed());
            report.setDailyMilkProduction(farm.getDailyMilkProduction());
            report.setCity(farm.getAssociation().getCity());
            report.setMonth(month);
            report.setAverageTemperature(avgTemperature);
            report.setAverageWet(avgWet);

            reports.add(report);
        }

        return reports;
    }


    private float calculateAverageTemperature(List<Temperature> temperatures) {
        int count = temperatures.size();
        float sumTemperature = temperatures.stream().map(Temperature::getTemperature).reduce(0.0f, Float::sum);
        return count > 0 ? sumTemperature / count : 0.0f;
    }

    private float calculateAverageWet(List<Temperature> temperatures) {
        int count = temperatures.size();
        float sumWet = temperatures.stream().map(Temperature::getAverageWet).reduce(0.0f, Float::sum);
        return count > 0 ? sumWet / count : 0.0f;
    }
}