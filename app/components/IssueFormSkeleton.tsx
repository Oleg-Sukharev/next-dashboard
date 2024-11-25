import { Box, Skeleton } from '@radix-ui/themes';

const IssueFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height="2rem" mb='12px' />
      <Skeleton height="22rem" />
    </Box>
  );
};
export default IssueFormSkeleton;