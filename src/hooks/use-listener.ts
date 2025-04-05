import React, { useState } from 'react';
import { z } from 'zod';
import { useMutationData } from './use-mutation-data';
import { onSaveListener } from '@/actions/automation';
import useZodForm from './use-zod-form';

const promptSchema = z.object({
  prompt: z.string().min(1),
  replay: z.string(),
});

interface Data extends z.infer<typeof promptSchema> {}

const useListener = (id: string) => {
  const [listener, setListener] = useState<'SMARTAI' | 'MESSAGE'>(null);

  const { isPending, mutate } = useMutationData(
    ['create-listener'],
    async (data) => {
      const { prompt, replay } = data as unknown as Data;
      return await onSaveListener(id, listener || 'MESSAGE', prompt, replay);
    },
    ['automation-info']
  );

  const { errors, onFormSubmit, register, reset, watch } = useZodForm(promptSchema, mutate);

  const onSetListener = (type: 'MESSAGE' | 'SMARTAI') => setListener(type);

  return { onSetListener, register, onFormSubmit, listener, isPending };
};

export default useListener;
