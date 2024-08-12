"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button, buttonVariants } from "./ui/button";
import { useState } from "react";

const UploadButton = () => {
  const [open, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog>
      <DialogTrigger onClick={() => setIsOpen(true)} asChild>
        <Button
          className={buttonVariants({
            size: "lg",
          })}
        >
          Upload Pdf
        </Button>
      </DialogTrigger>

      <DialogContent>This is me. Who are you?</DialogContent>
    </Dialog>
  );
};

export default UploadButton;
