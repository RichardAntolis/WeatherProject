package com.example.weatherbackend.controller;

import com.example.weatherbackend.dto.WeatherResponse;
import com.example.weatherbackend.service.WeatherService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class HelloController {

    private final WeatherService weatherService;

    public HelloController(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @GetMapping("/api/weather")
    public WeatherResponse weather(@RequestParam String city) {
        return weatherService.getWeather(city);
    }
}