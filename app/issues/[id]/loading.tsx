import { Skeleton } from "@/components/index";
import { Card, Flex } from "@radix-ui/themes";

export default function Loading() {
  return (
    <div>
      <Skeleton className="h-8 w-72" />
      <Flex className="items-center space-x-3" my="2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </Flex>
      <Card className="prose mt-4">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="my-4 h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </Card>
    </div>
  );
}
