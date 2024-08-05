import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import Add_CV from './Add_CV';
import Xemchitiet from './Xemchitiet';
import Edit_nhomcv from './Edit_nhomcv';
import Del_ncv from './Del_ncv';
import { getCurrentID, getType } from '@/pages/api/auth';

const MasterDot = ({
  group,
  listEp,
  project,
  setReload,
  reload,
  roleManager,
  roleEmployee,
}: {
  group: any;
  listEp: any;
  project: any;
  setReload: any;
  reload: any;
  roleManager: any;
  roleEmployee: any;
}) => {
  const [itemGroup, setItemGroup] = useState(group);
  const admin = getType() === '1';
  const employee = getCurrentID();
  const [reloadCT, setReloadCT] = useState(false);
  const [listFunction, setListFunction]: any = useState([]);
  const startClick = (group: any) => {
    setItemGroup(group);
  };

  const listFunctionBase: MenuProps['items'] = [
    {
      label: (
        <Add_CV
          itemGroup={itemGroup}
          listEp={listEp}
          project={project}
          setReload={setReload}
          reload={reload}
        />
      ),
      key: '0',
    },
    {
      label: (
        <Xemchitiet
          itemGroup={itemGroup}
          listEp={listEp}
          project={project}
          reload={reloadCT}
          setReload={setReloadCT}
        />
      ),
      key: '1',
    },
    {
      label: (
        <Edit_nhomcv
          itemGroup={itemGroup}
          listEp={listEp}
          project={project}
          setReload={setReload}
          reload={reload}
        />
      ),
      key: '2',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <Del_ncv itemGroup={itemGroup} setReload={setReload} reload={reload} />
      ),
      key: '3',
    },
  ];
  useEffect(() => {
    var listCopy = [...listFunctionBase];
    if (!admin) {
      if (project?.project_management?.includes(employee.toString())) {
        if (!roleManager?.includes('5')) {
          let index = listCopy?.findIndex((item: any) => item?.key === '2');
          listCopy?.splice(index, 1);
        }
        if (!roleManager?.includes('2')) {
          let index = listCopy?.findIndex((item: any) => item?.key === '0');
          listCopy?.splice(index, 1);
        }
        if (!roleManager?.includes('8')) {
          let index = listCopy?.findIndex((item: any) => item?.key === '3');
          listCopy?.splice(index, 1);
        }
      } else {
        if (!roleEmployee?.includes('2')) {
          let index = listCopy?.findIndex((item: any) => item?.key === '0');
          listCopy?.splice(index, 1);
        }
        if (!roleEmployee?.includes('5')) {
          let index = listCopy?.findIndex((item: any) => item?.key === '2');
          listCopy?.splice(index, 1);
        }
        if (!roleEmployee?.includes('8')) {
          let index = listCopy?.findIndex((item: any) => item?.key === '3');
          listCopy?.splice(index, 1);
        }
      }
    }
    setListFunction(listCopy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemGroup]);

  const items: MenuProps['items'] = listFunction;

  return (
    <Dropdown
      menu={{ items }}
      trigger={['click']}
      onOpenChange={() => startClick(group)}
    >
      <a>
        <Image
          unoptimized
          width={27}
          height={27}
          alt=""
          src="https://hungha365.com/storageimage/GV/show_cvl.png"
        />
      </a>
    </Dropdown>
  );
};

export default MasterDot;
