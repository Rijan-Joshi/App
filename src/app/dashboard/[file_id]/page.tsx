import { db } from "@/db";
import { redirect, notFound } from "next/navigation";
import PdfViewer from "@/components/PdfViewer";
import ChatBox from "@/components/ChatComponents/ChatBox";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Page = async ({
  params,
}: {
  params: {
    file_id: String;
  };
}) => {
  const { file_id } = params;
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id) {
    redirect(`/auth-callback?origin=dashboard/${file_id}`);
    return;
  }

  //Check whether the file exist or not
  const file = await db.file.findFirst({
    where: {
      id: file_id,
      userId: user.id,
    },
  });

  if (!file) {
    notFound();
    return;
  }

  return (
    <main className="flex justify-between flex-1 flex-col items-center h-[calc(1000vh-3.5rem]">
      <div className="mx-auto w-full max-w-8xl grow lg:flex xl:px-2 ">
        <div className="flex-1 xl:flex h-full">
          <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6 h-full">
            <PdfViewer url={file.url} name={file.name} />
          </div>
        </div>

        <div className="shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-1 lg:border-t-0">
          <ChatBox fileId={file.id} />
        </div>
      </div>
    </main>
  );
};

export default Page;
