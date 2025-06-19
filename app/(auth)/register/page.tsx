import { RegisterForm } from "@/components/forms/register-form";
import Image from "next/image";

export default function Page() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="/" className="relative aspect-auto w-32 h-4 self-center">
          <Image
            src={"/logo.png"}
            alt="Metalytic's Logo"
            fill
            className="object-cover"
          />
        </a>
        <RegisterForm />
      </div>
    </div>
  );
}
