package com.MilkSoft.controller;

import com.MilkSoft.service.MonthlyReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;

@RestController
@RequestMapping("/api/reports")
public class MonthlyReportController {

    @Autowired
    private MonthlyReportService monthlyReportService;

    @GetMapping("/generate-csv")
    public ResponseEntity<String> generateCSV() {
        try {
            monthlyReportService.generateCSV("Report.csv");
            return ResponseEntity.ok("CSV file generated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to generate CSV file");
        }
    }

    @GetMapping("/runpython")
    public ResponseEntity<String> runPythonScript() {
        try {
            // Specify the command to run the Python script
            String pythonCommand = "python";
            String scriptPath = "Dataread.py";  // replace with the actual filename of your Python script
            String csvFilePath = "Report.csv";

            // Create a ProcessBuilder
            ProcessBuilder processBuilder = new ProcessBuilder(pythonCommand, scriptPath, csvFilePath);

            // Set the working directory to the directory where the Python script is located
            File workingDirectory = new File("src/main/java/com/MilkSoft/dataread");
            processBuilder.directory(workingDirectory);

            // Redirect the error stream to the output stream
            processBuilder.redirectErrorStream(true);

            // Start the process
            Process process = processBuilder.start();

            // Get the output
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder output = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }

            // Wait for the process to finish
            process.waitFor();

            return ResponseEntity.ok(output.toString());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to execute Python script");
        }
    }
}