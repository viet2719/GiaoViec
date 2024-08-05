import React from 'react';
import My_document from '@/components/quan-ly-tai-lieu/My_document';
export interface PostPageAProps {}

export default function PostPage({
  selectedColor,
  isHasRole,
  setOpenKeys,
  setActiveKey,
}: {
  selectedColor: string;
  isHasRole: boolean;
  setActiveKey: Function;
  setOpenKeys: Function;
}) {
  return (
    <div>
      <My_document
        isHasRole={isHasRole}
        setActiveKey={setActiveKey}
        setOpenKeys={setOpenKeys}
        selectedColor={selectedColor}
      />
    </div>
  );
}
