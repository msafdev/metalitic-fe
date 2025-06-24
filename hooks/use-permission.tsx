"use client";

import { Role } from "@/lib/types/auth-type";
import { getCookie } from "cookies-next";

export default function usePermission() {
  const role = getCookie("role")?.toLocaleLowerCase() as Role;

  const isSuperadmin = () => role === "superadmin";
  const isSupervisor = () => role === "supervisor";
  const isUser = () => role === "user";

  return {
    isSuperadmin,
    isSupervisor,
    isUser,
    role
  };
}
