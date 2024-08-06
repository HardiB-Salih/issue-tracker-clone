import prisma from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

interface DetailIssueProps {
  params: {
    id: string;
  };
}

export default async function DetailIssue({
  params: { id },
}: DetailIssueProps) {
  if (typeof id !== "number") notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();

  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.createdAt.toDateString()}</p>
    </div>
  );
}
