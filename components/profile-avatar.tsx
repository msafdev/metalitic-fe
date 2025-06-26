import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";

type Props = {
  name: string;
};

export default function ProfileAvatar({ name }: Props) {
  return (
    <div className="flex items-center space-x-2 border min-w-fit rounded-full py-2 ps-2 pe-4 ">
      <Avatar className="size-8 border-2 border-slate-200">
        <AvatarFallback className="text-[10px] bg-gradient-to-br from-slate-500 to-slate-600 text-white font-semibold">
          {name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold group-hover:text-slate-700 text-sm">
          {name}
        </p>
      </div>
    </div>
  );
}
