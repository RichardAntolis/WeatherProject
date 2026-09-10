package com.example.weatherbackend.service;

import com.example.weatherbackend.dto.WeatherResponse;
import com.example.weatherbackend.exception.CityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class WeatherService {

    private final Map<String, WeatherResponse> weatherData = Map.of(
            "jakarta", new WeatherResponse(
                    "Jakarta",
                    29.0,
                    72,
                    12.5
            ),
            "bandung", new WeatherResponse(
                    "Bandung",
                    24.0,
                    80,
                    8.0
            ),
            "surabaya", new WeatherResponse(
                    "Surabaya",
                    31.0,
                    70,
                    15.0
            )
    );

    public WeatherResponse getWeather(String city) {

        WeatherResponse weather = weatherData.get(
                city.toLowerCase()
        );

        if (weather == null) {
            throw new CityNotFoundException(
                    "Kota tidak ditemukan: " + city
            );
        }

        return weather;
    }
}