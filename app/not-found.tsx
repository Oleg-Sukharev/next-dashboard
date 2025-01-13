import { Button, Heading, Flex } from "@radix-ui/themes"
import Link from "next/link";

export default function NotFound() {
  return (
    <Flex direction="column" align='center'>
      <Heading className="mt-5 mb-3 text-3xl" color="red">Page not found</Heading>
      <Button>
        <Link href="/">Home</Link>
      </Button>
    </Flex>
  )
}