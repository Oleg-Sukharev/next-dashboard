import { Box, Table } from '@radix-ui/themes';
import prisma from '@/prisma/client';
import { IssueStatusBadge, Link } from '../components';
// import delay from 'delay';
import IssueActions from './IssueActions';
import NextLink from 'next/link';
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import Pagination from '../components/Pagination';

const COLUMNS: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
    { label: "Issue", value: "title" },
    {
      label: "Status",
      value: "status",
      className: "hidden md:table-cell",
    },
    {
      label: "Created",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];

const PAGE_SIZE = 2;

const IssuesPage = async ({ searchParams }: {
  searchParams: Promise<{
    status: Status,
    orderBy: keyof Issue,
    page: string
  }>
}) => {
  const searchParamsData = await searchParams;
  // await delay(3000);

  const statuses = Object.values(Status);

  const status = statuses.includes(searchParamsData.status)
    ? searchParamsData.status
    : undefined;

  const where = { status };

  const orderBy = COLUMNS
    .map(column => column.value)
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
    <div>
      <IssueActions />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            {COLUMNS.map((column) => (
              <Table.ColumnHeaderCell key={column.value} className={column.className}>
                <NextLink href={{
                  query: { ...searchParamsData, orderBy: column.value }
                }}>{column.label}</NextLink>
                <Box width="1rem" display="inline-block">
                  {column.value === searchParamsData.orderBy && <ArrowUpIcon className="inline" />}
                </Box>
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map(issue => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>
                  {issue.title}
                </Link>
                <div className='block md:hidden'>
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toLocaleDateString()}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Pagination itemCount={issueCount} pageSize={PAGE_SIZE} currentPage={page} />
    </div>
  );
};

// Route Segment Config
export const dynamic = 'force-dynamic';
// export const revalidate = '60';

export default IssuesPage;