'use server';

import { client } from '@/lib/prisma.lib';

export const getAllAutomations = async (clerkId: string) => {
  return await client.user.findUnique({
    where: {
      clerkId,
    },
    select: {
      automations: {
        orderBy: {
          createdAt: 'asc',
        },
        include: {
          keywords: true,
          listener: true,
        },
      },
    },
  });
};

export const createAutomation = async (clerkId: string) => {
  return await client.user.update({
    where: {
      clerkId,
    },
    data: {
      automations: {
        create: {},
      },
    },
  });
};

export const findAutomation = async (id: string) => {
  return await client.automations.findUnique({
    where: {
      id,
    },
    include: {
      keywords: true,
      triggers: true,
      listener: true,
      posts: true,
      User: {
        select: {
          subscription: true,
          integrations: true,
        },
      },
    },
  });
};

export const onUpdateAutomation = async (
  id: string,
  data: {
    name?: string;
    active?: boolean;
  },
) => {
  return await client.automations.update({
    where: {
      id,
    },
    data: {
      name: data.name,
      active: data.active,
    },
  });
};
