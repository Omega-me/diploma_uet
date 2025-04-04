'use client';
import {
  MutateFunction,
  MutationKey,
  QueryKey,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'sonner';

export const useMutationData = (
  mutationKey: MutationKey,
  mutationFn: MutateFunction<any, any>,
  queryKey: QueryKey,
  onSuccess: () => void,
) => {
  const client = useQueryClient();
  const { mutate, isPending, variables } = useMutation({
    mutationKey,
    mutationFn,
    onSuccess: data => {
      if (onSuccess) onSuccess();
      return toast(data?.status === 200 || 201 ? 'Success' : 'Error', {
        description: data?.data,
      });
    },
    onSettled: async () => {
      return await client.invalidateQueries({ queryKey });
    },
  });

  return { mutate, isPending, variables };
};

// export const useMutationDataState = (mutationKey: MutationKey) => {
//   const data = useMutationState({
//     filters: { mutationKey },
//     select: muatation => {
//       return {
//         variables: muatation.state.variables as any,
//         status: muatation.state.status,
//       };
//     },
//   });
//   const latestVariables = data[data.length - 1];
//   return { latestVariables };
// };
