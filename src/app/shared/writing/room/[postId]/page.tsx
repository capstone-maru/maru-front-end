import { WritingPostPage } from '@/app/pages';

export default function Page({
  params: { postId },
}: {
  params: { postId: string };
}) {
  return <WritingPostPage type="hasRoom" postId={+postId} />;
}
