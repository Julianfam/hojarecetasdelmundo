export type SwatchId = "gold" | "chile" | "leaf" | "wine" | "rojo" | "mora" | "naranja" | "queso";

export const SWATCH_CHIP: Record<SwatchId, string> = {
  gold: "border-primary/45 bg-primary/15 text-stamp",
  chile: "border-chile/45 bg-chile/12 text-chile",
  leaf: "border-leaf/45 bg-leaf/12 text-leaf",
  wine: "border-wine/45 bg-wine/12 text-wine",
  rojo: "border-rojo/45 bg-rojo/12 text-rojo",
  mora: "border-mora/45 bg-mora/12 text-mora",
  naranja: "border-naranja/45 bg-naranja/12 text-naranja",
  queso: "border-queso/50 bg-queso/20 text-stamp",
};

export const SWATCH_ON: Record<SwatchId, string> = {
  gold: "border-primary bg-primary text-primary-foreground",
  chile: "border-chile bg-chile text-chile-foreground",
  leaf: "border-leaf bg-leaf text-leaf-foreground",
  wine: "border-wine bg-wine text-wine-foreground",
  rojo: "border-rojo bg-rojo text-rojo-foreground",
  mora: "border-mora bg-mora text-mora-foreground",
  naranja: "border-naranja bg-naranja text-naranja-foreground",
  queso: "border-queso bg-queso text-queso-foreground",
};

export const SWATCH_DOT: Record<SwatchId, string> = {
  gold: "bg-primary",
  chile: "bg-chile",
  leaf: "bg-leaf",
  wine: "bg-wine",
  rojo: "bg-rojo",
  mora: "bg-mora",
  naranja: "bg-naranja",
  queso: "bg-queso",
};
