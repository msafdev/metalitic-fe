import { cookies } from "next/headers";
import { ProjectResponse } from "../types/project-type";

export async function getProjects(): Promise<ProjectResponse> {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  const role = cookieStore.get("role")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/manager/projects`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}; role=${role}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  const data: ProjectResponse = await res.json();
  return data;
}
