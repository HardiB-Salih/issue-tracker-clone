"use client";

import { ConfirmDialog } from "@/components/index";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteButtonProps {
  issueId: number;
}

export default function DeleteButton({ issueId }: DeleteButtonProps) {
  const router = useRouter();
  const [error, setError] = useState(false);
  const deleteIssue = async () => {
    try {
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues");
      router.refresh;
    } catch (error) {
      setError(true);
    }
  };
  return (
    <>
      <ConfirmDialog issueId={issueId} onDelete={deleteIssue}>
        <Button color="red">Delete Issue</Button>
      </ConfirmDialog>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description size="2">
            This issue could not be deleted.
          </AlertDialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button
                variant="soft"
                color="gray"
                onClick={() => setError(false)}
              >
                OK
              </Button>
            </AlertDialog.Cancel>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
}
