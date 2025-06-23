"use client";

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

const createUserSchema = z.object({
  username: z.string().min(1, "Required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(1, "Required"),
  nomorInduk: z.string().min(10, "NIK must be at least 10 characters"),
  devisi: z.string().min(3, "Required"),
  jabatan: z.string().min(3, "Required"),
  email: z.string().email().min(5, "Required"),
  noHp: z.string().min(6, "Required"),
  alamat: z.string().min(5, "Required")
});

export function CreateUserForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
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
    <div className={cn("flex flex-col gap-6 px-4", className)} {...props}>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-6 max-w-md">
          <div className="grid grid-cols-2 gap-6">
            {/* name */}
            <div className="grid gap-3">
              <Label>Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Nama Pengguna"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.name && formik.errors.name
                    ? "animate-pulse"
                    : ""
                }
              />
            </div>

            {/* username */}
            <div className="grid gap-3">
              <Label>Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Username Pengguna"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.username && formik.errors.username
                    ? "animate-pulse"
                    : ""
                }
              />
            </div>
          </div>

          {/* email */}
          <div className="grid gap-3">
            <Label>Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.email && formik.errors.email
                  ? "animate-pulse"
                  : ""
              }
            />
          </div>

          {/* nik */}
          <div className="grid gap-3">
            <Label>Nomor Induk</Label>
            <Input
              id="nomorInduk"
              name="nomorInduk"
              type="text"
              placeholder="NIK"
              value={formik.values.nomorInduk}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.nomorInduk && formik.errors.nomorInduk
                  ? "animate-pulse"
                  : ""
              }
            />
          </div>

          {/* no hp */}
          <div className="grid gap-3">
            <Label>Nomor Handphone</Label>
            <Input
              id="noHp"
              name="noHp"
              type="text"
              placeholder="081231231"
              value={formik.values.noHp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.noHp && formik.errors.noHp ? "animate-pulse" : ""
              }
            />
          </div>

          {/* Password */}
          <div className="grid gap-3">
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              required
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-xs text-red-500">{formik.errors.password}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* devisi */}
            <div className="grid gap-3">
              <Label>Divisi</Label>
              <Input
                id="devisi"
                name="devisi"
                type="text"
                placeholder="Divisi"
                value={formik.values.devisi}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.devisi && formik.errors.devisi
                    ? "animate-pulse"
                    : ""
                }
              />
            </div>

            {/* jabatan */}
            <div className="grid gap-3">
              <Label>Jabatan</Label>
              <Input
                id="jabatan"
                name="jabatan"
                type="text"
                placeholder="Jabatan"
                value={formik.values.jabatan}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.jabatan && formik.errors.jabatan
                    ? "animate-pulse"
                    : ""
                }
              />
            </div>
          </div>

          {/* alamat */}
          <div className="grid gap-3">
            <Label>Alamat</Label>
            <Textarea
              id="alamat"
              name="alamat"
              placeholder="Masukkan alamat user"
              value={formik.values.alamat}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.alamat && formik.errors.alamat
                  ? "animate-pulse"
                  : ""
              }
            />
          </div>

          <Button
            type="submit"
            disabled={registerMutation.isPending || registerMutation.isError}
            className="w-full col-span-full"
            onClick={() => {
              console.log(formik.values);
            }}
          >
            Register
          </Button>
        </div>
      </form>
    </div>
  );
}
