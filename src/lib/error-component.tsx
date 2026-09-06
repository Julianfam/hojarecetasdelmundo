import type { ErrorComponentProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-background px-6 text-center text-foreground">
      <Leaf className="size-8 text-primary" aria-hidden="true" />
      <h1 className="font-display text-3xl">Se nos fue el fuego</h1>
      <p className="max-w-md text-sm break-words text-muted-foreground">
        {error.message || "La receta no cargó. Vuelve al atlas e inténtalo de nuevo."}
      </p>
      <Link
        to="/"
        className="mt-4 inline-flex h-11 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
      >
        Volver a Hoja
      </Link>
    </main>
  );
}
