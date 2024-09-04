"use client";
import { File, Loader2, Upload } from "lucide-react";
import { useCallback, useState } from "react";
import Dropzone from "react-dropzone";
import { Progress } from "@/components/ui/progress";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "./ui/use-toast";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";

interface UploadState {
  isUploading: boolean;
  uploadProgress: number;
}

const Uploader = () => {
  const [uploadState, setUploadState] = useState<UploadState>({
    isUploading: false,
    uploadProgress: 0,
  });

  const router = useRouter();

  const { startUpload } = useUploadThing("documentUploader");
  const { toast } = useToast();

  //Handle Errors while Uploading

  const handleUploadError = useCallback(
    (message: string) => {
      setUploadState({ isUploading: false, uploadProgress: 0 });
      toast: ({
        title: "Upload Failed",
        description: message,
        variant: "destructive",
      });
    },
    [toast]
  );
  //Function used for polling
  const { mutate: beginPolling } = trpc.getFile.useMutation({
    onSuccess: (file) => {
      router.push(`/dashboard/${file.id}`);
    },
    retry: true,
    retryDelay: 500,
  });

  // Simulating Progress becuase the progress can't be tracked using tRPC
  const startSimulatingProgress = useCallback(() => {
    setUploadState((prev) => ({ ...prev, uploadProgress: 0 }));

    const interval = setInterval(() => {
      setUploadState((prev) => {
        if (prev.uploadProgress >= 90) {
          clearInterval(interval);
          return prev;
        }
        return { ...prev, uploadProgress: prev.uploadProgress - 5 };
      });
    }, 300);

    return interval;
  }, []);

  const handleDrop = async (files: File[]) => {
    setUploadState({ isUploading: true, uploadProgress: 0 });

    //Start of simulation
    const uploadSimulation = startSimulatingProgress();
    //Start Uploading
    const res = await startUpload(files);

    if (!res || !res.length) {
      clearInterval(uploadSimulation);
      return handleUploadError("Something went wrong.");
    }

    const [fileResponse] = res;
    const key = fileResponse?.key;

    if (!key) {
      clearInterval(uploadSimulation);
      return handleUploadError("Something went wrong");
    }

    clearInterval(uploadSimulation);
    setUploadState({ isUploading: false, uploadProgress: 100 });
    beginPolling({ key });
  };

  return (
    <Dropzone multiple={false} onDrop={handleDrop}>
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div
          {...getRootProps()}
          className="h-72 border border-gray-500 border-dashed border-5 rounded-lg m-5"
        >
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <label htmlFor="dropzone-input">
              <div className="flex flex-col items-center p-5">
                <Upload className="h-20 w-20 text-gray-400" />
                <p>
                  Click to Upload{" "}
                  <span className="font-semibold">or Drag and Drop</span>
                </p>
              </div>

              {acceptedFiles && acceptedFiles[0] ? (
                <div className="max-w-[300] text-center flex justify-center gap-2 items-center">
                  <File className="h-6 w-6 text-black-400 font-bold" />
                  <div className="font-semibold text-1xl truncate">
                    {acceptedFiles[0].name}
                  </div>
                </div>
              ) : null}

              {uploadState.isUploading && uploadState.uploadProgress < 100 ? (
                <Progress
                  value={uploadState.uploadProgress}
                  className="mt-2 text-blue-600"
                />
              ) : uploadState.uploadProgress === 100 ? (
                <div className="flex items-center justify-center text-align">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Redirecting...
                </div>
              ) : null}

              <input
                type="file"
                {...getInputProps()}
                id="dropzone-input"
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  );
};

export default Uploader;
