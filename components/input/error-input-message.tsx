import { cn } from "@/lib/utils";
import React from "react";

export default function ErrorInputMessage({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("text-sm mt-1 text-red-500", className)}>{children}</div>
  );
}
