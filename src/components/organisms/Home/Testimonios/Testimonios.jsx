import { useState, useEffect, useMemo } from "react";
import { Card, CardContent } from "../../../molecules/Card";
import Button from "../../../atoms/Button";
import { Badge } from "../../../atoms/badge";
import { ChevronLeft, ChevronRight, Star, Quote, MapPin, Calendar } from "lucide-react";

import { fetchTestimonios, createTestimonio, API_ORIGIN } from "../../../../api/testimonios.js";
import TestimoniosModal from "../../Home/Testimonios/TestimoniosModal.jsx";

// Imágenes locales (fallback)
import olaverde from "../../../../assets/Home/campo1.jpeg";
import rio2 from "../../../../assets/Home/rio2.jpg";
import tequio1 from "../../../../assets/Home/tequio1.png";

/* ---------------- helpers ---------------- */
const absUrl = (p) => {
  if (!p || typeof p !== "string") return null;
  if (/^https?:\/\//i.test(p)) return p;
  return `${API_ORIGIN}${p.startsWith("/") ? p : `/${p}`}`;
};

const safeId = () => `testi_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

function normalize(raw) {
  if (!raw || typeof raw !== "object") return null;

  const foto = absUrl(
    raw.imagenUrl ?? raw.imagenurl ?? raw.img_url ?? raw.imgurl ?? raw.imageUrl ?? raw.image
  );

  const fechaISO = raw.fecha ?? raw.createdAt ?? raw.created_at ?? null;
  const fechaTxt = fechaISO
    ? new Date(fechaISO).toLocaleDateString("es-MX", { month: "long", year: "numeric" })
    : "";

  return {
    id: raw.id ?? raw._id ?? safeId(),
    nombre: String(raw.nombre ?? "Anónimo"),
    origen: String(raw.localidad ?? ""), // tu UI usa "origen"
    fecha: fechaTxt || "",
    rating: parseInt(raw.rating ?? 5, 10) || 5,
    testimonio: String(raw.comentario ?? raw.texto ?? raw.descripcion ?? ""),
    foto: foto || null,
    experiencia: raw.experiencia ?? "", // opcional; si no existe, no se muestra
  };
}
/* ---------------------------------------- */

export function TestimoniosYFotos() {
  /* estado del carrusel (manteniendo tu diseño original) */
  const seed = useMemo(
    () => [
      {

      },


    ],
    []
  );

  const [items, setItems] = useState(seed);
  const [testimonioActual, setTestimonioActual] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  /* modal */
  const [isOpen, setIsOpen] = useState(false);
  const [formNombre, setFormNombre] = useState("");
  const [formLocalidad, setFormLocalidad] = useState("");
  const [formComentario, setFormComentario] = useState("");
  const [formRating, setFormRating] = useState(5);
  const [formFile, setFormFile] = useState(null);
  const [formPreview, setFormPreview] = useState("");

  /* carga inicial desde backend */
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchTestimonios();
        const list = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
        const normalized = list.map(normalize).filter(Boolean);
        if (normalized.length) setItems(normalized);
      } catch {
        // si falla, nos quedamos con seed
      }
    })();
  }, []);

  /* autoplay */
  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;
    const interval = setInterval(
      () => setTestimonioActual((prev) => (prev + 1) % items.length),
      5000
    );
    return () => clearInterval(interval);
  }, [autoPlay, items.length]);

  const siguienteTestimonio = () => {
    setTestimonioActual((prev) => (prev + 1) % items.length);
    setAutoPlay(false);
  };
  const testimonioAnterior = () => {
    setTestimonioActual((prev) => (prev - 1 + items.length) % items.length);
    setAutoPlay(false);
  };

  const testimonioSeleccionado = items[testimonioActual] || items[0];

  /* handlers modal */
  const onFileChange = (e) => {
    const f = e.target.files?.[0] || null;
    setFormFile(f);
    setFormPreview(f ? URL.createObjectURL(f) : "");
  };

  const resetForm = () => {
    setIsOpen(false);
    setFormNombre("");
    setFormLocalidad("");
    setFormComentario("");
    setFormRating(5);
    setFormFile(null);
    setFormPreview("");
  };

  // arriba, junto a tus useState
const [isPortrait, setIsPortrait] = useState(false);

// cuando cambie de slide, resetea (opcional, evita parpadeo)
useEffect(() => { setIsPortrait(false); }, [testimonioActual]);

const handleImgLoad = (e) => {
  const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
  setIsPortrait(h > w); // true si es vertical
};


  async function onSubmit(e) {
    e.preventDefault();

    const nombre = formNombre.trim();
    const comentario = formComentario.trim();
    const localidad = formLocalidad.trim();
    const rating = Math.max(1, Math.min(5, parseInt(formRating, 10) || 5));

    if (!nombre || !comentario) {
      alert("Nombre y comentario son obligatorios.");
      return;
    }

    // Optimista (para que se vea instantáneo en el carrusel)
    const tmp = normalize({
      nombre,
      comentario,
      localidad,
      rating,
      imagenurl: formPreview || null,
      fecha: new Date().toISOString(),
      id: safeId(),
    });
    setItems((prev) => [tmp, ...prev]);
    setTestimonioActual(0);

    try {
      await createTestimonio({ comentario, localidad, nombre, rating, imagenFile: formFile });

      // recarga real desde la BD
      const data = await fetchTestimonios();
      const list = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
      const normalized = list.map(normalize).filter(Boolean);
      if (normalized.length) setItems(normalized);
      setTestimonioActual(0);
      resetForm();
    } catch (err) {
      console.error("No se pudo crear el testimonio:", err);
      alert(err.message || "No se pudo crear el testimonio.");
      setItems((prev) => prev.filter((t) => t.id !== tmp.id));
    }
  }

  return (
    <section className="py-20 px-4 bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-balance">Testimonios & Fotos de Visitantes</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Descubre por qué nuestros visitantes se enamoran de Rincón Vaquero y regresan una y otra vez
          </p>
        </div>

        <div className="relative">
          <Card className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Imagen */}
              <div className="relative h-96 lg:h-[28rem] bg-gradient-to-br from-slate-200 to-slate-100">
                <img
                  key={testimonioSeleccionado.foto} // asegura que onLoad dispare al cambiar de foto
                  src={testimonioSeleccionado.foto || "/placeholder.svg"}
                  alt={`Experiencia de ${testimonioSeleccionado.nombre}`}
                  onLoad={handleImgLoad}
                  className={`absolute inset-0 w-full h-full ${
                    isPortrait ? "object-contain" : "object-cover"
                  }`}
                />
                {/* sombreado sutil para mejor lectura */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                {!!testimonioSeleccionado.experiencia && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-primary">
                      {testimonioSeleccionado.experiencia}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Testimonio */}
              <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="mb-6">
                  <Quote className="w-8 h-8 text-primary mb-4" />
                  <p className="text-lg leading-relaxed mb-6 italic">
                    “{testimonioSeleccionado.testimonio}”
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonioSeleccionado.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <div>
                    <h4 className="font-semibold text-lg">{testimonioSeleccionado.nombre}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{testimonioSeleccionado.origen}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{testimonioSeleccionado.fecha}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>

          {/* Controles de navegación */}
          <div className="flex items-center justify-between mt-8">
            <Button variant="outline" size="icon" onClick={testimonioAnterior} className="rounded-full ">
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-2">
              {items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setTestimonioActual(index);
                    setAutoPlay(false);
                  }}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === testimonioActual ? "bg-black" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <Button variant="outline" size="icon" onClick={siguienteTestimonio} className="rounded-full ">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Card className="max-w-lg mx-auto">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4">¿Ya visitaste Rincón Vaquero?</h3>
              <p className="text-muted-foreground mb-6">
                Comparte tu experiencia y fotos con otros viajeros
              </p>
              <Button className="w-full" onClick={() => setIsOpen(true)}>
                Compartir mi experiencia
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal para crear testimonio */}
      <TestimoniosModal
        isOpen={isOpen}
        onClose={resetForm}
        onSubmit={onSubmit}
        formNombre={formNombre}
        setFormNombre={setFormNombre}
        formLocalidad={formLocalidad}
        setFormLocalidad={setFormLocalidad}
        formComentario={formComentario}
        setFormComentario={setFormComentario}
        formRating={formRating}
        setFormRating={setFormRating}
        onFileChange={onFileChange}
        formPreview={formPreview}
      />
    </section>
  );
}

export default TestimoniosYFotos;
