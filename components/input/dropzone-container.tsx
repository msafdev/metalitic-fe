import React from "react";

export default function DropzoneContainer({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative dropzone bg-transparent border border-dashed rounded-lg p-5 hover:bg-primary/10 hover:border-primary w-full cursor-pointer h-[230px] grid place-content-center">
      {children}
    </div>
  );
}
