import { ArrowUpIcon } from "@radix-ui/react-icons"
import { Table, Box } from "@radix-ui/themes"
import Link from "next/link"
import { IssueStatusBadge } from "../components";
import { Issue, Status } from "@prisma/client";
import NextLink from 'next/link';

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

interface Props {
  issues: Issue[],
  searchParams: IssueQuery
}

const IssueTable = ({ issues, searchParams }: Props) => {
  return (
    <Table.Root variant='surface'>
      <Table.Header>
        <Table.Row>
          {COLUMNS.map((column) => (
            <Table.ColumnHeaderCell key={column.value} className={column.className}>
              <NextLink href={{
                query: { ...searchParams, orderBy: column.value }
              }}>{column.label}</NextLink>
              <Box width="1rem" display="inline-block">
                {column.value === searchParams.orderBy && <ArrowUpIcon className="inline" />}
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
  )
}

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

export const columnNames = COLUMNS.map(column => column.value);

export default IssueTable
