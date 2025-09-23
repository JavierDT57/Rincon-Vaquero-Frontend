import { useEffect, useMemo, useState } from "react";
import { getForecast } from "../api/clima";

const WTEXT = (code) => {
  if (code === 0) return "Despejado";
  if ([1, 2].includes(code)) return "Parcialmente nublado";
  if ([3, 45, 48].includes(code)) return "Nublado";
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82) || [95,96,99].includes(code)) return "Lluvia";
  if (code >= 71 && code <= 86) return "Nieve";
  return "Condición variable";
};

const WICON = (code) => {
  if (code === 0) return "sun";
  if ([1,2,3,45,48].includes(code)) return "cloud";
  return "rain";
};

const uvLabel = (uv) =>
  uv == null ? "—" :
  uv < 3 ? "Bajo" :
  uv < 6 ? "Moderado" :
  uv < 8 ? "Alto" :
  uv < 11 ? "Muy alto" : "Extremo";

const dayLabel = (idx) =>
  idx === 0 ? "Hoy" : idx === 1 ? "Mañana" :
  new Date(Date.now() + idx * 86400000).toLocaleDateString("es-MX", { weekday: "long" });

export function useClimaOpenMeteo({ lat, lon }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let abort = false;
    (async () => {
      try {
        setLoading(true);
        const json = await getForecast({ lat, lon });
        if (!abort) setData(json);
      } catch (e) {
        if (!abort) setError(e);
      } finally {
        if (!abort) setLoading(false);
      }
    })();
    return () => { abort = true; };
  }, [lat, lon]);

  const vm = useMemo(() => {
    if (!data) return { climaActual: null, semana: [] };

    // Índice de la hora actual según Open-Meteo (respeta timezone=auto)
    const idxNow = data.hourly.time.indexOf(data.current_weather.time);

    const temp  = Math.round(data.current_weather.temperature);
    const feels = Math.round(data.hourly.apparent_temperature?.[idxNow] ?? temp);

    // ✅ HUMEDAD (porcentaje) — SOLO corregimos esto, sin tocar idxNow
    let rh = data.hourly.relativehumidity_2m?.[idxNow];
    if (rh == null) {
      const hourlyTimes = data.hourly.time || [];
      const cw = data.current_weather.time || "";
      // 1) Coincidencia por hora (YYYY-MM-DDTHH)
      let altIdx = hourlyTimes.findIndex(t => t.slice(0,13) === cw.slice(0,13));
      // 2) Si no hay, toma el índice más cercano en tiempo
      if (altIdx === -1 && hourlyTimes.length) {
        const target = new Date(cw).getTime();
        let best = 0, bestDiff = Infinity;
        for (let i = 0; i < hourlyTimes.length; i++) {
          const diff = Math.abs(new Date(hourlyTimes[i]).getTime() - target);
          if (diff < bestDiff) { bestDiff = diff; best = i; }
        }
        altIdx = best;
      }
      rh = data.hourly.relativehumidity_2m?.[altIdx];
    }
    const humedadStr = (rh ?? rh === 0) ? `${Math.round(rh)}%` : "—";

    // ✅ VIENTO (km/h)
    const wind = Math.round(data.current_weather.windspeed);

    // ✅ UV horario con fallback al máximo diario (útil de noche)
    let uv = data.hourly.uv_index?.[idxNow];
    if (uv == null) uv = data.daily.uv_index_max?.[0];

    // ✅ Probabilidad de lluvia (prioriza horario, si no el máximo diario)
    const popHr = data.hourly.precipitation_probability?.[idxNow];
    const popDy = data.daily.precipitation_probability_max?.[0];
    const lluviaPct = (popHr ?? popDy ?? 0);

    const wcode = data.current_weather.weathercode;

    const climaActual = {
      temperatura: `${temp}°C`,
      sensacion: `${feels}°C`,
      humedad: humedadStr,            // ← corregido
      viento: `${wind} km/h`,
      uv: uvLabel(uv),
      lluvia: `${lluviaPct}%`,
      descripcion: WTEXT(wcode),
    };

    const semana = data.daily.time.slice(0, 7).map((_, i) => ({
      dia: dayLabel(i),
      tMax: Math.round(data.daily.temperature_2m_max[i]),
      tMin: Math.round(data.daily.temperature_2m_min[i]),
      icon: WICON(data.daily.weathercode[i]),
    }));

    return { climaActual, semana };
  }, [data]);

  return { ...vm, loading, error };
}
