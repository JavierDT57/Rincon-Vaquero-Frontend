// src/api/weather.js
export async function getForecast({ lat, lon, timezone = "auto" }) {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    timezone,
    current_weather: "true",
    // 👇 AÑADE humedad y uv_index en hourly
    hourly: [
      "apparent_temperature",
      "relativehumidity_2m",     // ✅ humedad
      "uv_index",                // ✅ UV horario
      "precipitation_probability",
      "weathercode"
    ].join(","),
    // 👇 AÑADE uv_index_max en daily (fallback para noches)
    daily: [
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_probability_max",
      "weathercode",
      "uv_index_max"            // ✅ UV diario (máximo)
    ].join(","),
  });

  const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Weather fetch failed: ${res.status}`);
  return res.json();
}
