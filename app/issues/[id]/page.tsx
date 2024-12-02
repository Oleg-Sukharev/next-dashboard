import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from '../edit/[id]/DeleteIssueButton';
import authOptions from '@/app/auth/authOptions';
import { getServerSession } from 'next-auth';
import AssigneeSelect from '../AssigneeSelect';
import { cache } from 'react';

const getIssue = cache(async (issueId: string) => {
  try {
    const issue = await prisma.issue.findUnique({
      where: { id: String(issueId) },
    });

    return issue;
  } catch {
    return null
  }
});


interface Props {
  params: Promise<{ id: string }>;
}

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  const issue = await getIssue(id);
  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", md: "5" }} gap="5">
      <Box className='md:col-span-4'>
        <IssueDetails issue={issue} />
      </Box>
      {session && <Box>
        <Flex direction="column" gap="4">
          <AssigneeSelect issue={issue} />
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      </Box>}
    </Grid>
  );
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const issue = await getIssue(id);

  if (!issue) return null;

  return {
    title: issue?.title,
    description: 'Details of issue ' + issue?.id
  }
}

export default IssueDetailPage;