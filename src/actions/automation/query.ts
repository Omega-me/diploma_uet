'use server';

import { client } from '@/lib/prisma.lib';
import { ListenerType } from '@prisma/client';

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
  }
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

export const addListener = async (automationId: string, listener: 'SMARTAI' | 'MESSAGE', prompt: string, reply?: string) => {
  return await client.automations.update({
    where: {
      id: automationId,
    },
    data: {
      listener: {
        create: {
          listener,
          prompt,
          commentReply: reply,
          commentCount: 0,
          dmCount: 0,
        },
      },
    },
  });
};

export const addTrigger = async (automationId: string, trigger: string[]) => {
  if (trigger.length === 2) {
    return await client.automations.update({
      where: {
        id: automationId,
      },
      data: {
        triggers: {
          createMany: {
            data: [
              {
                type: trigger[0],
              },
              {
                type: trigger[1],
              },
            ],
          },
        },
      },
    });
  }
  return await client.automations.update({
    where: {
      id: automationId,
    },
    data: {
      triggers: {
        create: {
          type: trigger[0],
        },
      },
    },
  });
};

export const addKeyword = async (automationId: string, keyword: string) => {
  return await client.automations.update({
    where: {
      id: automationId,
    },
    data: {
      keywords: {
        create: {
          word: keyword,
        },
      },
    },
  });
};

export const deleteKeyword = async (id: string) => {
  return await client.keyword.delete({
    where: {
      id,
    },
  });
};
