"use client";
import { trpc } from "@/app/_trpc/client";
import UploadButton from "./UploadButton";
import { Ghost } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { Button } from "./ui/button";
import { Plus, MessageSquare, Trash, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useState, useMemo } from "react";

const Header = () => {
  return (
    <header className="flex pb-5 justify-between gap-5 items-start flex-col sm:flex-row sm:items-center border-b-2">
      <h1 className="font-semibold text-4xl text-gray-500">My Files</h1>
      <UploadButton />
    </header>
  );
};

const FileItem = ({
  file,
  onDelete,
  isDeleting,
}: {
  file: any;
  onDelete: () => void;
  isDeleting: boolean;
}) => {
  const formattedDate = useMemo(
    () => format(new Date(file.createdAt), "MM yyyy"),
    [file.createdAt]
  );
  return (
    <li
      key={file.id}
      className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg"
    >
      <Link href={`/dashboard/${file.id}`} className="flex flex-col gap-2">
        <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
          <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-pink-500 to-orange-500" />
          <div className="flex-1 truncate">
            <div className="flex items-center space-x-3">
              <h3 className="truncate text-lg font-medium text-zinc-900">
                {file.name}
              </h3>
            </div>
          </div>
        </div>
      </Link>

      <div className="px-6 mt-4 grid grid-cols-3 gap-6 justify-center items-center text-zinc-500">
        <div className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          {formattedDate}
        </div>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          Mocked
        </div>
        <Button className="w-full" onClick={onDelete} disabled={isDeleting}>
          {isDeleting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Trash className="h-4 w-4" />
          )}
        </Button>
      </div>
    </li>
  );
};

const FileList = ({
  files,
  fileToBeDeleted,
  deleteFile,
}: {
  files: any[];
  fileToBeDeleted: string | null;
  deleteFile: (id: string) => void;
}) => {
  const sortedFiles = useMemo(
    () =>
      files.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ),
    [files]
  );

  return (
    <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
      {sortedFiles.map((file) => (
        <FileItem
          key={file.id}
          file={file}
          onDelete={() => deleteFile(file.id)}
          isDeleting={fileToBeDeleted === file.id}
        />
      ))}
    </ul>
  );
};

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center gap-3 mt-16">
      <Ghost className="h-16 w-16 text-zinc-800" />
      <h3>Hmm..., No files here.</h3>
      <p>Let&apos;s upload your first file</p>
    </div>
  );
};

const Dashboard = () => {
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

  return (
    <main className="mx-auto max-w-7xl md:p-10">
      <Header />
      {/* All user files */}

      {isLoading ? (
        <Skeleton height={50} className="my-3" count={8} />
      ) : isError ? (
        <div className="text-red-500">
          Failed to load files: {error.message}
        </div>
      ) : files && files.length > 0 ? (
        <FileList
          files={files}
          fileToBeDeleted={fileToBeDeleted}
          deleteFile={handleDeleteFile}
        />
      ) : (
        <EmptyState />
      )}
    </main>
  );
};

export default Dashboard;
