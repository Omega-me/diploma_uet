import { useState } from 'react';
import { useMutationData } from './use-mutation-data';
import { onSavePosts } from '@/actions/automation';
import { Post } from '@prisma/client';

const useAutomationPosts = (id: string) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const onSelectPost = (post: Post) => {
    setPosts(prev => {
      if (prev.find(p => p.postid === post.postid)) {
        return prev.filter(item => item.postid !== post.postid);
      }
      return [...prev, post];
    });
  };

  const { mutate, isPending, variables } = useMutationData(
    ['attach-posts'],
    () => onSavePosts(id, posts),
    ['automation-info'],
    () => setPosts([]),
  );

  return { onSelectPost, posts, mutate, isPending, variables };
};

export default useAutomationPosts;
