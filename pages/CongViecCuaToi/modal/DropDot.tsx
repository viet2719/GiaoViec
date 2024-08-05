import React from 'react';
import Image from 'next/image';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import EditCV from './EditCV';
import DelCV from './DelCV';

const App: React.FC<any> = ({
  type,
  id,
  data,
  setReload,
  reload,
  message,
}: {
  type: string;
  id: number;
  data: any;
  setReload: Function;
  reload: boolean;
  message: string;
}) => {
  const items: MenuProps['items'] = [
    {
      label: (
        <EditCV
          type={type}
          data={data}
          id={id}
          setReload={setReload}
          reload={reload}
          message={message}
        />
      ),
      key: '0',
    },

    {
      type: 'divider',
    },
    {
      label: (
        <DelCV
          type={type}
          data={data}
          id={id}
          setReload={setReload}
          reload={reload}
        />
      ),
      key: '2',
    },
  ];
  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <Image
        unoptimized
        style={{ cursor: 'pointer' }}
        onClick={(e) => e.preventDefault()}
        width={18}
        height={4}
        alt="cham"
        src={'/cham_ngang.png'}
      />
    </Dropdown>
  );
};

export default App;
