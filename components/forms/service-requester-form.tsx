import useServiceRequesterMutation from "@/mutation/use-service-requester-mutation";
import { useFormik } from "formik";
import { Plus, UserPlus } from "lucide-react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import ErrorInputMessage from "../input/error-input-message";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ServiceRequesterList from "@/app/(dashboard)/dashboard/projects/components/service-requester-list";

const serviceRequesterSchema = z.object({
  nama: z.string({ required_error: "Required" })
});

type Props = {
  closeDialog?: () => void;
};

export default function ServiceRequesterForm({ closeDialog }: Props) {
  const { createServiceRequesterMutation } = useServiceRequesterMutation();

  const formik = useFormik({
    initialValues: {
      nama: ""
    },
    validationSchema: toFormikValidationSchema(serviceRequesterSchema),
    onSubmit: async (values, { resetForm }) => {
      createServiceRequesterMutation.mutate(values, {
        onSuccess: () => {
          resetForm();
          closeDialog?.();
        }
      });
    }
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="bg-gradient-to-br from-blue-50 to-sky-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="size-8 bg-gradient-to-br from-blue-500 to-sky-600 rounded-lg flex items-center justify-center">
              <UserPlus className="size-4 text-white" />
            </div>
            <h3 className="text-lg font-bold text-blue-900">
              Tambah Peminta Jasa Baru
            </h3>
          </div>

          <div>
            <div className="flex flex-col lg:flex-row gap-3">
              <Input
                placeholder="Masukkan nama peminta jasa (contoh: Ahmad Wijaya)"
                name="nama"
                value={formik.values.nama}
                onChange={formik.handleChange}
                className="flex-1 bg-white border-blue-200 py-3 px-4 focus:border-blue-400 focus:ring-blue-400"
              />

              <Button
                type="submit"
                disabled={
                  !formik.isValid || createServiceRequesterMutation.isPending
                }
                className="px-4 bg-gradient-to-r from-blue-600 to-sky-700 hover:from-blue-700 hover:to-sky-800 disabled:opacity-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah
              </Button>
            </div>

            {formik.touched.nama && formik.errors.nama && (
              <ErrorInputMessage>{formik.errors.nama}</ErrorInputMessage>
            )}
          </div>
        </div>
      </form>

      <ServiceRequesterList />
    </>
  );
}
