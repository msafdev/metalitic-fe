import React from "react";

export default function ErrorInputMessage({
  children
}: {
  children: React.ReactNode;
}) {
  return <div className="text-sm mt-1 text-red-500">{children}</div>;
}
