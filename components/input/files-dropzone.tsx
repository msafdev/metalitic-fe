import React, { useCallback, useState } from "react";
import { Accept, useDropzone } from "react-dropzone";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Video from "yet-another-react-lightbox/plugins/video";
import { Slide } from "yet-another-react-lightbox";
import Image from "next/image";
import {
  FileMinus,
  FileText,
  FileUp,
  FileVideo,
  ImageUp,
  XIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ALLOWED_IMAGE_FORMATS = [".png", ".jpeg", ".jpg", ".webp"];

type Props = {
  files: (File & { preview: string })[];
  setFiles: React.Dispatch<
    React.SetStateAction<(File & { preview: string })[]>
  >;
  acceptFile?: Accept;
  messageHelper?: string;
  multiple?: boolean;
};

export default function FilesDropzone({
  files,
  setFiles,
  acceptFile = {
    "image/*": ALLOWED_IMAGE_FORMATS
  },
  messageHelper = "Only *.png, *.jpg, *.jpeg and *.webp files will be accepted",
  multiple = false
}: Props) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple,
    accept: acceptFile
    // maxSize: 5000000,
    // maxFiles: 5
  });

  const fileRejectionItems = fileRejections.map(({ file, errors }, index) => {
    const previewFileBlob = URL.createObjectURL(file);

    return (
      <div
        key={previewFileBlob}
        className="flex flex-col sm:flex-row gap-3 sm:items-center bg-red-300 text-red-700 p-2 rounded"
      >
        <Image
          src={previewFileBlob}
          alt={`attachment ${index + 1}`}
          width={50}
          height={50}
          className="object-cover rounded overflow-hidden bg-secondary cursor-pointer border border-secondary"
          onClick={() => setIsLightboxOpen(true)}
          tabIndex={0}
          style={{ objectPosition: "top" }}
        />

        <div>
          {/* <div className="fw-bold">{file.name}</div> */}
          {/* <div>{file.size} bytes</div> */}
          {errors.map((e) => (
            <div className="fw-bold" key={e.code}>
              - {e.message}
            </div>
          ))}
        </div>
      </div>
    );
  });

  const getOnlyImageFiles = () => {
    return files.filter((file) => file.type.includes("image"));
  };

  const getOnlyPdfFiles = () => {
    return files.filter((file) => file.type.includes("application/pdf"));
  };

  const getOnlyVideoFiles = () => {
    return files.filter((file) => file.type.includes("video"));
  };

  const getOtherFiles = () => {
    return files.filter(
      (file) =>
        !file.type.includes("image") &&
        !file.type.includes("application/pdf") &&
        !file.type.includes("video")
    );
  };

  const imageSlides: Slide[] = getOnlyImageFiles().map((attachment) => {
    const item: Slide = {
      src: attachment.preview,
      type: "image"
    };

    return item;
  });

  const videoSlides: Slide[] = getOnlyVideoFiles().map((attachment) => {
    const item: Slide = {
      sources: [
        {
          src: attachment.preview,
          type: "video/mp4"
        }
      ],
      type: "video"
    };

    return item;
  });

  const lightboxSlides = [...imageSlides, ...videoSlides];

  return (
    <div className="w-full max-h-[800px] overflow-auto">
      <div>
        <div>
          <div
            {...getRootProps({
              className:
                "dropzone bg-transparent border border-dashed rounded-lg p-5 hover:bg-primary/10 hover:border-primary w-full cursor-pointer"
            })}
          >
            <input {...getInputProps()} />

            {!files.length ? (
              <div className="flex flex-col justify-center items-center gap-5">
                <ImageUp className="size-14" />
                <div className="text-center">
                  <p className="font-semibold mb-2">
                    Drag your file(s) or{" "}
                    <span className="text-primary">browse</span>
                  </p>
                  <em className="text-muted-foreground text-sm">
                    {messageHelper}
                  </em>
                </div>
              </div>
            ) : (
              <div className="relative flex items-center justify-center flex-wrap gap-1 min-h-[174px] max-h-[300px] overflow-auto">
                <Button
                  size="icon"
                  variant="ghost"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFiles([]);
                  }}
                  className="absolute top-0 right-0 rounded-full"
                >
                  <XIcon />
                </Button>

                {getOnlyImageFiles().map((file, index) => (
                  <div
                    title={file.name}
                    key={file.preview}
                    className="flex flex-col sm:flex-row gap-3 sm:items-center"
                  >
                    <Image
                      src={file.preview}
                      alt={`attachment ${index + 1}`}
                      width={50}
                      height={50}
                      className="object-cover rounded overflow-hidden bg-secondary cursor-pointer border border-secondary min-w-14 aspect-square"
                      // onClick={(e) => {
                      //   e.stopPropagation();
                      //   setIsLightboxOpen(true);
                      // }}
                      onClick={() =>
                        window.open(URL.createObjectURL(file), "_blank")
                      }
                      tabIndex={0}
                      style={{ objectPosition: "top" }}
                    />

                    <div>
                      {/* <div className="fw-bold">{file.name}</div> */}
                      {/* <div>{file.size} bytes</div> */}
                    </div>
                  </div>
                ))}

                {getOnlyPdfFiles().map((file) => (
                  <div
                    title={file.name}
                    key={file.preview}
                    className="flex flex-col sm:flex-row gap-3 sm:items-center"
                  >
                    {/* Display a PDF icon or file name */}
                    <div
                      className="cursor-pointer bg-red-100 rounded-md"
                      onClick={() =>
                        window.open(URL.createObjectURL(file), "_blank")
                      }
                      tabIndex={0}
                    >
                      <div className="p-3 rounded-lg">
                        <FileText size={20} className="text-red-700" />
                      </div>
                    </div>
                  </div>
                ))}

                {getOnlyVideoFiles().map((file) => (
                  <div
                    title={file.name}
                    key={file.preview}
                    className="flex flex-col sm:flex-row gap-3 sm:items-center"
                  >
                    {/* Display a PDF icon or file name */}
                    <div
                      className="cursor-pointer bg-primary rounded-md"
                      onClick={() =>
                        window.open(URL.createObjectURL(file), "_blank")
                      }
                      tabIndex={0}
                    >
                      <div className="bg-primary p-3 rounded-lg">
                        <FileVideo size={20} />
                      </div>
                    </div>
                  </div>
                ))}

                {getOtherFiles().map((file) => (
                  <div
                    title={file.name}
                    key={file.preview}
                    className="flex flex-col sm:flex-row gap-3 sm:items-center"
                  >
                    {/* Display a PDF icon or file name */}
                    <div
                      className="cursor-pointer bg-gray-200 rounded-md"
                      onClick={() =>
                        window.open(URL.createObjectURL(file), "_blank")
                      }
                      tabIndex={0}
                    >
                      <div className="p-3 rounded-lg">
                        <FileMinus size={20} className="text-gray-700" />
                      </div>
                    </div>
                  </div>
                ))}

                {fileRejectionItems}
              </div>
            )}
          </div>
        </div>
      </div>

      <Lightbox
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, .8)" },
          thumbnailsContainer: { backgroundColor: "rgba(0, 0, 0, .8)" },

          thumbnail: {
            backgroundColor: "transparent"
          }
        }}
        plugins={[Thumbnails, Counter, Zoom, Video]}
        thumbnails={{
          width: 50,
          border: 0,
          showToggle: true
        }}
        animation={{
          zoom: 200
        }}
        zoom={{
          maxZoomPixelRatio: 1,
          zoomInMultiplier: 2,
          doubleTapDelay: 300,
          doubleClickDelay: 300,
          doubleClickMaxStops: 2,
          keyboardMoveDistance: 50,
          wheelZoomDistanceFactor: 100,
          pinchZoomDistanceFactor: 100
        }}
        open={isLightboxOpen}
        close={() => setIsLightboxOpen(false)}
        slides={lightboxSlides}
      />

      <div className="flex gap-5 justify-end">
        {/* <button
          className="btn btn-primary"
          onClick={handleUploadAttachment}
          disabled={uploadAttachmentTicket.isLoading}
        >
          Upload Attachments
        </button> */}
      </div>
    </div>
  );
}
