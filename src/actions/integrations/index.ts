'use server';

import { redirect } from 'next/navigation';

export const onOAuthInstagram = async (startegy: 'INSTAGRAM' | 'CRM') => {
  if (startegy === 'INSTAGRAM') {
    return redirect(process.env.INSTAGRAM_EMBED_OAUTH_URL as string);
  }
};
