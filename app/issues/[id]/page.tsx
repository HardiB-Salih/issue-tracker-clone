import IssueStatusBadge from "@/components/issue-status-badge";
import prisma from "@/prisma/prisma-client";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkDown from "react-markdown";
import DeleteButton from "../_components/delete-button";

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
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <Heading>{issue.title}</Heading>
        <Flex className="items-center space-x-3" my="2">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose mt-4 max-w-full">
          <ReactMarkDown>{issue.description}</ReactMarkDown>
        </Card>
      </Box>
      <Flex direction="column" gap="4">
        <Button>
          <Pencil className="size-4 stroke-slate-200" />
          <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
        </Button>
        <DeleteButton issueId={issue.id} />
      </Flex>
    </Grid>
  );
}

export const dynamic = "force-dynamic";
