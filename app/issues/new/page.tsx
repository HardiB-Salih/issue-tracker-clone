import { Button, TextArea, TextField } from "@radix-ui/themes";

interface NewIssuePageProps {
  // Define your props here
}

export default function NewIssuePage({}: NewIssuePageProps) {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Title" />
      <TextArea placeholder="Description" />
      <Button>Submit new issue</Button>
    </div>
  );
}
