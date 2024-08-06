import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

interface IssueStatusBadgeProps {
  status: Status;
  className?: string;
}

const statusMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "green" }
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Close", color: "green" },
};

export default function IssueStatusBadge({
  status,
  className,
}: IssueStatusBadgeProps) {
  return (
    <Badge className={className} color={statusMap[status].color}>
      {statusMap[status].label}
    </Badge>
  );
}
