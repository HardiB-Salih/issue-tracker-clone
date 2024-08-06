import { Skeleton } from "@/components/index";
import { Box } from "@radix-ui/themes";

export default function LoadingIssue() {
  return (
    <Box className="max-w-xl">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="my-5 h-60 w-full" />
      <Skeleton className="h-8 w-[150px]" />
    </Box>
  );
}
