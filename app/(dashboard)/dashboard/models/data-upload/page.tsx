"use client";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  ArrowRight,
  Brain,
  FileImage,
  Folder,
  ImageOff,
  Trash2
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ModelsDataUploadPage() {
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
                  <BreadcrumbPage>Upload</BreadcrumbPage>
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
            <UploadSection />
          </div>
        </div>
      </div>
    </>
  );
}

export function UploadSection() {
  const [selectedModel, setSelectedModel] = useState("");

  const [uploadedFiles, setUploadedFiles] = useState<
    (File & { preview: string })[]
  >([]);

  const removeFile = (index: number) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
  };

  return (
    <>
      {/* AI Model Selection Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span>Model AI Configuration</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                Pilih Model AI
              </label>
              <Select value={selectedModel} onValueChange={setSelectedModel}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Model AI" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fasa">FASA</SelectItem>
                  <SelectItem value="crack">CRACK</SelectItem>
                  <SelectItem value="degradasi">DEGRADASI</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {selectedModel && (
              // <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              //   <p className="text-sm text-blue-800 dark:text-blue-200">
              //     Model terpilih:{" "}
              //     <span className="font-semibold">{selectedModel}</span>
              //   </p>
              // </div>
              <div className="p-4 bg-primary rounded-lg border border-primary">
                <p className="text-sm">
                  Model terpilih:{" "}
                  <span className="font-semibold">{selectedModel}</span>
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Upload Data Card */}
      <Card className="">
        <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <CardTitle className="flex items-center justify-between mb-2">
              <span>Upload Data Baru</span>
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              Pilih data baru dari database
            </p>
          </div>

          <Badge variant="primary-outline">10/10 teranotasi</Badge>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Upload Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              asChild
              variant="outline"
              className="h-24 border border-dashed border-muted-foreground hover:border-primary transition-colors bg-transparent hover:bg-primary/10 cursor-pointer"
            >
              <Label htmlFor="fileUpload">
                <div className="text-center">
                  <FileImage className="w-8 h-8 mx-auto mb-1 text-muted-foreground" />
                  <span className="text-sm font-medium">Pilih File</span>
                  <Input
                    accept="image/*"
                    id="fileUpload"
                    className="hidden"
                    type="file"
                    multiple
                    onChange={(e) => {
                      const files = e.target.files;

                      if (files && files.length) {
                        const arrayFiles = Array.from(files);

                        const arrayFilesWithPreview: (File & {
                          preview: string;
                        })[] = arrayFiles.map((file) =>
                          Object.assign(file, {
                            preview: URL.createObjectURL(file)
                          })
                        );

                        setUploadedFiles((prev) => [
                          ...prev,
                          ...arrayFilesWithPreview
                        ]);
                      }
                    }}
                  />
                </div>
              </Label>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-24 border border-dashed border-muted-foreground hover:border-primary transition-colors bg-transparent hover:bg-primary/10 cursor-pointer"
            >
              <Label htmlFor="folderUpload">
                <div className="text-center">
                  <Folder className="w-8 h-8 mx-auto mb-1 text-muted-foreground" />
                  <span className="text-sm font-medium">Pilih Folder</span>
                  <Input
                    accept="image/*"
                    id="folderUpload"
                    className="hidden"
                    type="file"
                    multiple
                    onChange={(e) => {
                      const files = e.target.files;

                      if (files && files.length) {
                        const arrayFiles = Array.from(files);

                        const arrayFilesWithPreview: (File & {
                          preview: string;
                        })[] = arrayFiles.map((file) =>
                          Object.assign(file, {
                            preview: URL.createObjectURL(file)
                          })
                        );

                        setUploadedFiles((prev) => [
                          ...prev,
                          ...arrayFilesWithPreview
                        ]);
                      }
                    }}
                  />
                </div>
              </Label>
            </Button>
          </div>

          {/* File Grid */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Gambar dipilih ({uploadedFiles.length})
            </h3>

            {!uploadedFiles.length && (
              <div className="grid place-content-center gap-4 text-center text-muted-foreground text-sm min-h-60">
                <ImageOff className="w-8 h-8 mx-auto text-muted-foreground" />
                <div>Belum ada gambar dipilih</div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {uploadedFiles.map((file, index) => (
                <div key={file.name + index} className="relative group">
                  <div className="aspect-[4/3] bg-muted-foreground/20 rounded-lg overflow-hidden relative">
                    <Image
                      src={file.preview || "/placeholder.svg"}
                      alt={file.name}
                      className="w-full h-full object-cover"
                      fill
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeFile(index)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 truncate">
                    {file.name}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between pt-6 border-t border-slate-200 dark:border-slate-700">
            <Button className="flex items-center space-x-2 w-full" size="lg">
              <span>Simpan dan Lanjut</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
