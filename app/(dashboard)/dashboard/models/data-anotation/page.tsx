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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import {
  ArrowRight,
  Brain,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  User
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ModelsDataAnotationPage() {
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
            <DataAnotationSection />
          </div>
        </div>
      </div>
    </>
  );
}

function DataAnotationSection() {
  const [currentImage, setCurrentImage] = useState(1);
  const [useRecommendations, setUseRecommendations] = useState(true);
  const [selectedClass, setSelectedClass] = useState("");
  const [recommendations] = useState<any[]>([
    {
      id: "1",
      label: "Austenite",
      confidence: 95.3,
      model: "Model_AI_FASA_12",
      annotator: "Samuel Farley",
      timestamp: "2024-01-15",
      isSelected: true
    },
    {
      id: "2",
      label: "Ferrite",
      confidence: 87.2,
      model: "Model_AI_FASA_12",
      annotator: "AI System",
      timestamp: "2024-01-15",
      isSelected: false
    },
    {
      id: "3",
      label: "Pearlite",
      confidence: 72.8,
      model: "Model_AI_FASA_12",
      annotator: "AI System",
      timestamp: "2024-01-15",
      isSelected: false
    }
  ]);

  const totalImages = 10;
  const annotatedImages = 1;
  const progress = (annotatedImages / totalImages) * 100;

  const nextImage = () => {
    if (currentImage < totalImages) {
      setCurrentImage(currentImage + 1);
    }
  };

  const prevImage = () => {
    if (currentImage > 1) {
      setCurrentImage(currentImage - 1);
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="md:basis-8/12">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-3">
                <Eye className="w-6 h-6 text-primary" />
                <span>Anotasi Gambar</span>
              </CardTitle>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevImage}
                  disabled={currentImage === 1}
                  className="w-8 h-8 p-0 bg-transparent"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Badge variant="secondary" className="px-3 py-1">
                  {currentImage}/{totalImages}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextImage}
                  disabled={currentImage === totalImages}
                  className="w-8 h-8 p-0 bg-transparent"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Image Display */}
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-b from-blue-200 to-green-300 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-600 shadow-lg">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="Landscape for annotation"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-lg text-sm backdrop-blur-sm">
                filename.png
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex justify-center space-x-4">
              <div>
                <Badge variant="primary-outline">
                  {annotatedImages}/{totalImages} sudah teranotasi
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Sidebar - Recommendations & Validation */}
        <div className="md:basis-4/12 space-y-4">
          {/* AI Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg">Rekomendasi</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold">Austenite</span>

                  <div className="space-x-2">
                    <Badge variant="primary-outline" className="">
                      AI
                    </Badge>
                    <Badge variant="default">98%</Badge>
                  </div>
                </div>

                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Brain className="w-4 h-4" />
                    <span>Model_AI_FASA_12</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Samuel Farley</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>2024-01-15</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Validation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-600" />
                <span>Validasi</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Pakai Rekomendasi
                </label>
                <Switch
                  checked={useRecommendations}
                  onCheckedChange={setUseRecommendations}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <label className="text-sm font-medium">Pilih Kelas FASA</label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kelas..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="austenite">Austenite</SelectItem>
                    <SelectItem value="ferrite">Ferrite</SelectItem>
                    <SelectItem value="pearlite">Pearlite</SelectItem>
                    <SelectItem value="martensite">Martensite</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">Update</Button>
            </CardContent>
          </Card>
        </div>
      </div>
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
          <Link href={`/dashboard/models/dataset`}>
            <span>Simpan dan Lanjut</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </>
  );
}
