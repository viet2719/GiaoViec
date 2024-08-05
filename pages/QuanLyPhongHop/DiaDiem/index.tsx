import React from 'react';
import Diadiem from '@/components/quan-ly-phong-hop/dia-diem/Diadiem';

export default function PostPage({
  selectedColor,
  isHasRole,
}: {
  selectedColor: string;
  isHasRole: boolean;
}) {
  return (
    <div>
      <Diadiem isHasRole={isHasRole} selectedColor={selectedColor} />
    </div>
  );
}
