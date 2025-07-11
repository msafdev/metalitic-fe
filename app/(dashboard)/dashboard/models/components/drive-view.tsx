"use client";

import { Button } from "@/components/ui/button";
import { getFiles } from "@/lib/api/get-files.api";
import clsx from "clsx";
import { ArrowLeft, FileX2, Folder } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useAIConfiguration } from "../context/ai-configuration-context";

export type ItemFromStorage = {
  name: string;
  path: string;
  type: "file" | "folder";
  url?: string;
  size?: number;
  extension?: string;
};

type Props = {
  onClose: () => void;
};

export default function DriveView({ onClose }: Props) {
  const { config, setConfig } = useAIConfiguration();
  const [items, setItems] = useState<ItemFromStorage[]>([]);
  const [pathStack, setPathStack] = useState<string[]>([]);

  // const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [lastSelectedIndex, setLastSelectedIndex] = useState<number | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement>(null);

  const currentPath = pathStack.join("/");

  const getData = async (path: string) => {
    const res = await getFiles(path);
    setItems(res);
  };

  // useEffect(() => {
  //   setConfig({ imageList: Array.from(selectedItems) });
  // }, [selectedItems]);

  useEffect(() => {
    getData(currentPath);
  }, [currentPath]);

  const handleDoubleClick = (item: ItemFromStorage) => {
    if (item.type === "folder") {
      setPathStack((prev) => [...prev, item.name]);
    }
  };

  const handleBack = () => {
    setPathStack((prev) => prev.slice(0, -1));
  };

  const handleClick = (
    e: React.MouseEvent,
    item: ItemFromStorage,
    index: number
  ) => {
    const isCtrl = e.metaKey || e.ctrlKey;
    const isShift = e.shiftKey;

    const newSelected = new Set(config.imageList);

    if (isShift && lastSelectedIndex !== null) {
      // Range select
      const start = Math.min(lastSelectedIndex, index);
      const end = Math.max(lastSelectedIndex, index);

      for (let i = start; i <= end; i++) {
        newSelected.add(items[i].path);
      }
    } else if (isCtrl) {
      // Toggle
      if (newSelected.has(item.path)) {
        newSelected.delete(item.path);
      } else {
        newSelected.add(item.path);
      }
      setLastSelectedIndex(index);
    } else {
      // Single select
      newSelected.clear();
      newSelected.add(item.path);
      setLastSelectedIndex(index);
    }

    setConfig({ imageList: newSelected });
  };

  const isSelected = (path: string) => config.imageList.has(path);

  return (
    <>
      <div className="pb-10 h-[600px] overflow-y-scroll">
        <div className="flex items-center justify-between p-5 pb-0">
          <div className="flex gap-4 items-center">
            {pathStack.length > 0 && (
              <Button variant="outline" size="icon" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <div className="text-muted-foreground text-sm">
              /{pathStack.join("/") || "root"}
            </div>
          </div>

          {config.imageList.size > 0 && (
            <div className="mt-4 text-sm text-muted-foreground">
              {config.imageList.size} item terpilih
            </div>
          )}
        </div>

        <div
          ref={containerRef}
          className="relative overflow-y-auto overflow-x-hidden"
        >
          {Boolean(!items.length) && (
            <div className="min-h-96 text-muted-foreground flex flex-col gap-5 items-center justify-center w-full">
              <FileX2 size={60} />
              <span>Tidak ada file di direktori ini</span>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 p-5">
            {items.map((item, index) => (
              <div
                title={item.name}
                key={item.path}
                data-selectable
                data-path={item.path}
                onClick={(e) => handleClick(e, item, index)}
                onDoubleClick={() => handleDoubleClick(item)}
                className={clsx(
                  "border rounded-md hover:bg-accent cursor-pointer flex flex-col items-center text-center selecto-target",
                  isSelected(item.path) && "ring-2 ring-primary bg-accent"
                )}
              >
                {item.type === "folder" ? (
                  <div className="size-28 grid place-content-center">
                    <Folder className="w-16 h-16 text-yellow-600 mb-2" />
                  </div>
                ) : (
                  <div className="size-28 relative rounded-t-md overflow-hidden">
                    <Image
                      src={item.url || ""}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="text-xs truncate max-w-[90px] my-2">
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-background absolute bottom-0 left-0 right-0 rounded-b-lg p-3 flex justify-between items-center px-6 border-t">
          <div className="text-muted-foreground text-sm">
            /{pathStack.join("/") || "root"}
          </div>

          <div className="text-sm text-muted-foreground">
            {config.imageList.size} item terpilih
          </div>

          <div>
            <Button size="sm" className="px-4" type="button" onClick={onClose}>
              Pilih
            </Button>
          </div>
        </div>
      </div>

      {/* <Selecto
        container={containerRef.current ?? undefined}
        selectableTargets={[".selecto-target"]}
        hitRate={10}
        selectByClick={false}
        selectFromInside={false}
        toggleContinueSelect={"ctrl"}
        dragContainer={containerRef.current ?? undefined}
        rootContainer={containerRef.current ?? undefined}
        onSelectEnd={(e) => {
          const newSelected = new Set(config.imageList);

          if (!e.inputEvent.ctrlKey && !e.inputEvent.metaKey) {
            newSelected.clear();
          }

          for (const el of e.selected) {
            const path = el.getAttribute("data-path");
            if (path) newSelected.add(path);
          }

          setConfig({ imageList: newSelected });
        }}
      /> */}
    </>
  );
}
