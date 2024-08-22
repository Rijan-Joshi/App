<<<<<<< HEAD
import { db } from "@/db";
import { redirect, notFound } from "next/navigation";
import PdfViewer from "@/components/PdfViewer";
import ChatBox from "@/components/ChatBox";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const Page = async ({
=======
const Page = ({
>>>>>>> 1d0f16f63dd262c4d6d69bcbdcdb2d15dd756420
  params,
}: {
  params: {
    file_id: String;
  };
}) => {
  const { file_id } = params;
<<<<<<< HEAD
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
    <main className="flex justify-center gap-2 items-center h-[calc(1000vh-3.5rem]">
      <div className="mx-auto w-full max-w-8xl grow lg: flex xl:px-2">
        <div className="flex-1 xl:flex">
          <div className="px-4 py-5 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            <PdfViewer url={file.url} />
          </div>
        </div>
      </div>
      <div className="shrink-0 flex-[0.75] border-t border-gray-200 lg:w-96 lg:border-1 lg:border-t-0">
        <ChatBox />
      </div>
    </main>
  );
=======

  return <h1>What is this place? Oh, it's {file_id}</h1>;
>>>>>>> 1d0f16f63dd262c4d6d69bcbdcdb2d15dd756420
};

export default Page;
