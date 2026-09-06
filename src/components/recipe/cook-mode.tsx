import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Timer, UtensilsCrossed } from "lucide-react";
import { formatStepClock, timerSecondsForStep, type Recipe } from "@/lib/recipes";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function CookMode({
  recipe,
  open,
  onOpenChange,
}: {
  recipe: Recipe;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [step, setStep] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  const current = recipe.steps[step];
  const budget = timerSecondsForStep(current?.minutes ?? 8);

  useEffect(() => {
    if (!open) {
      setStep(0);
      setRunning(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    setSeconds(timerSecondsForStep(current?.minutes ?? 8));
    setRunning(false);
  }, [open, step, current?.minutes]);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setSeconds((s) => Math.max(0, s - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [running]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const overtime = seconds === 0 && running;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Cocinar {recipe.name}</DialogTitle>
          <DialogDescription>
            Paso {step + 1} de {recipe.steps.length} · {recipe.country}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-muted px-4 py-3">
          <div className="flex items-center gap-2 text-sm">
            <Timer className="size-4 text-primary" />
            <span className="font-display text-xl tabular-nums">
              {mm}:{ss}
            </span>
            <span className="text-xs text-muted-foreground">
              de {formatStepClock(current?.minutes ?? 8)}
            </span>
          </div>
          <Button variant="outline" size="sm" onClick={() => setRunning((r) => !r)}>
            {running ? "Pausa" : seconds === budget ? "Empezar paso" : "Seguir"}
          </Button>
        </div>
        {overtime ? (
          <p className="mt-2 text-xs text-primary">Tiempo del paso cumplido. Prueba y sigue cuando esté.</p>
        ) : null}
        <p className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground">
          <UtensilsCrossed className="size-4" />
          {current?.tool}
        </p>
        <p className="mt-3 font-display text-2xl leading-snug tracking-tight">{current?.text}</p>
        <div className="mt-6 flex gap-2">
          <Button
            variant="outline"
            className="flex-1"
            disabled={step === 0}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
          >
            <ChevronLeft />
            Anterior
          </Button>
          <Button
            className="flex-1"
            disabled={step === recipe.steps.length - 1}
            onClick={() => setStep((s) => Math.min(recipe.steps.length - 1, s + 1))}
          >
            Siguiente
            <ChevronRight />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}