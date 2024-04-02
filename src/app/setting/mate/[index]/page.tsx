import { SettingPage } from '@/app/pages';

export default function Page({
  params: { index },
}: {
  params: { index: string };
}) {
  return <SettingPage type="메이트" index={index} />;
}
