"use client";
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from "react-hook-form";
import "easymde/dist/easymde.min.css";
import kyInstance from "@/lib/ky";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

export default function NewIssuePage() {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();

  const onCreate = async (values: IssueForm) => {
    await kyInstance.post("/api/issues", { json: values });
    router.push("/issues");
  };

  return (
    <form onSubmit={handleSubmit(onCreate)} className="max-w-xl space-y-3">
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
  );
}
