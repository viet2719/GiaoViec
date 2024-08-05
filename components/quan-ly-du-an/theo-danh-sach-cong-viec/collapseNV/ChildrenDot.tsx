import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import SuaCV from './SuaCV';
import DelCV from './DelCV';
import { getCurrentID, getType } from '@/pages/api/auth';

const ChildrenDot = ({
  data,
  group,
  setReload,
  reload,
  roleEmployee,
  roleManager,
  project,
}: {
  data: any;
  group: any;
  setReload: any;
  reload: any;
  roleEmployee: any;
  roleManager: any;
  project: any;
}) => {
  const admin = getType() === '1';
  const employee = getCurrentID();
  const [listFunction, setListFunction] = useState<MenuProps['items']>([]);
  const listFunctionBase: MenuProps['items'] = [
    {
      label: (
        <SuaCV
          data={data}
          group={group}
          setReload={setReload}
          reload={reload}
        />
      ),
      key: '0',
    },
    {
      label: <DelCV data={data} setReload={setReload} reload={reload} />,
      key: '1',
    },
  ];

  useEffect(() => {
    const listCopy = [...listFunctionBase];
    if (!admin) {
      if (project?.project_management?.includes(employee.toString())) {
        if (!roleManager?.includes('3')) {
          let index = listCopy?.findIndex((item: any) => item?.key === '0');
          listCopy?.splice(index, 1);
        }
        if (!roleManager?.includes('8')) {
          let index = listCopy?.findIndex((item: any) => item?.key === '1');
          listCopy?.splice(index, 1);
        }
      } else {
        if (!roleEmployee?.includes('3')) {
          let index = listCopy?.findIndex((item: any) => item?.key === '0');
          listCopy?.splice(index, 1);
        }
        if (!roleEmployee?.includes('8')) {
          let index = listCopy?.findIndex((item: any) => item?.key === '1');
          listCopy?.splice(index, 1);
        }
      }
    }
    setListFunction(listCopy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleEmployee, roleManager]);

  const items: MenuProps['items'] = listFunction;
  return (
    items?.length !== 0 && (
      <Dropdown menu={{ items }} trigger={['click']}>
        <a onClick={(e) => e.preventDefault()}>
          <Image
            unoptimized
            width={27}
            height={27}
            alt=""
            src="https://hungha365.com/storageimage/GV/show_cvl.png"
            style={{ marginRight: 10 }}
          />
        </a>
      </Dropdown>
    )
  );
};

export default ChildrenDot;
