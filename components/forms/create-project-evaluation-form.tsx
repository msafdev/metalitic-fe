"use client";

import useProjectEvaluationMutation from "@/mutation/use-project-evaluation-mutation";
import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import ErrorInputMessage from "../input/error-input-message";
import { Button } from "../ui/button";
import { Save } from "lucide-react";

type Props = {
  projectId: string;
  closeModal?: () => void;
};

const projectEvaluationSchema = z.object({
  id: z.string({ required_error: "ID Pengujian harus diisi" }),
  nama: z.string({ required_error: "Nama Pengujian harus diisi" })
});

export default function CreateProjectEvaluationForm({
  projectId,
  closeModal
}: Props) {
  const { createProjectEvaluationMutation } = useProjectEvaluationMutation();

  const formik = useFormik({
    initialValues: {
      id: "",
      nama: ""
    },
    validationSchema: toFormikValidationSchema(projectEvaluationSchema),
    onSubmit: async (values) => {
      createProjectEvaluationMutation.mutate(
        {
          ...values,
          projectId
        },
        {
          onSuccess: () => closeModal?.()
        }
      );
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} noValidate>
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="id">ID Pengujian</Label>
          <Input
            placeholder="ID Pengujian"
            id="id"
            name="id"
            onChange={formik.handleChange}
            value={formik.values.id}
          />
          {formik.touched.id && formik.errors.id && (
            <ErrorInputMessage>{formik.errors.id}</ErrorInputMessage>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="nama">Nama</Label>
          <Input
            placeholder="Nama Pengujian"
            id="nama"
            name="nama"
            onChange={formik.handleChange}
            value={formik.values.nama}
          />
          {formik.touched.nama && formik.errors.nama && (
            <ErrorInputMessage>{formik.errors.nama}</ErrorInputMessage>
          )}
        </div>
      </div>

      <div className="text-end mt-6">
        <Button type="submit">
          <Save />
          Simpan
        </Button>
      </div>
    </form>
  );
}
