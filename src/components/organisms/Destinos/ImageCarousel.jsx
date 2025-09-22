// src/components/organisms/carousel-v2/ImageCarousel.jsx
import { useState } from "react";

export default function ImageCarousel({ images=[] }) {
  const [i, setI] = useState(0);
  const prev = ()=> setI(p => (p-1+images.length)%images.length);
  const next = ()=> setI(p => (p+1)%images.length);

  if (!images.length) return null;

  return (
    <div className="w-full">
      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-black/5">
        <img src={images[i]} alt={`Imagen ${i+1}`} className="w-full h-full object-cover transition-opacity duration-500"/>
        <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2" onClick={prev}>←</button>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2" onClick={next}>→</button>
      </div>
      <div className="flex gap-4 mt-6 justify-center">
        {images.map((img, idx)=>(
          <button key={idx} onClick={()=>setI(idx)}
            className={`relative h-20 w-20 rounded-lg overflow-hidden ${idx===i?"ring-2 ring-primary ring-offset-2":""}`}>
            <img src={img} alt={`Miniatura ${idx+1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, idx)=>(
          <button key={idx} onClick={()=>setI(idx)}
            className={`w-2 h-2 rounded-full ${idx===i?"bg-primary w-8":"bg-muted-foreground/30"}`}/>
        ))}
      </div>
    </div>
  );
}
