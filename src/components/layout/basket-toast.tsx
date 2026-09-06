import { useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useExplorer } from "@/lib/store";
import { Button } from "@/components/ui/button";

export function BasketToast() {
  const toast = useExplorer((s) => s.toast);
  const clearToast = useExplorer((s) => s.clearToast);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => clearToast(), 2800);
    return () => window.clearTimeout(id);
  }, [toast, clearToast]);

  if (!toast || path === "/lista") return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <div className="pointer-events-auto flex max-w-md items-center gap-3 rounded-lg border border-primary/40 bg-card px-4 py-3 text-card-foreground shadow-lg">
        <p className="min-w-0 flex-1 text-sm">{toast.message}</p>
        <Button asChild size="sm">
          <Link to="/lista">Ver lista</Link>
        </Button>
      </div>
    </div>
  );
}
