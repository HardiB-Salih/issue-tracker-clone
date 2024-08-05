"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import kyInstance from "@/lib/ky";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import "easymde/dist/easymde.min.css";
import { InfoIcon } from "lucide-react";

interface IssueForm {
  title: string;
  description: string;
}

export default function NewIssuePage() {
  const [error, setError] = useState("");
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();

  const onCreate = async (values: IssueForm) => {
    try {
      await axios.post("/api/issues", values);
      router.push("/issues");
    } catch (error) {
      console.log(error);
      setError("An unexpected error occured");
    }
  };

  //   className={isDarkMode ? "dark-mode" : "light-mode"}

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
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <Button type="submit">Submit new issue</Button>
      </form>
    </div>
  );
}
