"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { cn } from "@/lib/utils";
import useAuthMutation from "@/mutation/use-auth-mutation";
import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Textarea } from "../ui/textarea";
import useModal from "@/hooks/use-modal";
import { Save } from "lucide-react";
import { Separator } from "../ui/separator";
import ErrorInputMessage from "../input/error-input-message";

const createUserSchema = z.object({
  username: z.string({ required_error: "Required" }).min(3, "Min. 3 karakter"),
  password: z
    .string({ required_error: "Required" })
    .min(6, "Min. 6 karakter"),
  name: z.string({ required_error: "Required" }).min(3, "Min. 3 karakter"),
  nomorInduk: z
    .string({ required_error: "Required" })
    .min(10, "Min. 10 karakter"),
  devisi: z.string({ required_error: "Required" }).min(3, "Min. 3 karakter"),
  jabatan: z.string({ required_error: "Required" }).min(3, "Min. 3 karakter"),
  email: z
    .string({ required_error: "Required" })
    .email()
    .min(5, "Masukkan email yang valid"),
  noHp: z.string({ required_error: "Required" }).min(6, "Min. 6 karakter"),
  alamat: z.string({ required_error: "Required" }).min(5, "Min. 5 karakter")
});

export default function CreateUserForm() {
  const { registerMutation } = useAuthMutation();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      name: "",
      email: "",
      noHp: "",
      nomorInduk: "",
      devisi: "",
      jabatan: "",
      alamat: ""
    },
    validationSchema: toFormikValidationSchema(createUserSchema),
    onSubmit: async (values, { resetForm }) => {
      registerMutation.mutate(
        { body: values },
        {
          onSuccess: () => resetForm(),
          onError: () => console.error("Something wrong happened")
        }
      );
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 relative">
            <Label htmlFor="name">Nama User</Label>
            <Input
              placeholder="Nama User"
              id="name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
              <ErrorInputMessage className="text-red-600  bg-background pointer-events-none absolute text-xs px-1 -bottom-2 right-2">
                {formik.errors.name}
              </ErrorInputMessage>
            )}
          </div>
          <div className="space-y-2 relative">
            <Label htmlFor="username">Username</Label>
            <Input
              placeholder="Nama User"
              id="username"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username && (
              <ErrorInputMessage className="text-red-600  bg-background pointer-events-none absolute text-xs px-1 -bottom-2 right-2">
                {formik.errors.username}
              </ErrorInputMessage>
            )}
          </div>
        </div>

        <div className="space-y-2 relative">
          <Label htmlFor="password">Password</Label>
          <PasswordInput
            placeholder="********"
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <ErrorInputMessage className="text-red-600  bg-background pointer-events-none absolute text-xs px-1 -bottom-2 left-2">
              {formik.errors.password}
            </ErrorInputMessage>
          )}
        </div>

        <div className="space-y-2 relative">
          <Label htmlFor="nomorInduk">NIK</Label>
          <Input
            placeholder="Nomor Induk"
            id="nomorInduk"
            name="nomorInduk"
            onChange={formik.handleChange}
            value={formik.values.nomorInduk}
          />
          {formik.touched.nomorInduk && formik.errors.nomorInduk && (
            <ErrorInputMessage className="text-red-600  bg-background pointer-events-none absolute text-xs px-1 -bottom-2 right-2">
              {formik.errors.nomorInduk}
            </ErrorInputMessage>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 relative">
            <Label htmlFor="devisi">Divisi</Label>
            <Input
              placeholder="Divisi"
              id="devisi"
              name="devisi"
              onChange={formik.handleChange}
              value={formik.values.devisi}
            />
            {formik.touched.devisi && formik.errors.devisi && (
              <ErrorInputMessage className="text-red-600  bg-background pointer-events-none absolute text-xs px-1 -bottom-2 right-2">
                {formik.errors.devisi}
              </ErrorInputMessage>
            )}
          </div>

          <div className="space-y-2 relative">
            <Label htmlFor="jabatan">Jabatan</Label>
            <Input
              placeholder="Jabatan"
              id="jabatan"
              name="jabatan"
              onChange={formik.handleChange}
              value={formik.values.jabatan}
            />
            {formik.touched.jabatan && formik.errors.jabatan && (
              <ErrorInputMessage className="text-red-600  bg-background pointer-events-none absolute text-xs px-1 -bottom-2 right-2">
                {formik.errors.jabatan}
              </ErrorInputMessage>
            )}
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 relative">
            <Label htmlFor="email">Email</Label>
            <Input
              placeholder="m@example.com"
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <ErrorInputMessage className="text-red-600  bg-background pointer-events-none absolute text-xs px-1 -bottom-2 right-2">
                {formik.errors.email}
              </ErrorInputMessage>
            )}
          </div>

          <div className="space-y-2 relative">
            <Label htmlFor="noHp">No. HP</Label>
            <Input
              placeholder="0812312312"
              id="noHp"
              name="noHp"
              onChange={formik.handleChange}
              value={formik.values.noHp}
            />
            {formik.touched.noHp && formik.errors.noHp && (
              <ErrorInputMessage className="text-red-600  bg-background pointer-events-none absolute text-xs px-1 -bottom-2 right-2">
                {formik.errors.noHp}
              </ErrorInputMessage>
            )}
          </div>
        </div>

        <div className="space-y-2 relative">
          <Label htmlFor="alamat">Alamat</Label>
          <Textarea
            placeholder="Alamat pengguna"
            id="alamat"
            name="alamat"
            onChange={formik.handleChange}
            value={formik.values.alamat}
          />
          {formik.touched.alamat && formik.errors.alamat && (
            <ErrorInputMessage className="text-red-600  bg-background pointer-events-none absolute text-xs px-1 -bottom-2 left-2">
              {formik.errors.alamat}
            </ErrorInputMessage>
          )}
        </div>
      </div>

      <div className="mt-6 text-end">
        <Button type="submit">
          <Save />
          Simpan user
        </Button>
      </div>
    </form>
  );
}
