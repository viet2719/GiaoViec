import React, { useEffect, useRef, useState } from 'react';
import styles from './abc.module.css';

import Image from 'next/image';
import {
  Collapse,
  CollapseProps,
  Drawer,
  DrawerProps,
  Dropdown,
  Menu,
} from 'antd';
import Sidebar from '../sidebar/Sidebar';
import Nav_an from './Nav_an';
import { getCurrentID, getName } from '@/pages/api/auth';
import Cookies from 'js-cookie';
export interface NavbarProp {}

export default function Navbar({
  activeKey,
  setActiveKey,
  openKeys,
  onOpenChange,
  setOpenKeys,
  isHasRole,
  setIsHasRole,
  selectedColor,
}: {
  activeKey: any;
  setActiveKey: Function;
  openKeys: any;
  onOpenChange: any;
  setOpenKeys: Function;
  isHasRole: boolean;
  setIsHasRole: Function;
  selectedColor: string;
}) {
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const handleLogoutClick = () => {
    setLogoutModalOpen(!isLogoutModalOpen);
  };

  const handleCancelClick = () => {
    Cookies.remove('token_base365');
    Cookies.remove('rf_token');
    Cookies.remove('role');
    Cookies.remove('userID');
    Cookies.remove('userName');
    Cookies.remove('com_id');
    Cookies.remove('inForUser');
    window.location.href = '/giao-viec';
    setLogoutModalOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const onClick = (info: any) => {
    setActiveKey(info?.key);
    info?.key === 'trang-chu' ? setOpenKeys([]) : null;
  };

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps['placement']>('left');

  const showDrawer = () => {
    setOpen(true);
    setSidebarOpen(false); // Ẩn thanh bên khi ngăn mở được hiển thị
  };

  const onClose = () => {
    setOpen(false);
    setSidebarOpen(true); // Hiển thị thanh bên khi ngăn đóng được đóng lại
  };

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <div onClick={toggleSidebar}>
          {isSidebarOpen ? (
            <Image
              unoptimized
              width={25}
              height={25}
              alt=""
              src="https://hungha365.com/storageimage/GV/angles-right-solid.svg"
              style={{ color: '#fff' }}
              onClick={showDrawer}
            />
          ) : (
            <Image
              unoptimized
              width={25}
              height={25}
              alt=""
              src="https://hungha365.com/storageimage/GV/x-solid.svg"
              style={{ color: '#fff' }}
              onClick={onClose}
            />
          )}
        </div>
      ),
      children: (
        <Sidebar
          selectedColor={selectedColor}
          isHasRole={isHasRole}
          setIsHasRole={setIsHasRole}
          activeKey={activeKey}
          setActiveKey={setActiveKey}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          setOpenKeys={setOpenKeys}
          setSidebarOpen={setSidebarOpen}
        />
      ),
    },
  ];

  const sidebarRef = useRef<HTMLDivElement | null>(null); // Tạo một ref để tham chiếu đến phần tử thanh bên

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        // Sự kiện nhấp chuột xảy ra bên ngoài của thanh bên
        setSidebarOpen(false);
      }
    };

    // Thêm trình lắng nghe sự kiện khi thành phần được mount
    document.addEventListener('click', handleClickOutside);

    // Gỡ bỏ trình lắng nghe sự kiện khi thành phần bị unmount để ngăn rò rỉ bộ nhớ
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  console.log(activeKey);
  return (
    <>
      {/* <div onClick={showDrawer} className={styles.overLay}></div> */}

      <div className="magin_20" style={{ height: '96%', margin: '2%' }}>
        <div
          ref={sidebarRef}
          className={styles.menu_an}
          style={{ justifyContent: 'space-between' }}
        >
          <div>
            <Nav_an
              selectedColor={selectedColor}
              isHasRole={isHasRole}
              setIsHasRole={setIsHasRole}
              activeKey={activeKey}
              setActiveKey={setActiveKey}
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              setOpenKeys={setOpenKeys}
            />
          </div>
          <div style={{ fill: '#fff' }}>
            <Dropdown
              overlay={
                <Menu className={styles.dropdown}>
                  <Menu.Item
                    key="1"
                    className={styles.popup_name}
                    style={{ display: 'block' }}
                  >
                    <div className={styles.avt_fs}>
                      <div className={styles.img_p_menu}>
                        <Image
                          unoptimized
                          width={25}
                          height={25}
                          alt=""
                          src="https://hungha365.com/storageimage/GV/app1690012201_tien1.png"
                        />
                      </div>
                      <span className={styles.popup_fullname}>{getName()}</span>
                      <p className={styles.popup_saff}>Công Ty</p>
                    </div>
                  </Menu.Item>
                  <div></div>
                  <Menu.Item key="2">
                    <div className={`${styles.tutorial} ps-4 d-flex`}>
                      <div className={`d-flex align-items-center`}>
                        <Image
                          unoptimized
                          width={25}
                          height={25}
                          alt=""
                          src="https://hungha365.com/storageimage/GV/huong-dan.png"
                        ></Image>
                        <span className={`${styles.tutor}   ms-2 fs-5`}>
                          Hướng dẫn
                        </span>
                      </div>
                      <Image
                        unoptimized
                        width={12}
                        height={12}
                        alt=""
                        src="https://hungha365.com/storageimage/GV/l_exp49.png"
                        style={{ height: '20%' }}
                      />
                    </div>
                  </Menu.Item>
                  <Menu.Item key="cai-dat" onClick={onClick}>
                    <div className={`${styles.tutorial} ps-4 d-flex`}>
                      <div className={`d-flex align-items-center`}>
                        <Image
                          unoptimized
                          width={25}
                          height={25}
                          alt=""
                          src="https://hungha365.com/storageimage/GV/cai-dat.png"
                        ></Image>
                        <span className="ms-2 fs-5">Cài đặt</span>
                      </div>
                      <Image
                        unoptimized
                        width={12}
                        height={12}
                        alt=""
                        src="https://hungha365.com/storageimage/GV/l_exp49.png"
                        style={{ height: '20%' }}
                      />
                    </div>
                  </Menu.Item>
                  <Menu.Item key="4">
                    <div
                      className={`${styles.tutorial} ps-4 d-flex`}
                      onClick={handleLogoutClick}
                    >
                      <div className={`d-flex align-items-center`}>
                        <Image
                          unoptimized
                          width={25}
                          height={25}
                          alt=""
                          src="https://hungha365.com/storageimage/GV/dang-xuat.png"
                        ></Image>
                        <span className="ms-2 fs-5">Đăng xuất</span>
                      </div>
                      <Image
                        unoptimized
                        width={12}
                        height={12}
                        alt=""
                        src="https://hungha365.com/storageimage/GV/l_exp49.png"
                        style={{ height: '20%' }}
                      />
                    </div>
                  </Menu.Item>
                </Menu>
              }
              trigger={['click']}
              placement="bottomRight"
            >
              <Image
                unoptimized
                width={25}
                height={25}
                alt=""
                src="https://hungha365.com/storageimage/GV/barwhite.svg"
                style={{ fill: '#fff' }}
                className={`${styles.item_mn} `}
              />
            </Dropdown>
          </div>
        </div>
        <div className={styles.header_menu}>
          <div
            className={styles.top_menu}
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <div className={styles.left_menu}>
              <span className={styles.id_user}>
                {`ID - ${getCurrentID()}`}{' '}
              </span>{' '}
              |<span> {getName()}</span>
            </div>
            <div className={styles.right_menu} style={{ display: 'flex' }}>
              <div className={styles.rela_menu}>
                <div>
                  <Dropdown
                    overlay={
                      <Menu
                        className={styles.dropdown}
                        style={{
                          width: '360px',

                          position: 'absolute',
                        }}
                      >
                        <Menu.Item
                          key="1"
                          className={styles.popup_name}
                          style={{ display: 'block' }}
                        >
                          <div className={styles.avt_fs}>
                            <div className={styles.img_p_menu}>
                              <Image
                                unoptimized
                                width={25}
                                height={25}
                                alt=""
                                src="https://hungha365.com/storageimage/GV/app1690012201_tien1.png"
                              />
                            </div>
                            <span className={styles.popup_fullname}>
                              {getName()}
                            </span>
                            <p className={styles.popup_saff}>Công Ty</p>
                          </div>
                        </Menu.Item>
                        <div></div>
                        <Menu.Item key="2">
                          <div className={`${styles.tutorial} ps-4 d-flex`}>
                            <div className={`d-flex align-items-center`}>
                              <Image
                                unoptimized
                                width={25}
                                height={25}
                                alt=""
                                src="https://hungha365.com/storageimage/GV/huong-dan.png"
                              ></Image>
                              <span className="ms-2 fs-5">Hướng dẫn</span>
                            </div>
                            <Image
                              width={12}
                              height={12}
                              alt=""
                              src="https://hungha365.com/storageimage/GV/l_exp49.png"
                              style={{ height: '20%' }}
                            />
                          </div>
                        </Menu.Item>
                        <Menu.Item key="cai-dat" onClick={onClick}>
                          <div className={`${styles.tutorial} ps-4 d-flex`}>
                            <div className={`d-flex align-items-center`}>
                              <Image
                                unoptimized
                                width={25}
                                height={25}
                                alt=""
                                src="https://hungha365.com/storageimage/GV/cai-dat.png"
                              ></Image>
                              <span className="ms-2 fs-5">Cài đặt</span>
                            </div>
                            <Image
                              width={12}
                              height={12}
                              alt=""
                              src="https://hungha365.com/storageimage/GV/l_exp49.png"
                              style={{ height: '20%' }}
                            />
                          </div>
                        </Menu.Item>
                        <Menu.Item key="4">
                          <div
                            className={`${styles.tutorial} ps-4 d-flex`}
                            onClick={handleLogoutClick}
                          >
                            <div className={`d-flex align-items-center`}>
                              <Image
                                unoptimized
                                width={25}
                                height={25}
                                alt=""
                                src="https://hungha365.com/storageimage/GV/dang-xuat.png"
                              ></Image>
                              <span className="ms-2 fs-5">Đăng xuất</span>
                            </div>
                            <Image
                              unoptimized
                              width={12}
                              height={12}
                              alt=""
                              src="https://hungha365.com/storageimage/GV/l_exp49.png"
                              style={{ height: '20%' }}
                            />
                          </div>
                        </Menu.Item>
                      </Menu>
                    }
                    trigger={['click']}
                    placement="bottomRight"
                  >
                    <Image
                      unoptimized
                      width={25}
                      height={25}
                      alt=""
                      src="https://hungha365.com/storageimage/GV/icon-menu.svg"
                      className={`${styles.item_mn} `}
                    />
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isLogoutModalOpen ? (
          <div
            className={styles.modal_popup_logout}
            style={{ display: 'block', textAlign: 'center' }}
          >
            <div className={styles.popup_logout}>
              <div
                className={`${styles.m_h} ${styles.remove_class} ${selectedColor}`}
              >
                <p className={`${styles.text_logout1} ${styles.text_center}`}>
                  Đăng xuất
                </p>
              </div>
              <div className={styles.logi}>
                <div className={`${styles.text_logout2} ${styles.text_center}`}>
                  Bạn có muốn đăng xuất ra khỏi hệ thống?
                </div>
                <div className={styles.text_center}>
                  <button
                    className={`${styles.btn_close} ${styles.click_close_tcv}`}
                    onClick={handleCancelClick}
                  >
                    Hủy
                  </button>
                  <button
                    className={`${styles.btn_agree} ${styles.don_logout} ${styles.remove_class} ${selectedColor}`}
                    onClick={handleCancelClick}
                  >
                    Đồng Ý
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
