import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../../../molecules/Card";
import { Calendar, Users, Music } from "lucide-react"

/* IMPORTA AQUI TUS IMÁGENES desde src/assets */
import tehuana from "../../../../assets/Home/tehuanas.jpg";

export function CultureSection() {
  const culturalEvents = [
    {

      title: "Semana Santa",
      date: "Marzo/Abril",
      description: "Procesiones religiosas y representaciones de la Pasión de Cristo.",
      icon: Users,
    },
    {
      title: "Fiesta de la Santa Cruz",
      date: "Mayo",
      description: "Celebración tradicional en honor a la santa cruz con bailables y música.",
      icon: Music,
    },
    {
      title: "Navidad",
      date: "Diciembre",
      description: "Fiesta navideña con posadas tradicionales, pastorelas y la llegada del Niño Dios",
      icon: Calendar,
    },
  ]

  return (
    <section id="cultura" className="py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Tradiciones Vivas</h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Nuestras tradiciones se mantienen vivas a través de generaciones. Cada festividad es una oportunidad para
              conectar con nuestras raíces y compartir la riqueza cultural de nuestro pueblo.
            </p>

            <div className="space-y-6 ">
              {culturalEvents.map((event, index) => (
                <Card key={index} className="border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <event.icon className="w-6 h-10 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{event.title}</h3>
                          <span className="text-sm bg-primary px-2 py-1 rounded-full !text-white mt-1">{event.date}</span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src={tehuana}
              alt="Tradiciones culturalesss"
              className="w-full rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  )
}
