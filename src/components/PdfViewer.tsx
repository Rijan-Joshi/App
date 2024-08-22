"use client";
import { Loader2 } from "lucide-react";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useToast } from "./ui/use-toast";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type PdfProps = {
  url: String;
};

const PdfViewer = ({ url }: PdfProps) => {
  const { toast } = useToast();

  return (
    <div>
      <Document
        file={url}
        className="max-h-full"
        loading={
          <div className="flex place-items-center">
            <Loader2 className="h-10 w-10 text-blue-700 animate-spin" />
          </div>
        }
        onLoadError={() => {
          toast({
            title: "SOMETHING WENT WRONG",
            content: "Counldn't load the file. Try again",
            variant: "destructive",
          });
        }}
        onLoadSuccess={() => {
          toast({
            title: "SUCCESSFULLY LOADED",
          });
        }}
      >
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};

export default PdfViewer;
