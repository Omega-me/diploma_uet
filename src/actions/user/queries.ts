import { client } from '@/lib/prisma.lib';

export const findUser = async (clerkId: string) => {
  return await client.user.findUnique({
    where: {
      clerkId,
    },
    include: {
      subscription: true,
      integrations: {
        select: {
          id: true,
          token: true,
          expiresAt: true,
          name: true,
        },
      },
    },
  });
};

export const createUser = async (data: { clerkId: string; firstname: string; lastname: string; email: string }) => {
  return await client.user.create({
    data: {
      ...data,
      subscription: {
        create: {},
      },
    },
    select: {
      firstname: true,
      lastname: true,
      clerkId: true,
    },
  });
};
