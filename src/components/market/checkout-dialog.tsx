import { useMemo, useState } from "react";
import { Copy, FileText, MessageCircle } from "lucide-react";
import {
  downloadNotesFile,
  formatMarketText,
  whatsappHref,
  type MarketList,
} from "@/lib/market";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function CheckoutDialog({
  open,
  onOpenChange,
  market,
  skipPantry,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  market: MarketList;
  skipPantry: boolean;
}) {
  const [notice, setNotice] = useState<string | null>(null);
  const visibleCount = skipPantry
    ? market.lines.filter((l) => !l.inPantry).length
    : market.lines.length;

  const notesText = useMemo(
    () => formatMarketText(market, { skipPantry, flavor: "notes" }),
    [market, skipPantry],
  );
  const waText = useMemo(
    () => formatMarketText(market, { skipPantry, flavor: "whatsapp" }),
    [market, skipPantry],
  );

  const aisles = useMemo(
    () =>
      market.aisles
        .map((aisle) => ({
          ...aisle,
          lines: skipPantry ? aisle.lines.filter((l) => !l.inPantry) : aisle.lines,
        }))
        .filter((aisle) => aisle.lines.length > 0),
    [market, skipPantry],
  );

  function flash(msg: string) {
    setNotice(msg);
    window.setTimeout(() => setNotice(null), 2600);
  }

  async function saveNotes() {
    const payload = { title: "Lista Hoja", text: notesText };
    try {
      if (navigator.share && (!navigator.canShare || navigator.canShare(payload))) {
        await navigator.share(payload);
        flash("Lista lista para Notas u otra app.");
        return;
      }
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") return;
    }
    try {
      await navigator.clipboard.writeText(notesText);
      flash("Copiada. Pégala en Notas.");
    } catch {
      downloadNotesFile(notesText);
      flash("Archivo de lista descargado.");
    }
  }

  async function shareWhatsApp() {
    const href = whatsappHref(waText);
    if (href.length > 1800) {
      try {
        await navigator.clipboard.writeText(waText);
        window.open("https://wa.me/", "_blank", "noopener,noreferrer");
        flash("Lista copiada. Pégala en WhatsApp.");
        return;
      } catch {
        downloadNotesFile(waText);
        flash("La lista era larga. Se descargó el archivo.");
        return;
      }
    }
    const popup = window.open(href, "_blank", "noopener,noreferrer");
    if (!popup) {
      try {
        await navigator.clipboard.writeText(waText);
        flash("No se pudo abrir WhatsApp. Lista copiada.");
      } catch {
        downloadNotesFile(waText);
        flash("No se pudo abrir WhatsApp. Se descargó el archivo.");
      }
    }
  }

  async function copyList() {
    try {
      await navigator.clipboard.writeText(notesText);
      flash("Lista copiada.");
    } catch {
      downloadNotesFile(notesText);
      flash("No se pudo copiar. Se descargó el archivo.");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Caja</DialogTitle>
          <DialogDescription>
            {market.dishes.length} {market.dishes.length === 1 ? "plato" : "platos"} · {visibleCount}{" "}
            {visibleCount === 1 ? "ingrediente" : "ingredientes"}. Guarda la lista en Notas o
            mándala por WhatsApp.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 rounded-lg border border-primary/30 bg-background p-4">
          <p className="text-xs tracking-[0.18em] text-primary uppercase">Ticket</p>
          <ul className="mt-3 space-y-1 text-sm">
            {market.dishes.map((dish) => (
              <li key={dish.slug} className="flex justify-between gap-3">
                <span>
                  {dish.name}
                  {dish.qty > 1 ? ` ×${dish.qty}` : ""}
                </span>
                <span className="shrink-0 text-muted-foreground tabular-nums">{dish.servings} pers.</span>
              </li>
            ))}
          </ul>
          <div className="my-4 h-px bg-border" />
          {aisles.map((aisle) => (
            <section key={aisle.label} className="mb-3 last:mb-0">
              <h3 className="text-xs tracking-[0.16em] text-primary uppercase">{aisle.label}</h3>
              <ul className="mt-1 space-y-1 text-sm">
                {aisle.lines.map((line) => (
                  <li key={line.id} className="flex justify-between gap-3">
                    <span className={cn(line.inPantry && "text-muted-foreground")}>{line.item}</span>
                    <span className="shrink-0 text-muted-foreground tabular-nums">{line.label}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          {aisles.length === 0 ? (
            <p className="text-sm text-muted-foreground">Con lo de tu despensa no falta nada.</p>
          ) : null}
        </div>

        <div className="mt-5 grid gap-2">
          <Button onClick={() => void saveNotes()}>
            <FileText />
            Guardar en Notas
          </Button>
          <Button variant="secondary" onClick={() => void shareWhatsApp()}>
            <MessageCircle />
            Enviar por WhatsApp
          </Button>
          <Button variant="ghost" onClick={() => void copyList()}>
            <Copy />
            Copiar lista
          </Button>
        </div>
        {notice ? <p className="mt-3 text-sm text-primary">{notice}</p> : null}
      </DialogContent>
    </Dialog>
  );
}
