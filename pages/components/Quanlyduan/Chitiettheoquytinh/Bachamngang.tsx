import React from 'react';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import Image from 'next/image';
import Chinhsuaquytrinh from './detail_modal/chinhsuaquytrinh/Chinhsuaquytrinh';
import Themgiaidoan from './detail_modal/danhgiagiaidoan/Themgiaidoan';
import Themnhiemvu from './detail_modal/Themnhiemvu/Themnhiemvu';
import Dongda from './detail_modal/Dongda/Dongda';
import Chinhsuaphanquyen from './detail_modal/Chinhsuaphanquyen/Chinhsuaphanquyen';
import Danhsachnguoitheodoi from './detail_modal/Danhsachnguoitheodoi/Danhsachnguoitheodoi';
import Quanlytruongtuychinh from './detail_modal/thêm trường tùy chỉnh/Quanlytruongtuychinh';
import Xoaquytrinh from './detail_modal/Xoaquytrinh';
import { Follow } from '@/store/actions/stagesActions';

export default function Bachamngang() {
  const items: MenuProps['items'] = [
    {
      label: <Chinhsuaquytrinh />,

      key: '0',
    },
    {
      label: <Themgiaidoan />,
      key: '1',
    },
    {
      label: <Themnhiemvu />,
      key: '2',
    },
    {
      label: <Dongda />,
      key: '3',
    },
    {
      label: <Chinhsuaphanquyen />,
      key: '4',
    },
    {
      label: <Danhsachnguoitheodoi />,
      key: '5',
    },
    {
      label: <Quanlytruongtuychinh />,
      key: '6',
    },
    {
      label: <Xoaquytrinh />,
      key: '7',
    },
  ];
  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <Image
        unoptimized
        width={26}
        height={26}
        alt=""
        src="https://hungha365.com/storageimage/GV/anh103.png"
        onClick={(e) => e.preventDefault()}
      />
    </Dropdown>
  );
}
