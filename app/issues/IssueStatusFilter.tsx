'use client';

import { Select } from "@radix-ui/themes";
import { Status } from '@prisma/client'
import { useRouter, useSearchParams } from 'next/navigation';

const STATUSES: { label: string, value: Status | "ALL" }[] = [
  { label: 'All', value: "ALL" },
  { label: 'Open', value: 'OPEN' },
  { label: 'In Progress', value: 'IN_PROGRESS' },
  { label: 'Closed', value: 'CLOSED' },
]

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onChange = (status: string) => {
    const params = new URLSearchParams();
    const statusValue = status !== "ALL" ? status : '';
    if (statusValue) params.append('status', statusValue);
    if (searchParams.get('orderBy'))
      params.append('orderBy', searchParams.get('orderBy')!);

    const query = params.size ? '/?' + params.toString() : '';
    router.push('/issues' + query);
  }

  return (
    <Select.Root
      defaultValue={searchParams.get('status') || 'ALL'}
      onValueChange={onChange}
    >
      <Select.Trigger placeholder='Filter by status...' />
      <Select.Content position='popper'>
        <Select.Group>
          {STATUSES?.map(status => (
            <Select.Item key={status.label} value={status.value}>
              {status.label}
            </Select.Item>)
          )}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
};

export default IssueStatusFilter