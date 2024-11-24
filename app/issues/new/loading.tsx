import { Box, Skeleton } from '@radix-ui/themes';

const LoadingNewIssuePage = () => {

  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default LoadingNewIssuePage;