import prisma from '@/prisma/client';
// import delay from 'delay';
import IssueActions from './IssueActions';
import { Issue, Status } from "@prisma/client";
import Pagination from '../components/Pagination';
import IssueTable, { columnNames as issueColumnNames } from './IssueTable';
import { Flex } from '@radix-ui/themes';
import { Metadata } from 'next';

const PAGE_SIZE = 10;

const IssuesPage = async ({ searchParams }: {
  searchParams: Promise<{
    status: Status,
    orderBy: keyof Issue,
    page: string
  }>
}) => {
  // await delay(3000);
  const searchParamsData = await searchParams;
  const statuses = Object.values(Status);

  const status = statuses.includes(searchParamsData.status)
    ? searchParamsData.status
    : undefined;

  const where = { status };

  const orderBy = issueColumnNames
    .includes(searchParamsData.orderBy)
    ? { [searchParamsData.orderBy]: 'asc' }
    : undefined;

  const page = parseInt(searchParamsData.page) || 1;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * PAGE_SIZE,
    take: PAGE_SIZE,
  });

  const issueCount = await prisma.issue.count({ where });

  return (
    <Flex direction="column" gap="3">
      <IssueActions />
      <IssueTable searchParams={searchParamsData} issues={issues} />
      <Pagination itemCount={issueCount} pageSize={PAGE_SIZE} currentPage={page} />
    </Flex>
  );
};

// Route Segment Config
export const dynamic = 'force-dynamic';
// export const revalidate = '60';

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues'
};

export default IssuesPage;