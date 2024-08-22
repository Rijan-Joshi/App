"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { Button, buttonVariants } from "./ui/button";
import { useState } from "react";
import Uploader from "./Uploader";

const UploadButton = () => {
  const [open, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog
      open={open}
      onOpenChange={(b) => {
        setIsOpen(b);
      }}
    >
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button
          className={buttonVariants({
            size: "lg",
          })}
        >
          Upload Pdf
        </Button>
      </DialogTrigger>

      <DialogContent>
        <Uploader />
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
