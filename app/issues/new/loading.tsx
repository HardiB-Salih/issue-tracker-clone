import { Skeleton } from "@/components/ui/skeleton";
import { Box } from "@radix-ui/themes";

export default function LoadingNewIssue() {
  return (
    <Box className="max-w-xl">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="my-5 h-60 w-full" />
      <Skeleton className="h-8 w-[150px]" />
    </Box>
  );
}
