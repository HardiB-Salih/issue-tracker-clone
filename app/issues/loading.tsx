import { Table } from "@radix-ui/themes";
import { Skeleton } from "@/components/ui/skeleton";
import IssueActions from "./issue-actions";

export default function LoadingIssuesPage() {
  const issues = [1, 2, 3, 4, 5];
  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue}>
              <Table.Cell>
                <Skeleton className="h-4 w-[140px]" />
                <div className="flex w-full md:hidden">
                  <Skeleton className="h-4 w-[90px]" />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton className="h-4 w-[100px]" />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton className="h-4 w-[200px]" />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
