import { createRouter, Link } from "@tanstack/react-router";
import { Leaf } from "lucide-react";
import { AppErrorComponent } from "@/lib/error-component";
import { routeTree } from "./routeTree.gen";

function DefaultMissing() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-background px-6 text-center text-foreground">
      <Leaf className="size-8 text-primary" aria-hidden="true" />
      <h1 className="font-display text-3xl">Esa página se extravió</h1>
      <p className="max-w-md text-sm text-muted-foreground">El atlas sigue abierto.</p>
      <Link
        to="/"
        className="mt-4 inline-flex h-11 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
      >
        Volver a Hoja
      </Link>
    </main>
  );
}

export function getRouter() {
  return createRouter({
    routeTree,
    defaultErrorComponent: AppErrorComponent,
    defaultNotFoundComponent: DefaultMissing,
  });
}
