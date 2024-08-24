"use client";
import { ChevronDown, ChevronUp, Loader2, RotateCcw } from "lucide-react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useToast } from "./ui/use-toast";
import { useResizeDetector } from "react-resize-detector";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SimpleBar from "simplebar-react";
import FullScreenMode from "./FullScreenMode";
import { cn } from "@/lib/utils";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type PdfProps = {
  url: string;
  name: string;
};

const PdfViewer = ({ url, name }: PdfProps) => {
  const { toast } = useToast();
  const { width, ref } = useResizeDetector();
  const [rotation, setRotation] = useState<number>(0);
  const [currentPageNum, setCurrentPageNum] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>();
  const [zoom, setZoom] = useState<number>(1); // Zoom as a number
  const [renderedScale, setRenderedScale] = useState<number | null>(null);

  const isLoading = renderedScale !== zoom;

  // Validation of the input using zod
  const inputPageNumValidation = z.object({
    pageNum: z
      .string()
      .refine(
        (pageNum) => Number(pageNum) <= (numPages ?? 1) && Number(pageNum) > 0,
        {
          message: "Invalid page number",
        }
      ),
    zoomValue: z.string().refine(
      (zoomValue) =>
        Number(zoomValue.replace("%", "")) <= 500 &&
        Number(zoomValue.replace("%", "")) >= 25, // 500% and 25%
      { message: "Zoom value must be between 25% and 500%" }
    ),
  });

  // For type safety
  type PageNumValidation = z.infer<typeof inputPageNumValidation>;

  // Easy way for form validation
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PageNumValidation>({
    defaultValues: {
      pageNum: "1",
      zoomValue: "100%", // Default zoom as 100%
    },
    resolver: zodResolver(inputPageNumValidation),
  });

  const handlePageNum = ({ pageNum }: PageNumValidation) => {
    setCurrentPageNum(Number(pageNum));
    setValue("pageNum", String(pageNum));
  };

  const handleZoom = ({ zoomValue }: PageNumValidation) => {
    const zoomPercentage = Number(zoomValue.replace("%", ""));
    setZoom(zoomPercentage / 100); // Convert percentage to numeric value
    setValue("zoomValue", `${zoomPercentage}%`);
  };

  return (
    <div className="max-w-full flex flex-col rounded-md shadow items-center">
      <div className="w-full border border-b h-15 flex items-center justify-between px-2">
        <div className="flex gap-2 items-center w-full">
          <p className="w-40 pl-3 truncate font-bold text-sm">{name}</p>
          <div className="flex flex-row gap-0 items-center">
            <Button
              aria-label="previous-page"
              variant="ghost"
              onClick={() => {
                setCurrentPageNum((prev) => {
                  const newPage = Math.max(prev - 1, 1);
                  setValue("pageNum", String(newPage));
                  return newPage;
                });
              }}
              disabled={currentPageNum <= 1}
            >
              <ChevronDown className="w-4 h-4 text-black" />
            </Button>

            <Input
              className="w-7 h-7 p-1 mr-1 text-center font-bold"
              {...register("pageNum")}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(handlePageNum)();
                }
              }}
            />
            <span className="font-bold ">/ {numPages ? numPages : ""}</span>
            <Button
              aria-label="next-page"
              variant="ghost"
              onClick={() => {
                setCurrentPageNum((prev) => {
                  const newPage = Math.min(prev + 1, numPages ?? prev);
                  setValue("pageNum", String(newPage));
                  return newPage;
                });
              }}
              disabled={currentPageNum === numPages || numPages === undefined}
            >
              <ChevronUp className="w-4 h-4" />
            </Button>
          </div>

          <div className="w-[0.5] h-7 bg-black mt-1.5 mb-1.5" />

          <div className="flex flex-row items-center gap-1 justify-self-end">
            <Button
              disabled={zoom === 0.25}
              aria-label="zoom-out"
              variant="ghost"
              className="w-4 h-7"
              onClick={() => {
                const newZoom = Math.max(zoom - 0.1, 0.25); // Ensure zoom value is at least 0.25
                setZoom(newZoom);
                setValue("zoomValue", `${(newZoom * 100).toFixed(0)}%`); // Update zoom value in percentage
              }}
            >
              <span className="text-bold text-2xl flex place-items-center">
                -
              </span>
            </Button>
            <Input
              className="w-12 h-7 p-1 mr-1 text-center font-semibold"
              {...register("zoomValue")}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(handleZoom)();
                }
              }}
            />
            <Button
              disabled={zoom === 5}
              variant="ghost"
              aria-label="zoom-in"
              className="w-4 h-7"
              onClick={() => {
                const newZoom = Math.min(zoom + 0.1, 5); // Ensure zoom value does not exceed 5
                setZoom(newZoom);
                setValue("zoomValue", `${(newZoom * 100).toFixed(0)}%`); // Update zoom value in percentage
              }}
            >
              <span className="text-bold text-2xl flex place-items-center">
                +
              </span>
            </Button>
          </div>

          <Button
            variant="ghost"
            aria-label="Rotate the pdf by 90 degrees"
            onClick={() => {
              setRotation((prev) => prev - 90);
            }}
          >
            <RotateCcw className="h-5 w-5" />
          </Button>

          <FullScreenMode url={url} />
        </div>
      </div>
      <div className="w-full flex-1">
        <SimpleBar autoHide={false} className="max-h-[calc(100vh - 10rem)]">
          <div ref={ref}>
            <Document
              file={url}
              className="h-full"
              loading={
                <div className="flex place-items-center">
                  <Loader2 className="h-10 w-10 text-blue-700 animate-spin" />
                </div>
              }
              onLoadError={() => {
                toast({
                  title: "SOMETHING WENT WRONG",
                  content: "Couldn't load the file. Try again",
                  variant: "destructive",
                });
              }}
              onLoadSuccess={({ numPages }) => {
                setNumPages(numPages);
                toast({
                  title: "SUCCESSFULLY LOADED",
                });
              }}
            >
              {isLoading && renderedScale ? (
                <Page
                  width={width ? width : 1}
                  pageNumber={currentPageNum}
                  scale={zoom}
                  rotate={rotation}
                  key={"@" + renderedScale}
                />
              ) : null}
              <Page
                className={cn(isLoading ? "hidden" : "")}
                width={width ? width : 1}
                pageNumber={currentPageNum}
                scale={zoom}
                rotate={rotation}
                key={"@" + zoom}
                onRenderSuccess={() => {
                  setRenderedScale(zoom);
                }}
                loading={
                  <div className="flex place-items-center">
                    <Loader2 className="w-7 h-7 text-center animate-spin" />
                  </div>
                }
              />
            </Document>
          </div>
        </SimpleBar>
      </div>
    </div>
  );
};

export default PdfViewer;
