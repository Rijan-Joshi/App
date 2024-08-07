import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";

export default function Home() {
  return (
    <MaxWidthWrapper className='mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center'>
      <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50 cursor-pointer">
        <p className="text-sm font-semibold text-gray-700">
          Kanxa is crazy!
        </p>
      </div>

      <h1 className="max-w-4xl text-6xl font-bold lg:text-7xl">
        Read, chat and take note from your <span className="text-orange-500"> Documents & Papers </span> while you blink
      </h1>
      <p className="mt-6 max-w-prose text-zinc-700 sm:text-lg font-semibold">
        Access your personal AI Research Assistant. Have conversation. Take note. Customize as you want. Just get Started
      </p>

      <Link to ="/dashboard">
      </Link>

   </MaxWidthWrapper> 
  )
}
