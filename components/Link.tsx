import NextLink from "next/link";
import { Link as RadixLink } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

interface LinkProps extends PropsWithChildren {
  href: string;
}

export default function Link({ href, children }: LinkProps) {
  return (
    <NextLink href={href} passHref legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  );
}
