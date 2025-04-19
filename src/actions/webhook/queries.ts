import { client } from '@/lib/prisma.lib';

export const matchKeyword = async (keyword: string) => {
  return await client.keyword.findFirst({
    where: {
      word: {
        equals: keyword,
        mode: 'insensitive',
      },
    },
  });
};

export const getKeywordAutomation = async (automationId: string, dm: boolean) => {
  return await client.automations.findFirst({
    where: {
      id: automationId,
    },
    include: {
      dms: dm,
      triggers: {
        where: {
          type: dm ? 'DM' : 'COMMENT',
        },
      },
      listener: true,
      User: {
        select: {
          subscription: {
            select: {
              plan: true,
            },
          },
          integrations: {
            select: {
              token: true,
            },
          },
        },
      },
    },
  });
};

export const trackResponses = async (automationId: string, type: 'COMMENT' | 'DM') => {
  if (type === 'COMMENT') {
    return await client.listener.update({
      where: {
        automationId,
      },
      data: {
        commentCount: {
          increment: 1,
        },
      },
    });
  }

  if (type === 'DM') {
    return await client.listener.update({
      where: {
        automationId,
      },
      data: {
        dmCount: {
          increment: 1,
        },
      },
    });
  }
};

export const createChatHistory = (automationId: string, senderId: string, reciever: string, message: string, systemDm: boolean) => {
  return client.automations.update({
    where: {
      id: automationId,
    },
    data: {
      dms: {
        create: {
          reciever,
          senderId,
          message,
          system_dm: systemDm,
        },
      },
    },
  });
};

export const getChatHistory = async (senderId: string, reciever: string) => {
  const automation = await client.automations.findFirst({
    where: {
      dms: {
        every: {
          AND: [{ reciever }, { senderId }],
        },
      },
    },
    include: {
      dms: true,
    },
  });

  // const dms = await client.dms.findMany({
  //   where: {
  //     AND: [{ reciever }, { senderId }],
  //   },
  //   include: {
  //     Automation: true,
  //   },
  // });

  return {
    automationId: automation.id,
    history: automation.dms,
  };
};

export const getKeywordPost = async (automationId: string, postId: string) => {
  return await client.post.findFirst({
    where: {
      AND: [{ postid: postId }, { automationId }],
    },
    select: {
      automationId: true,
    },
  });
};
