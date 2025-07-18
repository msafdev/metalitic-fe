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
import useProject from "@/queries/use-project.query";
import { useQuery } from "@tanstack/react-query";
import { getProjectDetail } from "@/lib/api/project-api";
import { QUERIES } from "@/lib/constants/queries";

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
  const { data, isLoading } = useQuery({
    queryFn: () => getProjectDetail(projectId),
    queryKey: [QUERIES.PROJECTS, projectId]
  });

  const totalProjectEvaluation = data?.data.pengujian.length || 0;

  const generateId = () =>
    `${projectId}-${(totalProjectEvaluation + 1).toString().padStart(3, "0")}`;

  const formik = useFormik({
    initialValues: {
      id: generateId(),
      nama: ""
    },
    enableReinitialize: true,
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
