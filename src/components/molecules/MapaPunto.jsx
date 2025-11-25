// src/components/molecules/MapaPunto.jsx
import { useEffect, useRef } from "react";

import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";

import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import Text from "ol/style/Text";
import Fill from "ol/style/Fill";

import { fromLonLat } from "ol/proj";

export function MapaPunto({ nombre, lat, lng, zoom = 18 }) {
  const mapElementRef = useRef(null);

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  useEffect(() => {
    if (!mapElementRef.current) return;

    const puntoFeature = new Feature({
      geometry: new Point(fromLonLat([lng, lat])), // [lon, lat]
      name: nombre,
    });

   puntoFeature.setStyle(
    new Style({
        image: new Icon({
        src: "/marker.png",

        anchor: [0.5, 1],
        anchorXUnits: "fraction",
        anchorYUnits: "fraction",
        scale: 0.18, 
        }),
        text: new Text({
        text: nombre,
        font: "500 13px system-ui, sans-serif",
        textAlign: "center",

        textBaseline: "top",
        offsetY: 1,

        padding: [1, 6, 2, 6],
        fill: new Fill({ color: "#f9fafb" }),
        backgroundFill: new Fill({
            color: "rgba(15,23,42,0.9)",
        }),
        }),
    })
    );

    const vectorSource = new VectorSource({
      features: [puntoFeature],
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    const view = new View({
      center: fromLonLat([lng, lat]),
      zoom,
    });

    const map = new Map({
      target: mapElementRef.current,
      layers: [
        new TileLayer({ source: new OSM() }),
        vectorLayer,
      ],
      view,
    });

    return () => {
      map.setTarget(null);
    };
  }, [nombre, lat, lng, zoom]);

  const handleOpenMaps = () => {
    window.open(mapsUrl, "_blank", "noopener");
  };

  return (
    <div className="space-y-3">
      <div className="w-full h-72 md:h-80 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
        <div ref={mapElementRef} className="w-full h-full" />
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleOpenMaps}
          className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary text-slate-50 text-sm font-medium shadow-sm hover:bg-secondary transition-colors"
        >
          Abrir mapa en Google Maps
        </button>
      </div>
    </div>
  );
}
