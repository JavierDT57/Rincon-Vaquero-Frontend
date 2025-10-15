// src/api/weather.js
export async function getForecast({ lat, lon, timezone = "auto" }) {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    timezone,
    current_weather: "true",
    // 👇 CORREGIDO: relative_humidity_2m (con "_")
    hourly: [
      "apparent_temperature",
      "relative_humidity_2m",     // ✅ humedad (correcto)
      "uv_index",
      "precipitation_probability",
      "weathercode",
    ].join(","),
    daily: [
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_probability_max",
      "weathercode",
      "uv_index_max",
    ].join(","),
    // opcional: fuerza 7 días
    forecast_days: "7",
  });

  const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Weather fetch failed: ${res.status}`);
  return res.json();
}
