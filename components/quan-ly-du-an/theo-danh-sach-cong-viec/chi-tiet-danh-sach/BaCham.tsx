import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import Sua_da from './Sua_da';
import Del_duan from './Del_duan';
import Dong_da from './Dong_da';
import Follower_list_modal from './Dsnguoitheodoi';
import Thietlapcvll from './Thietlapcvll';
import Suaphanquyen from './Suaphanquyen';
import { useContext } from 'react';
import { ListEpContext } from '@/components/context/listEpContext';
import { getCurrentID, getType } from '@/pages/api/auth';

const BaCham: React.FC<{
  setActiveKey: Function;
  setOpenKeys: Function;
  item: any;
  setReload: any;
  reload: any;
  project: any;
  roleEmployee: any;
  roleManager: any;
}> = ({
  setActiveKey,
  setOpenKeys,
  item,
  setReload,
  reload,
  project,
  roleEmployee,
  roleManager,
}) => {
  const onClick = (info: any) => {
    setActiveKey(info?.key);
    info?.key === 'trang-chu' ? setOpenKeys([]) : null;
  };
  const admin = getType() === '1';
  const employee = getCurrentID();
  const [listFunction, setListFunction]: any = useState([]);

  const listEp = useContext(ListEpContext);
  const listFunctionBase: MenuProps['items'] = [
    {
      label: <Sua_da item={item} reload={reload} setReload={setReload} />,

      key: '0',
    },
    {
      label: <Dong_da item={item} reload={reload} setReload={setReload} />,
      key: '1',
    },
    {
      label: <Suaphanquyen setReload={setReload} reload={reload} />,
      key: '2',
    },
    {
      label: <Thietlapcvll listEp={listEp} item={item} />,
      key: '3',
    },
    {
      label: (
        <p className="cv_dot" style={{ margin: 0, cursor: 'pointer' }}>
          <span
            key={'c'}
            onClick={() => onClick({ key: 'danh-sach-cong-viec-lap-lai' })}
          >
            <Image
              unoptimized
              width={18}
              height={18}
              alt=""
              src="https://hungha365.com/storageimage/GV/add_laplai.png"
              style={{ marginRight: 10 }}
            />
            Danh sách công việc lặp lại
          </span>
        </p>
      ),
      key: '4',
    },

    {
      label: <Follower_list_modal item={item} />,
      key: '5',
    },
    {
      label: <Del_duan item={item} />,
      key: '6',
    },
  ];

  useEffect(() => {
    var listCopy = [...listFunctionBase];
    if (!admin) {
      if (!project?.project_management?.includes(employee.toString())) {
        listCopy = [
          {
            label: <Follower_list_modal item={item} />,
            key: '5',
          },
        ];
      } else {
        [
          {
            label: (
              <Dong_da item={item} reload={reload} setReload={setReload} />
            ),
            key: '1',
          },
          {
            label: <Suaphanquyen setReload={setReload} reload={reload} />,
            key: '2',
          },
          {
            label: <Thietlapcvll listEp={listEp} item={item} />,
            key: '3',
          },
          {
            label: (
              <p className="cv_dot" style={{ margin: 0, cursor: 'pointer' }}>
                <span
                  key={'c'}
                  onClick={() =>
                    onClick({ key: 'danh-sach-cong-viec-lap-lai' })
                  }
                >
                  <Image
                    unoptimized
                    width={18}
                    height={18}
                    alt=""
                    src="https://hungha365.com/storageimage/GV/add_laplai.png"
                    style={{ marginRight: 10 }}
                  />
                  Danh sách công việc lặp lại
                </span>
              </p>
            ),
            key: '4',
          },

          {
            label: <Follower_list_modal item={item} />,
            key: '5',
          },
          {
            label: <Del_duan item={item} />,
            key: '6',
          },
        ];
      }
    }

    setListFunction(listCopy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleEmployee, roleManager]);
  const items: MenuProps['items'] = listFunction;

  return (
    <div>
      <Dropdown menu={{ items }} trigger={['click']} className="img_dot">
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Image
              unoptimized
              width={22}
              height={22}
              alt=""
              src="https://hungha365.com/storageimage/GV/anh103.png"
            />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};
export default BaCham;
