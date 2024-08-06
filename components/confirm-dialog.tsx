"use client";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

interface ConfirmDialogProps extends PropsWithChildren {
  issueId: number;
  onDelete: () => void;
}

export default function ConfirmDialog({
  issueId,
  children,
  onDelete,
}: ConfirmDialogProps) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>{children}</AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Are you sure you want to delete this issue? This action cannot be
          undone.
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant="solid"
              color="red"
              type="button"
              className="cursor-pointer"
              onClick={onDelete}
            >
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
