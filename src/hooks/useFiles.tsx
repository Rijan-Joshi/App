import { trpc } from "@/app/_trpc/client";
import { useState } from "react";

export const useFiles = () => {
  const [fileToBeDeleted, setFileToBeDeleted] = useState<string | null>(null);
  const utils = trpc.useUtils();
  const {
    data: files,
    isLoading,
    isError,
    error,
  } = trpc.getUserFiles.useQuery();

  const { mutate: deleteFile } = trpc.deleteFile.useMutation({
    onSuccess: () => {
      utils.getUserFiles.invalidate();
    },
    onMutate({ id }) {
      setFileToBeDeleted(id);
    },
    onError: (error) => {
      console.error("Error deleting file:", error);
    },
    onSettled() {
      setFileToBeDeleted(null);
    },
  });

  const handleDeleteFile = (id: string) => {
    deleteFile({ id });
  };

  return {
    files,
    isLoading,
    isError,
    error,
    fileToBeDeleted,
    handleDeleteFile,
  };
};
