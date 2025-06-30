import { Badge } from "@/components/ui/badge";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ArrowRight, ChevronLeft, Database } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ModelsDatasetPage() {
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
                  <BreadcrumbPage>Dataset</BreadcrumbPage>
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
            <DatasetSection />
          </div>
        </div>
      </div>
    </>
  );
}

function DatasetSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <Database className="w-5 h-5 text-white" />
          </div>
          <span>Dataset Keseluruhan</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-10">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h4 className="font-semibold">Dataset Gambar Baru</h4>
            <Badge variant="primary-outline">10/10 Sudah Teranotasi</Badge>
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <div
                key={item}
                className="aspect-[4/3] bg-muted-foreground/20 rounded-lg overflow-hidden relative"
              >
                <Image
                  src={"/placeholder.svg"}
                  alt={"Placeholder"}
                  className="w-full h-full object-cover"
                  fill
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h4 className="font-semibold">Dataset Gambar Lama</h4>
          </div>

          <div className="mt-4">
            <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-green-600 has-[[aria-checked=true]]:bg-green-50 dark:has-[[aria-checked=true]]:border-green-900 dark:has-[[aria-checked=true]]:bg-green-950">
              <Checkbox
                id="toggle-2"
                defaultChecked
                className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
              />
              <div className="grid gap-1.5 font-normal">
                <p className="text-sm leading-none font-medium">
                  Gunakan data gambar lama?
                </p>
                <p className="text-muted-foreground text-sm">
                  Centang opsi ini untuk menggunakan data gambar lama
                </p>
              </div>
            </Label>
          </div>
        </div>

        <div>
          {/* Action Buttons */}
          <div className="flex justify-between pt-6 border-t border-slate-200 dark:border-slate-700">
            <Button
              variant="outline"
              className="flex items-center space-x-1"
              size="lg"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Kembali</span>
            </Button>

            <Button className="flex items-center space-x-1" size="lg" asChild>
              <Link href={`/dashboard/models/training`}>
                <span>Simpan dan Lanjut</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
