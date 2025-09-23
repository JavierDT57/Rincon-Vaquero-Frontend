// src/containers/ClimaYEpocaContainer.jsx
import React from "react";
import { useClimaOpenMeteo } from "../../hooks/useClima";
import ClimaYEpoca from "../../components/organisms/Home/Clima/Clima";

// Rincon Vaquero Centro
const RV = { lat: 16.48, lon: -95.00 };

export default function ClimaYEpocaContainer() {
  const { climaActual, semana, loading, error } = useClimaOpenMeteo(RV);
  return (
    <ClimaYEpoca
      climaActual={climaActual}
      semana={semana}
      loading={loading}
      error={error}
    />
  );
}



