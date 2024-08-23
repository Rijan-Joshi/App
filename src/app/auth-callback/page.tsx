"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";
import { Loader2 } from "lucide-react";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get("origin") || "/dashboard";

  const { data, error } = trpc.authCallback.useQuery(undefined, {
    retry: 4,
    retryDelay: 200,
  });
  if (data.success) {
    router.push(`/${origin}`);
  }
  if (error) {
    router.push("/sign-in");
  }

  // Fetch the auth callback data

  // const router = useRouter();

  // const searchParams = useSearchParams();
  // const origin = searchParams.get("origin");

  // trpc.authCallback.useQuery(undefined, {
  //   onSuccess: ({ success }) => {
  //     if (success) {
  //       // user is synced to db
  //       router.push(origin ? `/${origin}` : "/dashboard");
  //     }
  //   },
  //   onError: (err) => {
  //     if (err.data?.code === "UNAUTHORIZED") {
  //       router.push("/sign-in");
  //     }
  //   },
  //   retry: true,
  //   retryDelay: 500,
  // });

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
        <h3 className="font-semibold text-xl">Setting up your account...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};

export default Page;
