import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button, buttonVariants } from "./ui/button";

const UploadButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={buttonVariants({
            size: "lg",
          })}
        >
          Get Here
        </Button>
      </DialogTrigger>

      <DialogContent>This is me. Who are you?</DialogContent>
    </Dialog>
  );
};

export default UploadButton;
