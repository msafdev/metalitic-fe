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
import { BrainCircuit, Save } from "lucide-react";

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

function UploadModelSection() {
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
        <div>
          <h4 className="font-semibold mb-2">Pilih Model</h4>

          <div>
            <div className="flex gap-4">
              <Input
                placeholder="Upload Model AI"
                type="file"
                className="basis-4/12"
              />
              <Input placeholder="Masukkan Nama File Model AI" />
            </div>
          </div>
        </div>

        <div>
          {/* Action Buttons */}
          <div className="flex justify-end pt-6 border-t border-slate-200 dark:border-slate-700">
            <Button className="flex items-center space-x-1" size="lg">
              <Save className="w-4 h-4" />
              <span>Simpan Model</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
