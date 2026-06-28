"use client";
import { UploadDropzone } from "@/lib/uploadthing";

export default function TestUpload() {
  return (
    <div className="p-10">
      <UploadDropzone
        endpoint="serverImage"
        onClientUploadComplete={(res) => {
          console.log("SUCCESS:", res);
          alert("Upload complete: " + res[0].ufsUrl);
        }}
        onUploadError={(err) => {
          console.log("ERROR:", err);
          alert("Error: " + err.message);
        }}
        onUploadBegin={() => {
          console.log("UPLOAD BEGAN");
        }}
      />
    </div>
  );
}