import prisma from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { LoadingIssue } from "@/components/index";

interface PageProps {
  params: { id: string };
}

const IssueForm = dynamic(() => import("@/app/issues/_components/issue-form"), {
  ssr: false,
  loading: () => <LoadingIssue />,
});

export default async function Page({ params: { id } }: PageProps) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
}
