"use client";

import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import "easymde/dist/easymde.min.css";
import { InfoIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/lib/validationSchema";
import { z } from "zod";

type IssueForm = z.infer<typeof createIssueSchema>;

export default function NewIssuePage() {
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const onCreate = async (values: IssueForm) => {
    try {
      await axios.post("/api/issues", values);
      router.push("/issues");
    } catch (error) {
      console.log(error);
      setError("An unexpected error occured");
    }
  };

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <InfoIcon />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={handleSubmit(onCreate)} className="space-y-3">
        <TextField.Root placeholder="Title" {...register("title")} />
        {errors.title && (
          <Text as="p" color="red">
            {errors.title.message}
          </Text>
        )}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {errors.description && (
          <Text as="p" color="red">
            {errors.description.message}
          </Text>
        )}

        <Button type="submit">Submit new issue</Button>
      </form>
    </div>
  );
}
