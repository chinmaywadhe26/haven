"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { useState } from "react";
import Image from "next/image";
import { X, LoaderCircle  } from "lucide-react";

interface FileUploadProps {
  endpoint: "serverImage" | "messageFile",
  onChange: (url?: string) => void,
  value: string
}

export const FileUpload = ({ endpoint, onChange, value }: FileUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
   <div className="flex justify-center">
  <div className="relative h-20 w-20">
    <div className="relative h-full w-full rounded-full overflow-hidden">
      <Image
        fill
        sizes="80px"
        alt="Server image"
        src={value}
        className="object-cover"
      />
    </div>
    <button
      onClick={() => onChange("")}
      className="absolute -top-1 -right-1 z-10 bg-destructive text-destructive-foreground rounded-full p-0.5 shadow-sm hover:opacity-80 transition"
      type="button"
    >
      <X className="size-3" />
    </button>
  </div>
</div>
    );
  }

  // return (
//     <div className="relative isolate">
//     {isUploading && (
//   <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-md bg-muted/80 backdrop-blur-sm ring-1 ring-border">
//     <LoaderCircle className="size-8 animate-spin text-primary" />
//     <p className="mt-2 text-xs text-muted-foreground">Uploading...</p>
//   </div>
// )}

//     <UploadDropzone
//       config={{ mode: "auto" }}
//       endpoint={endpoint}
//       onUploadBegin={() => setIsUploading(true)}
//       onClientUploadComplete={(res) => {
//           setIsUploading(false);

//         onChange(res?.[0].ufsUrl);
//       }}
//       onUploadError={(err: Error) => {
//         setIsUploading(false);
//         console.log("er: ", err);
//       }}
//       appearance={{
//         container: "rounded-md bg-muted border-0 h-40 cursor-pointer outline-none transition-[color,box-shadow] focus-visible:ring-2 focus-visible:ring-primary",
//         uploadIcon: "size-10 text-muted-foreground",
//         label: "text-sm text-primary",
//         allowedContent: "text-xs text-muted-foreground",
//         button: "hidden",
//       }}
//       content={{
//         label: "Upload server image",
//         allowedContent: "PNG, JPG up to 2MB",
//       }}
//     />
//         </div>
if (isUploading) {
  return (
    <div className="rounded-md bg-muted h-40 flex flex-col items-center justify-center gap-2">
      <LoaderCircle className="size-8 animate-spin text-primary" />
      <p className="text-xs text-muted-foreground">Uploading...</p>
    </div>
  );
}

return (
  <UploadDropzone
    config={{ mode: "auto" }}
    endpoint={endpoint}
    onUploadBegin={() => setIsUploading(true)}
    onClientUploadComplete={(res) => {
      setIsUploading(false);
      onChange(res?.[0].ufsUrl);
    }}
    onUploadError={(err: Error) => {
      setIsUploading(false);
      console.log("er: ", err);
    }}
    appearance={{
      container: "rounded-md bg-muted border-0 h-40 cursor-pointer outline-none transition-[color,box-shadow] focus-visible:ring-2 focus-visible:ring-primary",
      uploadIcon: "size-10 text-muted-foreground",
      label: "text-sm text-primary",
      allowedContent: "text-xs text-muted-foreground",
      button: "hidden",
    }}
    content={{
      label: "Upload server image",
      allowedContent: "PNG, JPG up to 2MB",
    }}
  />
);

};