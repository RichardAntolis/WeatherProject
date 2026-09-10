"use client";

import { useState } from "react";

type Weather = {
  city: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
};

export default function Home() {
  const [city, setCity] = useState("Jakarta");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function searchWeather() {
  if (!city.trim()) {
    setError("Kota harus diisi");
    setWeather(null);
    return;
  }

  try {
    setLoading(true);
    setError(null);
    setWeather(null);

    const response = await fetch(
      `http://localhost:8080/api/weather?city=${encodeURIComponent(city)}`
    );

    if (!response.ok) {
      throw new Error("Gagal mengambil data weather");
    }

    const data = await response.json();

    setWeather(data);
  } catch (error) {
    setError("Kota tidak ditemukan");
  } finally {
    setLoading(false);
  }
}

  return (
    <div>
      <h1 className="text-4xl font-bold">
        Weather App
      </h1>

      <label>
        Kota:
        <input
          value={city}
          onChange={(event) => setCity(event.target.value)}
        />
      </label>

      <button onClick={searchWeather} disabled={loading}>
        {loading ? "Loading..." : "Search"}
      </button>

      {error && (
  <p>{error}</p>
)}

{!weather && !error && !loading && (
  <p>Belum ada data weather. Silakan cari kota terlebih dahulu.</p>
)}

{weather && (
  <div>
    <h2>{weather.city}</h2>
    <p>Temperature: {weather.temperature}°C</p>
    <p>Humidity: {weather.humidity}%</p>
    <p>Wind Speed: {weather.windSpeed} km/h</p>
  </div>
)}
    </div>
  );
}