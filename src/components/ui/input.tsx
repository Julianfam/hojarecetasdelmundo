import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-lg border border-border bg-card px-4 text-base text-foreground shadow-none transition-[border-color,box-shadow] duration-150 placeholder:text-faint outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/30",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
