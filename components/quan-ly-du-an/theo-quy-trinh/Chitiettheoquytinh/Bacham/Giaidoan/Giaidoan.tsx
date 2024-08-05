import React from 'react';
import Image from 'next/image';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import Chinhsuagiaidoan from './Chinhsuagiaidoan';
import Danhgiagiaidoan from './Danhgiagiaidoan';
import Xoagiaidoan from './Xoagiaidoan';
import Quanlytuychon from './Quanlytuychon';
import { Stage } from '@/store/actions/stagesActions';

export default function App(props: { stage: Stage }) {
  const items: MenuProps['items'] = [
    {
      label: <Chinhsuagiaidoan stage={props.stage} />,
      key: '0',
    },
    {
      label: <Danhgiagiaidoan />,
      key: '1',
    },
    {
      label: <Xoagiaidoan stage={props.stage} />,
      key: '2',
    },
    {
      label: <Quanlytuychon />,
      key: '3',
    },
  ];
  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <a
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <Image
          unoptimized
          width={4}
          height={13}
          alt=""
          src="https://hungha365.com/storageimage/GV/3cham.png"
          style={{ marginRight: 10 }}
        />
      </a>
    </Dropdown>
  );
}
