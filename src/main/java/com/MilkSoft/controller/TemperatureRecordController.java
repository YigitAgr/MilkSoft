package com.MilkSoft.controller;

import com.MilkSoft.model.TemperatureRecord;
import com.MilkSoft.service.TemperatureRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/temperature-records")
public class TemperatureRecordController {

    private final TemperatureRecordService temperatureRecordService;

    @Autowired
    public TemperatureRecordController(TemperatureRecordService temperatureRecordService) {
        this.temperatureRecordService = temperatureRecordService;
    }

    @GetMapping("/all")
    public List<TemperatureRecord> getAllTemperatureRecords() {
        return temperatureRecordService.getAllTemperatureRecords();
    }

    @PostMapping("/create")
    public TemperatureRecord saveTemperatureRecord(@RequestBody TemperatureRecord temperatureRecord) {
        return temperatureRecordService.saveTemperatureRecord(temperatureRecord);
    }

    // Add other CRUD operations as needed
}
