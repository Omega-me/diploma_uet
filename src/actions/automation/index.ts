'use server';
import { Post } from '@prisma/client';
import { onCurrentUser } from '../user';
import { findUser } from '../user/queries';
import {
  addKeyword,
  addListener,
  addPost,
  addTrigger,
  createAutomation,
  deleteKeyword,
  findAutomation,
  getAllAutomations,
  onUpdateAutomation,
} from './query';

export const onCreateAutomation = async () => {
  const user = await onCurrentUser();
  try {
    const create = await createAutomation(user.id);
    if (create) return { status: 201, data: 'Automation created' };
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

export const onGetAutomationInfo = async (id: string) => {
  await onCurrentUser();
  try {
    const automation = await findAutomation(id);
    if (automation) return { status: 200, data: automation };
    return { status: 404 };
  } catch (error) {
    return { status: 500 };
  }
};

export const onUpdateAutomationName = async (
  id: string,
  data: {
    name?: string;
    active?: boolean;
    automation?: string;
  },
) => {
  await onCurrentUser();
  try {
    const automation = await onUpdateAutomation(id, data);
    if (automation)
      return { status: 200, data: 'Automation successfully updated' };
    return { status: 404, data: 'Oops! Could not find an automation' };
  } catch (error) {
    return { status: 500, data: 'Oops! Something went wrong' };
  }
};

export const onSaveListener = async (
  automationId: string,
  listener: 'SMARTAI' | 'MESSAGE',
  prompt: string,
  reply?: string,
) => {
  await onCurrentUser();
  try {
    const created = await addListener(automationId, listener, prompt, reply);
    if (created) return { status: 200, data: 'Listener created' };
    return { status: 404, data: 'Cant save listener' };
  } catch (error) {
    return { status: 500, data: 'Oops! Something went wrong' };
  }
};

export const onSaveTrigger = async (
  automationId: string,
  trigger: string[],
) => {
  await onCurrentUser();
  try {
    const created = await addTrigger(automationId, trigger);
    if (created) return { status: 200, data: 'Trigger created' };
    return { status: 404, data: 'Cant save trigger' };
  } catch (error) {
    return { status: 500, data: 'Oops! Something went wrong' };
  }
};

export const onSaveKeyword = async (automationId: string, keyword: string) => {
  await onCurrentUser();
  try {
    const created = await addKeyword(automationId, keyword);
    if (created) return { status: 200, data: 'Keyword added successfully' };
    return { status: 404, data: 'Cant add this keyword' };
  } catch (error) {
    return { status: 500, data: 'Oops! Something went wrong' };
  }
};

export const onDeleteKeyword = async (id: string) => {
  await onCurrentUser();
  try {
    const deleted = await deleteKeyword(id);
    if (deleted) return { status: 200, data: 'Keyword deleted' };
    return { status: 404, data: 'Keyword not found' };
  } catch (error) {
    return { status: 500, data: 'Oops! Something went wrong' };
  }
};

export const onGetProfilePosts = async () => {
  const user = await onCurrentUser();
  try {
    const profile = await findUser(user.id);
    const posts = await fetch(
      `${process.env.INSTAGRAM_BASE_URL}/me/media?fields=id,caption,media_type,media_url,timestamp&&limit=10access_token=${profile?.integrations[0]?.token}`,
    );
    const parsed = await posts.json();
    if (parsed) return { status: 200, data: parsed.data };

    console.log('Error fetching posts', parsed);
    return { status: 404 };
  } catch (error) {
    console.log('Error fetching posts', error);
    return { status: 500 };
  }
};

export const onSavePosts = async (automationId: string, posts: Post[]) => {
  await onCurrentUser();
  try {
    const created = await addPost(automationId, posts);
    if (created) return { status: 200, data: 'Posts attached' };
    return { status: 404, data: 'Automation not found' };
  } catch (error) {
    return { status: 500, data: 'Oops! Something went wrong' };
  }
};

export const onActivateAutomation = async (
  automationId: string,
  state: boolean,
) => {
  await onCurrentUser();
  try {
    const activated = await onUpdateAutomation(automationId, { active: state });
    if (activated)
      return {
        status: 200,
        data: `Automation ${state ? 'activated' : 'disabled'}`,
      };
    return { status: 404, data: 'Automation not found' };
  } catch (error) {
    return { status: 500, data: 'Oops! Something went wrong' };
  }
};
