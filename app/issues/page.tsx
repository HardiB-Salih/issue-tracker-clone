import { Button } from "@radix-ui/themes";
import Link from "next/link";

interface IssuesPageProps {
  // Define your props here
}

export default function IssuesPage({}: IssuesPageProps) {
  return (
    <div>
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </div>
  );
}
