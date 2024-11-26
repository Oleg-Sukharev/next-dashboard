import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import EditIssueForm from './EditIssueForm';

const EditIssuePage = async ({ params }: {
  params: Promise<{ id: string }>
}) => {
  const { id } = await params;
  // const id = (await params).id

  const issue = await prisma.issue.findUnique({
    where: { id: id }
  });

  if (!issue) notFound();

  return (
    <EditIssueForm issue={issue} />
  );
};
export default EditIssuePage;