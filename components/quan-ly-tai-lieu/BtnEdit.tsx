import React, { useState, useEffect } from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import Image from 'next/image';
import Edit from './edit';
import { POST } from '@/pages/api/auth';
// const [del, setDel] = useState();
interface AppProps {
  onEditComment: () => void;
}

const App = ({
  setReload,
  reload,
  file,
  comment,
}: {
  setReload: any;
  reload: any;
  file: any;
  comment: any;
}) => {
  const delcmt = () => {
    const shouldDelete = window.confirm('Bạn có muốn xóa bình luận này không?');
    if (shouldDelete) {
      try {
        POST(
          `files/chi-tiet-tai-lieu/${file.id}/delete-comment/${comment.id}`
        ).then((res) => {
          if (res) {
            alert('Xóa bình luận thành công!');
            setReload(!reload);
          }
        });
      } catch (err) {
        alert('Xóa bình luận thất bại!');
      }
    }
  };
  const items: MenuProps['items'] = [
    {
      label: <Edit comment={comment} setReload={setReload} reload={reload} />,
      key: '0',
    },
    {
      label: <p onClick={delcmt}>Xóa bình luận</p>,
      key: '1',
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <Image
        unoptimized
        onClick={(e) => e.preventDefault()}
        alt=""
        width={15}
        height={15}
        src={'https://hungha365.com/storageimage/GV/cay_but.png'}
      />
    </Dropdown>
  );
};
export default App;
