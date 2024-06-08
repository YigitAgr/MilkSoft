package com.MilkSoft.controller;

import com.MilkSoft.dto.TemperatureRecordDTO;
import com.MilkSoft.model.TemperatureRecord;
import com.MilkSoft.service.TemperatureRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    public TemperatureRecord saveTemperatureRecord(@RequestBody TemperatureRecordDTO temperatureRecordDTO) {
        return temperatureRecordService.saveTemperatureRecord(temperatureRecordDTO);
    }

    @GetMapping("/by-association/{associationId}")
    public List<TemperatureRecord> getTemperatureRecordsByAssociationId(@PathVariable int associationId) {
        return temperatureRecordService.getTemperatureRecordsByAssociationId(associationId);
    }

    @GetMapping("/temperature-records/by-month/{month}")
    public List<TemperatureRecord> getTemperatureRecordsByMonth(@PathVariable String month) {
        return temperatureRecordService.findByMonth(month);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<TemperatureRecord> updateTemperatureRecord(@PathVariable Integer id, @RequestBody TemperatureRecordDTO temperatureRecordDTO) {
        TemperatureRecord updatedRecord = temperatureRecordService.updateTemperatureRecord(id, temperatureRecordDTO);
        return ResponseEntity.ok(updatedRecord);
    }

}
