import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { SelectItem } from "@/lib/types/common-type";

type Props = {
  value: string;
  items: SelectItem[];
  onSelect: (value: string) => void;
  placeholder?: string;
  noItemsFallbackText?: string;
};

export default function ComboboxGroup({
  value,
  items,
  onSelect,
  placeholder = "Select Item",
  noItemsFallbackText = "No items found"
}: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-full justify-between",
            !value && "text-muted-foreground"
          )}
        >
          {value
            ? items.find((item) => item.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder="Cari..." className="h-9" />
          <CommandList>
            <CommandEmpty>{noItemsFallbackText}</CommandEmpty>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  value={item.value}
                  key={item.value}
                  onSelect={onSelect}
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      item.value === value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
