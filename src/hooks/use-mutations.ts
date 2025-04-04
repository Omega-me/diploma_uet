'use client';
import {
  onCreateAutomation,
  onUpdateAutomationName,
} from '@/actions/automation';
import { useMutationData } from './use-mutation-data';
import { useRef, useState } from 'react';

export const useCreateAutomation = () => {
  const { isPending, mutate, variables } = useMutationData(
    ['create-automation'],
    () => onCreateAutomation(),
    ['user-automations'],
    () => {},
  );

  return { isPending, mutate, variables };
};

export const useEditAutomation = (id: string) => {
  const [edit, setIsEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const enableEdit = () => setIsEdit(true);
  const disableEdit = () => setIsEdit(false);

  const { isPending, mutate, variables } = useMutationData(
    ['update-automation'],
    async data => {
      const { name } = data as unknown as { name: string };
      return await onUpdateAutomationName(id, {
        name,
      });
    },
    ['automation-info'],
    () => {},
  );

  const handleUpdate = () => {
    if (inputRef.current) {
      const name = inputRef.current.value;
      if (name) {
        mutate({ name } as any);
        disableEdit();
      }
    }
  };

  return {
    isPending,
    variables: variables as unknown as { name: string },
    edit,
    enableEdit,
    disableEdit,
    inputRef,
    handleUpdate,
  };
};
