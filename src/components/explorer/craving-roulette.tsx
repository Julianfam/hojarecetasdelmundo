import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ChevronDown, Dices } from "lucide-react";
import { RECIPES } from "@/lib/recipes";
import { currentFestivals, festivalRecipes } from "@/lib/festivals";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const WHEEL = 12;
const PALETTE = [
  "var(--color-rojo)",
  "var(--color-queso)",
  "var(--color-mora)",
  "var(--color-naranja)",
  "var(--color-chile)",
  "var(--color-leaf)",
  "var(--color-wine)",
  "var(--color-primary)",
];

export function CravingRoulette() {
  const navigate = useNavigate();
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [picked, setPicked] = useState<(typeof RECIPES)[number] | null>(null);
  const [open, setOpen] = useState(false);

  const slice = 360 / WHEEL;

  const gradient = useMemo(() => {
    const stops = Array.from({ length: WHEEL }, (_, i) => {
      const c = PALETTE[i % PALETTE.length] ?? "var(--color-primary)";
      return `${c} ${i * slice}deg ${(i + 1) * slice}deg`;
    });
    return `conic-gradient(${stops.join(", ")})`;
  }, [slice]);

  function spin() {
    if (spinning || RECIPES.length === 0) return;
    const [fest] = currentFestivals();
    const themed = fest ? festivalRecipes(fest, Date.now(), 24) : [];
    const pool = themed.length >= 8 ? themed : RECIPES;
    const index = Math.floor(Math.random() * pool.length);
    const extra = 5 * 360;
    const wheelIndex = index % WHEEL;
    const target = extra + (360 - wheelIndex * slice - slice / 2);
    setPicked(null);
    setSpinning(true);
    setRotation((prev) => prev + target);
    window.setTimeout(() => {
      setPicked(pool[index] ?? RECIPES[0] ?? null);
      setSpinning(false);
    }, 2400);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) {
          setPicked(null);
          setSpinning(false);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="secondary" className="px-3 sm:px-4">
          <Dices />
          <span className="hidden sm:inline">Antojo sorpresa</span>
          <span className="sm:hidden">Antojo</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Ruleta del antojo</DialogTitle>
          <DialogDescription>
            Gira. El plato que caiga es el que cocina la noche.
          </DialogDescription>
        </DialogHeader>
        <div className="relative mx-auto mt-2 size-56">
          <ChevronDown className="absolute -top-2 left-1/2 z-10 size-6 -translate-x-1/2 text-primary" />
          <div
            className="size-full rounded-full border-4 border-foreground"
            style={{
              background: gradient,
              transform: `rotate(${rotation}deg)`,
              transition: spinning
                ? "transform 2.3s cubic-bezier(0.12, 0.8, 0.12, 1)"
                : "none",
            }}
          />
        </div>
        <div className="mt-4 min-h-16 text-center">
          {picked ? (
            <div>
              <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
                {picked.country}
              </p>
              <p className="font-display text-2xl">{picked.name}</p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              {spinning ? "El paladar decide…" : "Un giro. Un destino."}
            </p>
          )}
        </div>
        <div className="mt-2 flex gap-2">
          <Button className="flex-1" onClick={spin} disabled={spinning}>
            {spinning ? "Girando" : "Girar"}
          </Button>
          {picked ? (
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                setOpen(false);
                void navigate({ to: "/recipe/$slug", params: { slug: picked.slug } });
              }}
            >
              Abrir receta
            </Button>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
