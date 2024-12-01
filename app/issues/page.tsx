import { Table } from '@radix-ui/themes';
import prisma from '@/prisma/client';
import { IssueStatusBadge, Link } from '../components';
// import delay from 'delay';
import IssueActions from './IssueActions';
import { Status } from '@prisma/client'

const IssuesPage = async ({
  searchParams,
}: { searchParams: Promise<{ status: Status }> }) => {
  const { status } = await searchParams;
  // await delay(3000);

  const statuses = Object.values(Status);
  const activeStatus = statuses.includes(status) ? status : undefined;

  const issues = await prisma.issue.findMany({
    where: {
      status: activeStatus
    }
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
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
    </div>
  );
};

// Route Segment Config
export const dynamic = 'force-dynamic';
// export const revalidate = '60';

export default IssuesPage;