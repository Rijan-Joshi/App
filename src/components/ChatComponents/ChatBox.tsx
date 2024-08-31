"use client";
import { trpc } from "@/app/_trpc/client";
import { Loader2 } from "lucide-react";
import ChatInput from "./ChatInput";

interface ChatBoxProps {
  fileId: string;
}

const ChatBox = ({ fileId }: ChatBoxProps) => {
  console.log("FileId", fileId);

  const { data, isLoading } = trpc.queryFileStatus.useQuery(
    {
      fileId,
    }
    // {
    //   refetchInterval: (data) =>
    //     data?.status === "SUCCESS" ||
    //     data?.status === "PROCESSING" ||
    //     data?.status === "FAILED"
    //       ? false
    //       : 500,
    // }
  );

  console.log(data?.status, "Status of the file");

  if (isLoading) {
    return (
      <div className="min-h-full relative divide-y divide-zinc-500 flex flex-col justify-between">
        <div className="flex flex-1 justify-center items-center flex-col mb-28">
          <Loader2 className=" h-6 w-7 animate-spin" />
          <p className="font-semibold text-xl">Loading...</p>
          <p className=" text-sm">Preparing your pdf. Please wait.</p>
        </div>

        <ChatInput />
      </div>
    );
  }

  if (data?.status === "PROCESSING") {
    return (
      <div className="min-h-full relative divide-y divide-zinc-500 flex flex-col justify-between">
        <div className="flex flex-1 justify-center items-center flex-col mb-28">
          <Loader2 className=" h-6 w-7 animate-spin" />
          <p className="font-semibold text-xl">Processing...</p>
          <p className=" text-sm">This won't take long.</p>
        </div>

        <ChatInput />
      </div>
    );
  }

  if (data?.status === "FAILED" || true) {
    return (
      <div className="min-h-full relative divide-y divide-zinc-500 flex flex-col justify-between">
        <div className="flex flex-1 justify-center items-center flex-col mb-28">
          <Loader2 className=" h-6 w-7 animate-spin" />
          <p className="font-semibold text-xl">Failed</p>
          <p className=" text-sm">
            Your Free Plan doesn't allow for more than 5 pages in a pdf.
          </p>
        </div>

        <ChatInput />
      </div>
    );
  }

  return (
    <div className="min-h-full relative divide-y divide-zinc-500 flex flex-col justify-between">
      <div className="flex flex-1 justify-center items-center flex-col mb-28">
        ChatBox
      </div>

      <ChatInput />
    </div>
  );
};

export default ChatBox;
