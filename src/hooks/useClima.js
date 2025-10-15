import { useEffect, useState } from "react";
import { getForecast } from "../api/clima.js";

/* Helpers */
const uvLabel = (n) => {
  if (n == null || Number.isNaN(Number(n))) return "—";
  const v = Number(n);
  if (v < 3) return "Bajo";
  if (v < 6) return "Moderado";
  if (v < 8) return "Alto";
  if (v < 11) return "Muy alto";
  return "Extremo";
};
const WMO_DESC = { 0:"Despejado",1:"Parcialmente despejado",2:"Mayormente nublado",3:"Nublado",
  45:"Niebla",48:"Niebla con escarcha",51:"Llovizna ligera",53:"Llovizna",55:"Llovizna intensa",
  56:"Llovizna helada",57:"Llovizna helada intensa",61:"Lluvia ligera",63:"Lluvia",65:"Lluvia intensa",
  66:"Lluvia helada",67:"Lluvia helada intensa",80:"Chubascos ligeros",81:"Chubascos",82:"Chubascos fuertes",
  95:"Tormenta",96:"Tormenta con granizo",99:"Tormenta fuerte con granizo"
};
const isRainCode = (c)=>[51,53,55,56,57,61,63,65,66,67,80,81,82,95,96,99].includes(Number(c));
const iconFromCode = (c)=> (Number(c)===0 ? "sun" : isRainCode(c) ? "rain" : "cloud");
const diaES = (d, tz)=> new Date(`${d}T12:00:00`).toLocaleDateString("es-MX",{weekday:"long", timeZone:tz||"UTC"});

const findHourIndex = (times=[], iso="")=>{
  let idx = times.indexOf(iso);
  if (idx >= 0) return idx;
  if (iso) idx = times.indexOf(iso.slice(0,13)+":00");
  if (idx >= 0) return idx;
  if (!times.length) return -1;
  const t = new Date(iso).getTime();
  let best=0, diff=Infinity;
  times.forEach((x,i)=>{ const d = Math.abs(new Date(x).getTime()-t); if(d<diff){diff=d; best=i;}});
  return best;
};
const avgWindow = (arr, i, w=1) => {
  if (!arr || i < 0) return null;
  let s=0,c=0;
  for (let k=i-w; k<=i+w; k++){
    if (k>=0 && k<arr.length && Number.isFinite(Number(arr[k]))){
      s+=Number(arr[k]); c++;
    }
  }
  return c? s/c : null;
};

export function useClimaOpenMeteo({ lat, lon, timezone = "auto" }) {
  const [state, setState] = useState({ climaActual:null, semana:[], loading:true, error:null });

  useEffect(() => {
    let cancel=false;
    (async ()=>{
      try{
        setState(s=>({...s, loading:true, error:null}));
        const data = await getForecast({ lat, lon, timezone });
        if (cancel) return;

        const { current_weather, hourly, daily, timezone: tz } = data;
        const idx = findHourIndex(hourly?.time, current_weather?.time);

        // Suavizados ±1h
        const hum = avgWindow(hourly?.relative_humidity_2m, idx, 1);
        const precipH = avgWindow(hourly?.precipitation_probability, idx, 1);
        const app = hourly?.apparent_temperature?.[idx];
        const windH = hourly?.windspeed_10m?.[idx];

        const hoy = current_weather.time.slice(0,10);
        const dIdx = daily?.time?.indexOf(hoy) ?? -1;
        const uvMaxDia = dIdx>=0 ? daily?.uv_index_max?.[dIdx] : null;
        const precipMaxDia = dIdx>=0 ? daily?.precipitation_probability_max?.[dIdx] : null;

        const uvAhora = current_weather.is_day === 0 ? "Bajo" : uvLabel(hourly?.uv_index?.[idx] ?? uvMaxDia);

        // RealFeel: por la noche si la diferencia <= 2°C, igualamos a temp
        const temp = Math.round(current_weather.temperature);
        const appRounded = Number.isFinite(app) ? Math.round(app) : temp;
        const sens = (current_weather.is_day===0 && Math.abs(appRounded-temp)<=2) ? temp : appRounded;

        const code = current_weather.weathercode;
        const descripcion = WMO_DESC[code] ?? (isRainCode(code) ? "Lluvia" : "Mayormente nublado");

        const climaActual = {
          temperatura: `${temp}°C`,
          sensacion: `${sens}°C`,
          humedad: hum!=null ? `${Math.round(hum)}%` : "—",
          viento: `${Math.round(windH ?? current_weather.windspeed)} km/h`,
          uv: uvAhora,
          lluvia: precipH!=null ? `${Math.round(precipH)}%`
                                : (precipMaxDia!=null ? `${Math.round(precipMaxDia)}%` : "—"),
          descripcion,
        };

        const semana = (daily?.time ?? []).map((d,i)=>({
          dia: diaES(d, tz),
          tMax: Math.round(daily.temperature_2m_max[i]),
          tMin: Math.round(daily.temperature_2m_min[i]),
          icon: iconFromCode(daily.weathercode?.[i]),
        }));

        setState({ climaActual, semana, loading:false, error:null });
      }catch(e){
        if(!cancel) setState(s=>({...s, loading:false, error:e?.message||String(e)}));
      }
    })();
    return ()=>{ cancel=true; };
  }, [lat, lon, timezone]);

  return state;
}
