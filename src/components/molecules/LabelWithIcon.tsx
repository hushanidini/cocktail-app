import React from 'react';

type LabelWithIconPropsProps = {
  Icon: React.ElementType;
  label: string;
  bgColorClass?: string;
  textColorClass?: string;
};
export default function LabelWithIcon({
  Icon,
  label,
  bgColorClass = 'w-4 h-4 ',
  textColorClass = 'text-neutral-500'
}: LabelWithIconPropsProps) {
  return (
    <div className='flex items-center gap-2'>
      <Icon className={`flex-shrink-0 ${bgColorClass}`} />
      <p className={`text-md ${textColorClass}`}>{label}</p>
    </div>
  );
}
