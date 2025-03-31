'use server';
import { onCurrentUser } from '../user';
import { createAutomation, getAllAutomations } from './query';

export const onCreateAutomation = async () => {
  const user = await onCurrentUser();
  try {
    const create = await createAutomation(user.id);
    if (create) return { status: 200, data: 'Automation created' };
    return { status: 404, data: 'Oops! Something went wrong' };
  } catch (error) {
    return { status: 500, data: 'Internal server error' };
  }
};

export const onGetAllAutomations = async () => {
  const user = await onCurrentUser();
  try {
    const data = await getAllAutomations(user.id);
    if (data) return { status: 200, data: data.automations || [] };
    return { status: 404, data: [] };
  } catch (error) {
    return { status: 500, data: [] };
  }
};
