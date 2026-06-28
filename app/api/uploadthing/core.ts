import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const func = createUploadthing();
console.log("UT TOKEN:", process.env.UPLOADTHING_TOKEN?.slice(0, 10)); // only logs first 10 chars for safety

const handleAuth = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized")
  } else {
    return {userId: userId}
  }
}

export const ourFileRouter = {
  // server pfp
  serverImage: func({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
  .middleware(() => handleAuth())
  .onUploadComplete(() => {}),

  // send photos, pdfs, gifs when chatting
  messageFile: func(["image", "pdf"])
  .middleware(() => handleAuth())
  .onUploadComplete(() => {})

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
