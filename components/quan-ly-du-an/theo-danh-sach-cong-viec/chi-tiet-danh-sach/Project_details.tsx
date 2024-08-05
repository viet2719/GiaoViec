import React, { useContext, useState, useEffect } from 'react';
import { Input, Dropdown, Space } from 'antd';
import Themcongviec from './Themmoiduan/Themcongviec';
import Themmoinhomcongviec from './Themmoiduan/Themmoinhomcongviec';
import BaCham from './BaCham';
import ChildrenDot from './collapseNV/ChildrenDot';
import MasterDot from './collapseNV/MasterDot';
import Image from 'next/image';
import {
  convertDateFormat,
  calculateTaskStatusG,
  calculateTaskStatusJ,
} from '@/utils/dataUtils';
// import styles from "./Project_details.module.css"
import styles from './Project_details.module.css';
import { POST } from '@/pages/api/auth';
import { ListEpContext } from '@/components/context/listEpContext';
import { getCurrentID, getType } from '@/pages/api/auth';

export default function Project_details({
  setActiveKey,
  setOpenKeys,
  isHasRole,
  selectedColor,
  setIdProject,
  item,
}: {
  isHasRole: boolean;
  setActiveKey: Function;
  setOpenKeys: Function;
  selectedColor: string;
  setIdProject: Function;
  item: any;
}) {
  const prject = localStorage.getItem('project');

  const listEp = useContext(ListEpContext);
  const [project, setProject]: any = useState(JSON.parse(String(prject)));
  const [listGroup, setListGroup] = useState<any>([]);
  const [newGroup, setNewGroup]: any = useState([]);
  const [group, setGroup]: any = useState({});
  const [reload, setReload] = useState(false);
  const [chooseID, setChooseID] = useState<number[]>([]);
  const [roleManager, setRoleManager] = useState<any>([]);
  const [roleEmployee, setRoleEmployee] = useState<any>([]);
  const admin = getType() === '1';
  const employee = getCurrentID();
  const [listFunction, setListFunction]: any = useState([]);

  const toggleShowChildren = (id: any) => {
    setGroup({ ...listGroup.filter((data: any) => data?.id == id) });
    if (chooseID?.includes(id)) {
      setChooseID(chooseID?.filter((data: any) => data !== id));
    } else {
      setChooseID([...chooseID, id]);
    }
  };

  const [rotate, setRotate] = useState(false);
  const handleImageClick = () => {
    setRotate(!rotate);
  };
  const onClick = (info: any, dt: any) => {
    // setDetailJob(dt);
    localStorage.setItem('detailJob', JSON.stringify(dt));
    setActiveKey(info?.key);
    info?.key === 'trang-chu' ? setOpenKeys([]) : null;
  };
  const renderApplyKey = () => {
    setActiveKey('theo-danh-sach-cong-viec');
  };
  const { Search } = Input;

  const onSearch = (e: any) => {
    const search = e.target.value.toLowerCase();
    setNewGroup(
      listGroup.filter((val: any) => {
        return val?.name?.toLowerCase().includes(search);
      })
    );
    // Do something with the filtered array 'newarray'
  };
  useEffect(() => {
    try {
      POST(
        `projects/chi-tiet-du-an-theo-danh-sach-cong-viec/${project.project_id}`
      ).then((res) => {
        setNewGroup(res?.data.jobDetail);
        setListGroup(res?.data.jobDetail);
        setProject(res?.data?.project);
      });
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  useEffect(() => {
    POST(`showRoleProject`).then((res) => {
      setRoleEmployee(res?.result[0]?.permission_project);
      setRoleManager(res?.result[1]?.permission_project);
    });
  }, []);

  const listFunctionBase = [
    {
      label: (
        <Themmoinhomcongviec
          listEp={listEp}
          item={project}
          project={project}
          setReload={setReload}
          reload={reload}
        />
      ),
      key: '0',
    },
    {
      label: (
        <Themcongviec
          listEp={listEp}
          item={project}
          project={project}
          setReload={setReload}
          reload={reload}
        />
      ),
      key: '1',
    },
  ];

  useEffect(() => {
    var listCopy = [...listFunctionBase];
    if (!admin) {
      if (project?.project_management?.includes(employee.toString())) {
        if (!roleManager?.includes('1')) {
          let index = listCopy?.findIndex((item: any) => item?.key === '0');
          listCopy?.splice(index, 1);
        }
        if (!roleManager?.includes('2')) {
          let index = listCopy?.findIndex((item: any) => item?.key === '1');
          listCopy?.splice(index, 1);
        }
      } else {
        if (!roleEmployee?.includes('1')) {
          let index = listCopy?.findIndex((item: any) => item?.key === '0');
          listCopy?.splice(index, 1);
        }
        if (!roleEmployee?.includes('2')) {
          let index = listCopy?.findIndex((item: any) => item?.key === '1');
          listCopy?.splice(index, 1);
        }
      }
    }
    setListFunction(listCopy);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleEmployee, roleManager]);

  const items = listFunction;
  return (
    <div className={styles.detail_work}>
      <div className="margin_px">
        <div className="detail_work">
          <div className="text_name_work">
            <div className="name_detail">
              <Image
                unoptimized
                width={7}
                height={13}
                alt=""
                className="img_back"
                src="https://hungha365.com/storageimage/GV/img_back.png"
              />
              <h4 onClick={renderApplyKey} style={{ cursor: 'pointer' }}>
                {project?.project_name}{' '}
                {project?.type === 1 && project?.open_or_close === 1
                  ? '(Dự án thành công)'
                  : ''}{' '}
                {project?.type === 2 && project?.open_or_close === 1
                  ? '(Dự án thất bại)'
                  : ''}
              </h4>
            </div>
            <BaCham
              setOpenKeys={setActiveKey}
              setActiveKey={setActiveKey}
              item={project}
              setReload={setReload}
              reload={reload}
              project={project}
              roleEmployee={roleEmployee}
              roleManager={roleManager}
            />
            <div></div>
          </div>
          <div className="content">
            {isHasRole ? (
              <div>
                <div className="f_search">
                  {items.length !== 0 && (
                    <Dropdown
                      className="drop"
                      menu={{ items }}
                      trigger={['click']}
                    >
                      <a onClick={(e) => e.preventDefault()}>
                        <Space>+ Thêm mới</Space>
                      </a>
                    </Dropdown>
                  )}
                  <div className="search_gr">
                    <Search
                      placeholder="Tìm kiếm nhóm công việc"
                      onChange={onSearch}
                    />
                  </div>
                </div>
                <div className="content_work_dsda">
                  <div className="show_list_dsda">
                    <div className="show_list_cvl">
                      <div
                        className="colap"
                        style={{
                          width: '100%',
                          overflowX: 'auto',
                          height: 1000,
                        }}
                      >
                        {newGroup?.map((itm: any, id: any) => (
                          <div key={id}>
                            <div className="master">
                              <div
                                onClick={() => toggleShowChildren(itm?.id)}
                                className="name__cv"
                              >
                                <p onClick={handleImageClick}>{itm.name}</p>
                              </div>
                              <div>
                                <p
                                  className="start_work"
                                  style={{ padding: 0 }}
                                >
                                  {itm.date_start}
                                </p>
                                <p className="end_work">{itm.date_end}</p>
                              </div>
                              <p>{calculateTaskStatusG(itm)}</p>
                              <Image
                                unoptimized
                                width={33}
                                height={33}
                                alt=""
                                src={'/el.png'}
                              />
                              <div>
                                <MasterDot
                                  group={itm}
                                  listEp={listEp}
                                  project={project}
                                  setReload={setReload}
                                  reload={reload}
                                  roleManager={roleManager}
                                  roleEmployee={roleEmployee}
                                />
                              </div>
                            </div>

                            <div>
                              {itm?.job?.map(
                                (dt: any, index: number) =>
                                  chooseID?.includes(itm?.id) && (
                                    <div className="children" key={index}>
                                      <div>
                                        <p
                                          key={'xem-chi-tiet-theo-danh-sach'}
                                          onClick={() =>
                                            onClick(
                                              {
                                                key: 'xem-chi-tiet-theo-danh-sach',
                                              },
                                              dt
                                            )
                                          }
                                          className="name__chil"
                                        >
                                          {/* <Image
              unoptimized width={16} height={16} alt='' src={''} style={{marginRight:10}}/> */}
                                          {dt?.job_name}
                                        </p>
                                        <p className="the_da">
                                          {dt.job_card.includes(2) && (
                                            <span className="kc">Khẩn cấp</span>
                                          )}
                                          {dt.job_card.includes(1) && (
                                            <span className="qt">
                                              Quan trọng
                                            </span>
                                          )}
                                        </p>
                                        <br></br>
                                      </div>
                                      <div>
                                        <p className="start_work">
                                          {dt?.date_start}
                                        </p>
                                        <p className="end_work">
                                          {dt?.date_end}
                                        </p>
                                      </div>
                                      <p>{calculateTaskStatusJ(dt)}</p>
                                      <Image
                                        unoptimized
                                        width={33}
                                        height={33}
                                        alt=""
                                        src={'/el.png'}
                                      />
                                      <ChildrenDot
                                        data={dt}
                                        group={group}
                                        setReload={setReload}
                                        reload={reload}
                                        roleManager={roleManager}
                                        roleEmployee={roleEmployee}
                                        project={project}
                                      />
                                    </div>
                                  )
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="f_search">
                  {items.length !== 0 && (
                    <Dropdown
                      className="drop"
                      menu={{ items }}
                      trigger={['click']}
                    >
                      <a onClick={(e) => e.preventDefault()}>
                        <Space>+ Thêm mới</Space>
                      </a>
                    </Dropdown>
                  )}
                  <div className="search_gr">
                    <Search
                      placeholder="Tìm kiếm nhóm công việc"
                      onChange={onSearch}
                    />
                  </div>
                </div>
                <div className="content_work_dsda">
                  <div className="show_list_dsda">
                    <div className="show_list_cvl">
                      <div
                        className="colap"
                        style={{
                          width: '100%',
                          overflowX: 'auto',
                          height: 1000,
                        }}
                      >
                        {newGroup?.map((itm: any, id: any) => (
                          <div key={id}>
                            <div className="master">
                              <div
                                onClick={() => toggleShowChildren(itm?.id)}
                                className="name__cv"
                              >
                                <p onClick={handleImageClick}>{itm.name}</p>
                              </div>
                              <div>
                                <p
                                  className="start_work"
                                  style={{ padding: 0 }}
                                >
                                  {itm.date_start}
                                </p>
                                <p className="end_work">{itm.date_end}</p>
                              </div>
                              <p>{calculateTaskStatusG(itm)}</p>
                              <Image
                                unoptimized
                                width={33}
                                height={33}
                                alt=""
                                src={'/el.png'}
                              />
                              <div>
                                <MasterDot
                                  group={itm}
                                  listEp={listEp}
                                  project={project}
                                  setReload={setReload}
                                  reload={reload}
                                  roleManager={roleManager}
                                  roleEmployee={roleEmployee}
                                />
                              </div>
                            </div>

                            <div>
                              {itm?.job?.map(
                                (dt: any, index: number) =>
                                  chooseID?.includes(itm?.id) && (
                                    <div className="children" key={index}>
                                      <div>
                                        <p
                                          key={'xem-chi-tiet-theo-danh-sach'}
                                          onClick={() =>
                                            onClick(
                                              {
                                                key: 'xem-chi-tiet-theo-danh-sach',
                                              },
                                              dt
                                            )
                                          }
                                          className="name__chil"
                                        >
                                          {/* <Image
              unoptimized width={16} height={16} alt='' src={''} style={{marginRight:10}}/> */}
                                          {dt?.job_name}
                                        </p>
                                        <p className="the_da">
                                          {dt.job_card.includes(2) && (
                                            <span className="kc">Khẩn cấp</span>
                                          )}
                                          {dt.job_card.includes(1) && (
                                            <span className="qt">
                                              Quan trọng
                                            </span>
                                          )}
                                        </p>
                                        <br></br>
                                      </div>
                                      <div>
                                        <p className="start_work">
                                          {dt?.date_start}
                                        </p>
                                        <p className="end_work">
                                          {dt?.date_end}
                                        </p>
                                      </div>
                                      <p>{calculateTaskStatusJ(dt)}</p>
                                      <Image
                                        unoptimized
                                        width={33}
                                        height={33}
                                        alt=""
                                        src={'/el.png'}
                                      />
                                      <ChildrenDot
                                        data={dt}
                                        group={group}
                                        setReload={setReload}
                                        reload={reload}
                                        roleManager={roleManager}
                                        roleEmployee={roleEmployee}
                                        project={project}
                                      />
                                    </div>
                                  )
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
