import React from 'react';
type Props = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: Props) {
  return <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>{children}</main>;
}
