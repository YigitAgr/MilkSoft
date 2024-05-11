package com.MilkSoft.service;

import com.MilkSoft.dto.MonthlyReport;
import com.opencsv.CSVWriter;
import com.opencsv.bean.ColumnPositionMappingStrategy;
import com.opencsv.bean.StatefulBeanToCsv;
import com.opencsv.bean.StatefulBeanToCsvBuilder;
import org.springframework.stereotype.Service;

import java.io.Writer;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@Service
public class CSVCreator {

    public void createCSV(List<MonthlyReport> reports, String fileName) {
        try {
            Writer writer = Files.newBufferedWriter(Paths.get(fileName));

            // Write the column names to the CSV file
            String[] columnNames = {"Breed", "City", "Month", "AverageTemperature", "AverageWet", "DailyMilkProduction"};
            CSVWriter csvWriter = new CSVWriter(writer, ';', CSVWriter.NO_QUOTE_CHARACTER, CSVWriter.DEFAULT_ESCAPE_CHARACTER, CSVWriter.DEFAULT_LINE_END);  // Use semicolon as the separator
            csvWriter.writeNext(columnNames);

            // Write the data to the CSV file
            StatefulBeanToCsv<MonthlyReport> beanToCsv = new StatefulBeanToCsvBuilder<MonthlyReport>(writer)
                    .withSeparator(';')  // Use semicolon as the separator
                    .withQuotechar('"')
                    .withEscapechar('\\')
                    .withLineEnd("\n")
                    .withOrderedResults(false)
                    .withApplyQuotesToAll(false)
                    .withMappingStrategy(new ColumnPositionMappingStrategy<>())
                    .build();
            beanToCsv.write(reports);

            writer.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}