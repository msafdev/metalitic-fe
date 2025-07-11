"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Folder, FileText } from "lucide-react";
import { getFiles } from "@/lib/api/get-files.api";

type FileItem = {
  name: string;
  path: string;
  type: "file" | "folder";
  isDirectory: boolean;
  url?: string;
  size?: number;
  extension?: string;
  createdAt?: string;
  modifiedAt?: string;
  children?: FileItem[];
};

type Props = {
  onSelect: (file: FileItem) => void;
};

export default function FilePickerDialog({ onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState<FileItem[]>([]);

  useEffect(() => {
    const getData = async () => {
      const res = await getFiles("awg");
      console.log(res);
      setFiles(res);
    };

    getData();
  }, []);

  const renderItems = (items: FileItem[], depth = 0) =>
    items.map((item) => (
      <div key={item.path} className="pl-2">
        {item.type === "folder" ? (
          <details className="mb-1">
            <summary className="flex items-center gap-2 cursor-pointer">
              <Folder className="w-4 h-4 text-yellow-600" />
              <span>{item.name}</span>
            </summary>
            <div className="ml-4">
              {item.children && renderItems(item.children, depth + 1)}
            </div>
          </details>
        ) : (
          <div
            className="flex items-center gap-2 p-1 hover:bg-accent cursor-pointer rounded"
            onClick={() => {
              onSelect(item);
              setOpen(false);
            }}
          >
            <FileText className="w-4 h-4 text-blue-600" />
            <span className="text-sm">{item.name}</span>
          </div>
        )}
      </div>
    ));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Pilih File</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto w-[500px]">
        <DialogHeader>
          <DialogTitle>Pilih File dari Server</DialogTitle>
        </DialogHeader>
        <div className="mt-2">{renderItems(files)}</div>
      </DialogContent>
    </Dialog>
  );
}
