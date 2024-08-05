import React from 'react';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';

import TrucTiep from './TrucTiep';
import TrucTuyen from './TrucTuyen';

const AddMeeting = ({
  selectedColor,
  listDep,
  listEmp,
  listRoom,
  setReload,
}: {
  selectedColor: string;
  listDep: any[];
  listEmp: any[];
  listRoom: any[];
  setReload: Function;
}) => {
  const items: MenuProps['items'] = [
    {
      label: (
        <TrucTiep
          listDep={listDep}
          listEmp={listEmp}
          listRoom={listRoom}
          setReload={setReload}
        />
      ),

      key: '0',
    },
    {
      label: (
        <TrucTuyen listDep={listDep} listEmp={listEmp} setReload={setReload} />
      ),
      key: '1',
    },
  ];
  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <a onClick={(e) => e.preventDefault()}>
        <button className={` add_work ${selectedColor}`}>+ Thêm mới</button>
      </a>
    </Dropdown>
  );
};

export default AddMeeting;
