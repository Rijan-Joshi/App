"use client";
import { File, Loader2, Upload } from "lucide-react";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { Progress } from "@/components/ui/progress";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "./ui/use-toast";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";

const Uploader = () => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const router = useRouter();

  const { startUpload } = useUploadThing("documentUploader");
  const { toast } = useToast();

  //Function used for polling
  const { mutate: beginPolling } = trpc.getFile.useMutation({
    onSuccess: (file) => {
      router.push(`/dashboard/${file.id}`);
    },
    retry: true,
    retryDelay: 500,
  });

  // Simulating Progress becuase the progress can't be tracked using tRPC
  const startSimulatingProgress = () => {
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev == 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 300);

    return interval;
  };

  return (
    <Dropzone
      multiple={false}
      onDrop={async (acceptedFile) => {
        setIsUploading(true);

        const progressInterval = startSimulatingProgress();

        const response = await startUpload(acceptedFile);

        console.log("Response testing", response);

        if (!response || response.length === 0) {
          clearInterval(progressInterval);
          setIsUploading(false);
          return toast({
            title: "SOMETHING WENT WRONG",
            description: "Try again",
            variant: "destructive",
          });
        }

        const [fileResponse] = response;
        const key = fileResponse?.key;

        if (!key) {
          clearInterval(progressInterval);
          setIsUploading(false);
          return toast({
            title: "SOMETHING WENT WRONG...",
            description: "Please try again later",
            variant: "destructive",
          });
        }

        clearInterval(progressInterval);
        setUploadProgress(100);
        beginPolling({ key });
      }}
    >
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

              {isUploading && uploadProgress < 100 ? (
                <Progress
                  value={uploadProgress}
                  className="mt-2 text-blue-600"
                />
              ) : uploadProgress === 100 ? (
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
