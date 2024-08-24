"use client";
import { trpc } from "@/app/_trpc/client";
import { Loader2 } from "lucide-react";

interface ChatBoxProps {
  fileId: string;
}

const ChatBox = ({ fileId }: ChatBoxProps) => {
  const { data, isLoading } = trpc.queryFileStatus.useQuery(
    { fileId },
    {
      refetchInterval: (data) =>
        data?.status === "SUCCESS" || data?.status === "FAILED" ? false : 500,
    }
  );

  if (isLoading) {
    return (
      <div className="min-h-full relative divide-y divide-zinc-500 flex flex-col justify-between">
        <div className="flex flex-1 justify-center items-center flex-col mb-28">
          <Loader2 className=" h-6 w-7 animate-spin" />
          <p className="font-semibold text-2xl">Loading...</p>
          <p className="font-semibold text-xl">
            Preparing your pdf. Please wait.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full relative divide-y divide-zinc-500 flex flex-col justify-between">
      <div className="flex flex-1 justify-center items-center flex-col mb-28">
        ChatBox
      </div>
    </div>
  );
};

export default ChatBox;
