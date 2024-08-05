import React from 'react';
import Phonghop from '@/components/quan-ly-phong-hop/Phonghop';

export default function PostPage({
  selectedColor,
  isHasRole,
}: {
  selectedColor: string;
  isHasRole: boolean;
}) {
  return (
    <div>
      <Phonghop isHasRole={isHasRole} selectedColor={selectedColor} />
    </div>
  );
}
