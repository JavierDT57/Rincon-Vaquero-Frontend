// src/api/adminMedia.js
import { absUrl } from "./config";


/**
 * Normaliza un AVISO agregando .imgSrc con URL absoluta
 */
export function normalizeAviso(raw = {}) {
  const img =
    raw.imgurl ??
    raw.imagen ??
    raw.image_url ??
    raw.img_url ??
    null;

  return {
    ...raw,
    imgSrc: absUrl(img),
  };
}

/**
 * Normaliza un TESTIMONIO agregando .imgSrc
 */
export function normalizeTestimonio(raw = {}) {
  const img =
    raw.imagenurl ??
    raw.imagen_url ??
    raw.img_url ??
    raw.imageUrl ??
    null;

  return {
    ...raw,
    imgSrc: absUrl(img),
  };
}
