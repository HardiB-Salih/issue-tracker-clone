"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import ErrorMessage from "@/components/error-message";
import { createIssueSchema } from "@/lib/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import "easymde/dist/easymde.min.css";
import { InfoIcon, Loader2 } from "lucide-react";
import SimpleMDE from "react-simplemde-editor";

interface IssueFormProps {
  issue?: Issue;
}
type IssueFormData = z.infer<typeof createIssueSchema>;

export default function IssueForm({ issue }: IssueFormProps) {
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema),
    defaultValues: {
      title: issue?.title || "",
      description: issue?.description || "",
    },
  });

  const onCreate = async (values: IssueFormData) => {
    try {
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, values);
        router.push(`/issues/${issue.id}`);
        router.refresh;
      } else {
        await axios.post("/api/issues", values);
        router.push("/issues");
        router.refresh;
      }
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
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button type="submit" disabled={isSubmitting}>
          {issue ? "Update issue" : "Submit new issue"}
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
        </Button>
      </form>
    </div>
  );
}
