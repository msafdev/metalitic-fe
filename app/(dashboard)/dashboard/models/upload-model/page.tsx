"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import useAIConfigurationMutation from "@/mutation/use-ai-configuration-mutation";
import { useFormik } from "formik";
import { BrainCircuit, Save } from "lucide-react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export default function ModelsTraningPage() {
  return (
    <>
      <div>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Models</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Upload Model</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex-1 flex flex-col py-4 pt-0 gap-4">
          <div className="space-y-2 px-4">
            <h2 className="text-2xl font-semibold">
              Pengaturan Artificial Intelligence
            </h2>
          </div>
          <div className="space-y-3.5 p-4">
            <UploadModelSection />
          </div>
        </div>
      </div>
    </>
  );
}

const saveAiCompletedModelSchema = z.object({
  aiModelName: z.string({ required_error: "Required" }),
  aiModelFile: z.any({ required_error: "Required" })
});

function UploadModelSection() {
  const { saveAiCompletedModelMutation } = useAIConfigurationMutation();

  const formik = useFormik({
    initialValues: {
      aiModelName: "",
      aiModelFile: null
    },
    enableReinitialize: true,
    validationSchema: toFormikValidationSchema(saveAiCompletedModelSchema),
    onSubmit: async (values) => {
      if (!values.aiModelFile) return;

      saveAiCompletedModelMutation.mutate({
        aiModelName: values.aiModelName,
        aiModelFile: values.aiModelFile as File
      });
    }
  });

  console.log(formik.values);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <BrainCircuit className="w-5 h-5 text-white" />
          </div>
          <span>Upload Model Jadi</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-10">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Pilih Model</h4>

            <div className="flex gap-4">
              {/* Input File */}
              <Input
                id="aiModelFile"
                name="aiModelFile"
                type="file"
                className="basis-4/12"
                onChange={(e) =>
                  formik.setFieldValue(
                    "aiModelFile",
                    e.currentTarget.files?.[0] || null
                  )
                }
              />

              {/* Input Text */}
              <Input
                id="aiModelName"
                name="aiModelName"
                placeholder="Masukkan Nama File Model AI"
                value={formik.values.aiModelName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="basis-8/12"
              />
            </div>

            {/* Optional: Show error messages */}
            <div className="text-sm text-red-500 mt-1">
              {formik.touched.aiModelFile && formik.errors.aiModelFile && (
                <div>{formik.errors.aiModelFile}</div>
              )}
              {formik.touched.aiModelName && formik.errors.aiModelName && (
                <div>{formik.errors.aiModelName}</div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end pt-6 border-t border-border">
            <Button
              className="flex items-center space-x-1"
              size="lg"
              type="submit"
              disabled={saveAiCompletedModelMutation.isPending}
            >
              <Save className="w-4 h-4" />
              <span>Simpan Model</span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
