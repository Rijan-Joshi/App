import { useState } from "react";
import SimpleBar from "simplebar-react";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import { Expand, Loader2 } from "lucide-react";
import { Document, Page } from "react-pdf";
import { useToast } from "./ui/use-toast";
import { useResizeDetector } from "react-resize-detector";

interface URLProps {
  url: string;
}

const FullScreenMode = ({ url }: URLProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [numPages, setNumPages] = useState<number>();
  const { toast } = useToast();
  const { width, ref } = useResizeDetector();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v);
        }
      }}
    >
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        <Button variant="ghost" aria-label="Make pdf full Screen">
          <Expand className="h-5 w-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-7xl w-full">
        <SimpleBar autoHide={false} className="max-h-[calc(100vh-6rem)] mt-6">
          <div ref={ref}>
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
              {new Array(numPages).fill(0).map((_, i) => (
                <Page key={i} width={width ? width : 1} pageNumber={i + 1} />
              ))}
            </Document>
          </div>
        </SimpleBar>
      </DialogContent>
    </Dialog>
  );
};

export default FullScreenMode;
