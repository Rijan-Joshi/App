import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "@/db";
 
const f = createUploadthing();

 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  documentUploader: f({ pdf: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on your server before upload
      const {getUser} = getKindeServerSession()
      const user = await getUser()
      
      console.log("User000",  user?.id)
      // If you throw, the user will not be able to upload
      if (!user || !user.id ) throw new Error("Unauthorized");
 
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({
      metadata,
      file,
    }) => {

      const fileExist = await db.file.findFirst({
        where:{
          key: file.key
        }
      })
      
      console.log("Existing File", fileExist)
      if (fileExist) return
      
      console.log("Let's see whar are in this file", file)
      
      const user = await db.user.findUnique({
        where: { id: metadata.userId },
      });
  
      if (!user) {
        console.error(`User with ID ${metadata.userId} not found.`);
        // Gracefully handle the error, e.g., send a notification or fallback
        return;
      }else{
        console.log("Yay, User exists")
      }

      // This code RUNS ON YOUR SERVER after upload
      // await db.file.create({
      //   data: {
      //     key: file.key,
      //     name: file.name,
      //     userId: metadata.userId,
      //     url: `https://uploadthing-prod.s3.us-west-2.amazonaws.com/${file.key}`,
      //     uploadStatus: 'PROCESSING',
      //   },
      // })

      await db.file.create({
        data: {
          key: file.key,
          name: file.name,
          userId: metadata.userId,
          url: file.url,
          uploadStatus: 'PROCESSING',
        },
      })

      
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;