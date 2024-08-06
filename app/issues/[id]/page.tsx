import IssueStatusBadge from "@/components/issue-status-badge";
import prisma from "@/prisma/prisma-client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkDown from "react-markdown";

interface DetailIssueProps {
  params: {
    id: string;
  };
}

export default async function DetailIssue({
  params: { id },
}: DetailIssueProps) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex className="items-center space-x-3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose mt-4">
        <ReactMarkDown>{issue.description}</ReactMarkDown>
      </Card>
    </div>
  );
}
