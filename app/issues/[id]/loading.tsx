import { Flex, Card, Box, Skeleton } from '@radix-ui/themes';

const LoadingIssueDetailPage = () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton height='2rem' />
      <Flex className="space-x-3" my="2">
        <Skeleton width="5rem" height="1.5rem" />
        <Skeleton width="8rem" height="1.5rem" />
      </Flex>
      <Card className='prose' mt="4">
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </Card>
    </Box>
  );
};

export default LoadingIssueDetailPage;