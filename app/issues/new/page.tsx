'use client';

import axios from 'axios';
import { ErrorMessage } from '@/app/components';
import { createIssueSchema } from '@/app/validationSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, Spinner, TextField, Skeleton } from '@radix-ui/themes';
import 'easymde/dist/easymde.min.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from "zod";

const SimpleMDE = dynamic(
  () => import('react-simplemde-editor'),
  {
    ssr: false,
    loading: () => <Skeleton height="305px" />,
  }
);

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  });
  const [error, setError] = useState('');

  const onSubmit = handleSubmit(async (data) => {
    try {
      await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (error) {
      setError('An unexpected error occurred.');
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className='mb-5'>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={onSubmit}
      >
        <TextField.Root placeholder="Title"  {...register('title')} >
          <TextField.Slot>
          </TextField.Slot>
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE
              placeholder="Description"
              {...field}
              options={{
                maxHeight: "200px"
              }}
            />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner />}</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;