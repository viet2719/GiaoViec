import React from 'react';
import Image from 'next/image';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import Suanhiemvu from './Suanhiemvu';
import Xoanv from './Xoanv';
import { Task } from '@/store/actions/stagesActions';

export default function App(props: { task: Task }) {
  const items: MenuProps['items'] = [
    {
      label: <Suanhiemvu />,
      key: '0',
    },
    {
      label: <Xoanv task={props.task} />,
      key: '1',
    },
  ];
  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <a onClick={(e) => e.preventDefault()}>
        <Image
          unoptimized
          width={13}
          height={4}
          alt=""
          src="https://hungha365.com/storageimage/GV/cham_ngang.png"
          style={{ marginRight: 10 }}
        />
      </a>
    </Dropdown>
  );
}
