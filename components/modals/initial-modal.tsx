"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import  axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { FileUpload } from "../file-upload";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required",
  }),
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export const InitialModal = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/servers", values);
      console.log("after post in initial modal")
      form.reset();
      router.refresh();
      window.location.reload();
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={true}>
      <DialogContent className="p-0 overflow-hidden max-w-md">
        <DialogHeader className="pt-8 px-6 text-center space-y-2">
          <DialogTitle className="text-2xl font-bold">
            Personalize Your Server
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            Add a custom name and image to make your server stand out and feel like home. You can always change it later.
          </DialogDescription>
        </DialogHeader>

        <form
          id="init-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="px-6 py-4 space-y-4">
          <FieldGroup>
            <Controller
              name="imageUrl"
              control={form.control}
              render={({ field }) => (
                //  data-invalid={fieldState.invalid}
                <Field>
                  <FieldLabel
                    htmlFor="server-image"
                    className="uppercase text-xs font-bold text-muted-foreground">
                    Server PFP
                  </FieldLabel>
                  {/* <Input
                    {...field}
                    id="server-image"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter image URL"
                    disabled={isLoading}
                    className="bg-muted border-0 focus-visible:ring-2 focus-visible:ring-primary" /> */}
                    <FileUpload
                      endpoint="serverImage"
                      onChange={field.onChange}
                      value={field.value} />
                  {/* {fieldState.error && (
                    <p className="text-destructive text-xs mt-1">
                      {fieldState.error.message}
                    </p>
                  )} */}
                </Field>
              )} />
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel
                    htmlFor="server-name"
                    className="uppercase text-xs font-bold text-muted-foreground">
                    Server Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="server-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter server name"
                    disabled={isLoading}
                    className="bg-muted border-0 focus-visible:ring-2 focus-visible:ring-primary" />
                  <FieldDescription className="text-muted-foreground text-xs">
                    Give your server a unique name.
                  </FieldDescription>
                  {fieldState.error && (
                    <p className="text-destructive text-xs mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </Field>
              )} />

          </FieldGroup>
        </form>

        <DialogFooter className="px-6 py-4">
          <Button
            type="submit"
            form="init-form"
            disabled={isLoading}
            className={`w-full ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}>
            Create Server
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};