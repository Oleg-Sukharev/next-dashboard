'use client';

import { Issue, User } from '@prisma/client';
import { Select, Skeleton } from '@radix-ui/themes';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import toast, { Toaster } from "react-hot-toast";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  const onChange = (userId: string) => {
    axios.patch('/api/issues/' + issue.id, {
      assignedToUserId: userId || null,
    }).then(() => {
      toast.success('Issue assigned successfully!');
    }).catch(() => {
      toast.error('Changes could not be saved.');
    });
  }

  if (isLoading) return <Skeleton className='h-8' />;

  if (error) return null;

  return (
    <>
      <Select.Root
        defaultValue={issue?.assignedToUserId || ''}
        onValueChange={onChange}
      >
        <Select.Trigger placeholder='Assign...' />
        <Select.Content position='popper'>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            {users?.map(user => (
              <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>)
            )}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () =>
      axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, //60s
    retry: 3,
  });
}


export default AssigneeSelect;