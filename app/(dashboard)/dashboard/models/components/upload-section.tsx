"use client";

import { Badge } from "@/components/ui/badge";
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
import { AiModelClasification } from "@/lib/types/common-type";
import {
  ArrowRight,
  Brain,
  ChevronLeft,
  FileImage,
  Folder,
  ImageOff,
  Loader2,
  Trash2,
  X
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ActiveStep } from "./stepper-navigation";
import { useTab } from "../context/tab-context";
import useAIConfigurationMutation from "@/mutation/use-ai-configuration-mutation";
import { useAIConfiguration } from "../context/ai-configuration-context";
import useModal from "@/hooks/use-modal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import DriveView from "./drive-view";
import { getAssetImage } from "@/lib/utils";

type Props = {
  aiModelClasification: AiModelClasification;
};

export function UploadSection({ aiModelClasification }: Props) {
  const { setActiveTab } = useTab();
  const { getAiRecommendationFromSampleMutation } =
    useAIConfigurationMutation();
  const { config, setConfig } = useAIConfiguration();
  const {
    isOpen: isOpenStorageFile,
    setIsOpen: setIsOpenStorageFile,
    openModal: openModalStorageFile,
    closeModal: closeModalStorageFile
  } = useModal();

  // const [uploadedFiles, setUploadedFiles] = useState<Set<string>>(
  //   config.imageList
  // );

  const removeFile = (index: number) => {
    const arrayFiles = Array.from(config.imageList);
    arrayFiles.splice(index, 1); // hapus berdasarkan index
    setConfig({
      imageList: new Set(arrayFiles)
    }); // konversi kembali ke Set
  };

  const handleNext = () => {
    getAiRecommendationFromSampleMutation.mutate(
      {
        imageList: Array.from(config.imageList),
        type: aiModelClasification
      },
      {
        onSuccess: (data) => {
          setConfig({
            imageList: config.imageList,
            aiRecommendationResult: data.data.aiRecommendationResult.map(
              (item) => ({
                ...item,
                useRecommendation: true
              })
            ),
            useOlderDatasetImage: true,
            aiFileModelName: "",
            type: aiModelClasification
          });

          setActiveTab("data-annotation");
        }
      }
    );
  };

  return (
    <>
      {/* Upload Data Card */}
      <Card className="">
        <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <CardTitle className="text-lg flex items-center justify-between">
              <span>Upload Data Baru</span>
            </CardTitle>
            <p className="text-muted-foreground text-sm">
              Pilih data baru dari database
            </p>
          </div>

          {/* <Badge variant="primary-outline">
            0/{uploadedFiles.length} teranotasi
          </Badge> */}
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Upload Buttons */}
          <div className="grid grid-cols-1 gap-4">
            <Button
              onClick={openModalStorageFile}
              asChild
              variant="outline"
              className="h-24 border border-dashed border-muted-foreground hover:border-primary transition-colors bg-transparent hover:bg-primary/10 cursor-pointer"
            >
              <Label htmlFor="fileUpload">
                <div className="text-center">
                  <FileImage className="w-8 h-8 mx-auto mb-1 text-muted-foreground" />
                  <span className="text-sm font-medium">Pilih File</span>
                  {/* <Input
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
                  /> */}
                </div>
              </Label>
            </Button>

            <Button
              asChild
              variant="outline"
              className="h-24 border border-dashed border-muted-foreground hover:border-primary transition-colors bg-transparent hover:bg-primary/10 cursor-pointer"
            >
              {/* <Label htmlFor="folderUpload">
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
              </Label> */}
            </Button>
          </div>

          {/* File Grid */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Gambar dipilih ({config.imageList.size})
            </h3>

            {!config.imageList.size && (
              <div className="grid place-content-center gap-4 text-center text-muted-foreground text-sm min-h-60">
                <ImageOff className="w-8 h-8 mx-auto text-muted-foreground" />
                <div>Belum ada gambar dipilih</div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Array.from(config.imageList).map((file, index) => (
                <div key={file + index} className="relative group">
                  <div className="aspect-[4/3] bg-muted-foreground/20 rounded-lg overflow-hidden relative">
                    <Image
                      src={getAssetImage(file) || "/placeholder.svg"}
                      alt={file}
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
                    {file}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end pt-6 border-t border-slate-200 dark:border-slate-700">
            <Button
              className="flex items-center space-x-1"
              size="lg"
              onClick={handleNext}
              disabled={
                getAiRecommendationFromSampleMutation.isPending ||
                !config.imageList.size
              }
            >
              {getAiRecommendationFromSampleMutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              <span>Simpan dan Lanjut</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isOpenStorageFile} onOpenChange={setIsOpenStorageFile}>
        <DialogTrigger asChild>
          <Button variant="outline">Pilih File</Button>
        </DialogTrigger>

        <DialogContent className="max-h-[80vh] overflow-y-auto w-[900px] max-w-full">
          <DialogHeader>
            <DialogTitle>Pilih File dari Server</DialogTitle>
          </DialogHeader>
          <DriveView onClose={closeModalStorageFile} />
        </DialogContent>
      </Dialog>
    </>
  );
}
