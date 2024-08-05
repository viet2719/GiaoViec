import React, { useEffect, useState, useContext } from 'react';
import Image from 'next/image';

import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import Link from 'next/link';
import EditMeeting from './EditMeeting';
import Phanquyen from './Phanquyen';
import XuatExcel from './XuatExcel';
import Caidattinnhan from './Caidattinnhan';
import Huycuochop from './Huycuochop';
import Xoacuochop from './Xoacuochop';
import { elements } from 'chart.js';
import { getCurrentID, getType } from '@/pages/api/auth';
import { RoleMeetingContext } from '@/utils/constantContext';

const App = ({
  data,
  meetingRole,
  setActiveKey,
  listDep,
  listEmp,
  listRoom,
  setReload,
}: {
  data: any;
  meetingRole: any[];
  setActiveKey: Function;
  listDep: any[];
  listEmp: any[];
  listRoom: any[];
  setReload: Function;
}) => {
  // const { role, setRole } = useContext(RoleMeetingContext);
  const [role, setRole] = useState(1);
  //const role=''
  const admin = getType() === '1';
  const [authOwn, setAuthOwn] = useState<String>('');
  const [authTakeIn, setAuthTakeIn] = useState<String>('');
  // người chủ trì
  // const userOwn = 1577142
  // const userTakeIn = 1577142
  // người tham gia
  const userOwn = getCurrentID();
  const userTakeIn = getCurrentID();
  const [listFunction, setListFunction]: any = useState([]);
  const listFunctionBase = [
    {
      label: (
        <EditMeeting
          data={data}
          listDep={listDep}
          listEmp={listEmp}
          listRoom={listRoom}
          setReload={setReload}
        />
      ),
      key: '0',
    },
    {
      label: <Phanquyen setReload={setReload} meetingRole={meetingRole} />,
      key: '1',
    },
    {
      label: <XuatExcel id={data?.id} />,
      key: '2',
    },
    {
      label: <Caidattinnhan />,
      key: '3',
    },
    {
      label: <Huycuochop setActiveKey={setActiveKey} />,
      key: '4',
    },
    {
      label: <Xoacuochop setActiveKey={setActiveKey} />,
      key: '5',
    },
  ];
  useEffect(() => {
    setAuthOwn(
      meetingRole?.filter((dt: any) => dt?.role_id === 1)[0]?.permission_meet_id
    );
    setAuthTakeIn(
      meetingRole?.filter((dt: any) => dt?.role_id === 2)[0]?.permission_meet_id
    );
  }, [meetingRole]);
  useEffect(() => {
    const listCopy = [...listFunctionBase];
    if (data?.is_cancel === 1) {
      let index = listCopy?.findIndex((item: any) => item?.key === '4');
      listCopy?.splice(index, 1);
    }
    if (!admin) {
      if (role !== 3) {
        let index = listCopy?.findIndex((item: any) => item?.key === '0');
        listCopy?.splice(index, 1);
      }
      if (role !== 4) {
        let index = listCopy?.findIndex((item: any) => item?.key === '5');
        listCopy?.splice(index, 1);
      }
      if (
        data?.staff_owner?.includes(userOwn.toString()) ||
        data?.staff_take_in?.includes(userTakeIn.toString())
      ) {
        if (data?.staff_owner?.includes(userOwn.toString())) {
          if (!authOwn?.includes('3')) {
            let index = listCopy?.findIndex((item: any) => item?.key === '3');
            listCopy?.splice(index, 1);
          }
          if (!authOwn?.includes('4')) {
            let index = listCopy?.findIndex((item: any) => item?.key === '4');
            listCopy?.splice(index, 1);
          }
        }
        if (data?.staff_take_in?.includes(userTakeIn.toString())) {
          if (!authTakeIn?.includes('3')) {
            let index = listCopy?.findIndex((item: any) => item?.key === '3');
            listCopy?.splice(index, 1);
          }
          if (!authTakeIn?.includes('4')) {
            let index = listCopy?.findIndex((item: any) => item?.key === '4');
            listCopy?.splice(index, 1);
          }
        }
      } else {
        listFunctionBase?.forEach((element: any) => {
          if (!'1,2'.includes(element?.key)) {
            let index = listCopy?.findIndex(
              (item: any) => item?.key === element?.key
            );
            if (index !== -1) {
              listCopy?.splice(index, 1);
            }
          }
        });
      }
    }
    setListFunction(listCopy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    data?.staff_owner,
    data?.staff_take_in,
    data?.is_cancel,
    listRoom,
    authOwn,
    authTakeIn,
  ]);
  const items: MenuProps['items'] = listFunction;

  return (
    <Dropdown menu={{ items }} trigger={['click']} className="img_dot">
      <a onClick={(e) => e.preventDefault()}>
        <Image
          unoptimized
          width={26}
          height={26}
          alt=""
          src="https://hungha365.com/storageimage/GV/anh103.png"
        />
      </a>
    </Dropdown>
  );
};

export default App;
