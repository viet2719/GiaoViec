import React from 'react';
import PhongHop from '@/components/quan-ly-phong-hop/phong-hop/PhongHop';

export default function PostPage({
  selectedColor,
  isHasRole,
}: {
  selectedColor: string;
  isHasRole: boolean;
}) {
  return (
    <div>
      <PhongHop isHasRole={isHasRole} selectedColor={selectedColor} />
    </div>
  );
}
