import React, { useState, useEffect } from 'react';
import { SubMenu, Item as MenuItem } from 'rc-menu';
import styles from '@/components/sidebar/Sidebar.module.css';
import { Menu, MenuProps, Button } from 'antd';
import { Router, useRouter } from 'next/router';
import Image from 'next/image';
import { getName } from '@/pages/api/auth';
const SideBarCongTy = ({
  activeKey,
  setActiveKey,
  openKeys,
  onOpenChange,
  setOpenKeys,
  isHasRole,
  setIsHasRole,
  selectedColor,
  setSidebarOpen,
}: {
  activeKey: any;
  setActiveKey: Function;
  openKeys: any;
  onOpenChange: any;
  setOpenKeys: Function;
  isHasRole: boolean;
  setIsHasRole: Function;
  selectedColor: string;
  setSidebarOpen: Function;
}) => {
  const router = useRouter();
  const onClick = (info: any) => {
    setActiveKey(info?.key);
    info?.key === 'trang-chu' ? setOpenKeys([]) : null;
  };

  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: any) => {
    return time?.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour24: true,
    });
  };

  const formatDate = (date: any) => {
    return date?.toLocaleDateString();
  };

  return (
    <div
      className={`mainSideBar   ${styles.sidebar} ${styles.remove_class} ${selectedColor}`}
    >
      <div
        className={styles.header}
        //onClick={() => setIsHasRole(!isHasRole)}
      >
        <Image
          unoptimized
          width={25}
          height={25}
          alt=""
          className={styles.avatar}
          src="https://hungha365.com/storageimage/GV/duc.jpg"
        />
        <div className={styles.name}>
          <span className={styles.f_name}>{getName()}</span>
          <p className={styles.staff}>Công Ty</p>
        </div>
      </div>
      <div className={`${styles.sidebar_menu} mainSideBarcty `}>
        <Menu
          onClick={onClick}
          mode="inline"
          onOpenChange={onOpenChange}
          openKeys={openKeys}
          selectedKeys={[activeKey]}
          className={`${styles.span} ${styles.remove_class}  ${selectedColor}`}
          expandIcon={<></>}
        >
          <MenuItem
            className={`${styles.menuItem} ${styles.pdLeft23}`}
            key="trang-chu"
            onClick={() => {
              router.push('/quan-ly-chung-cong-ty');
            }}
          >
            <Image
              unoptimized
              width={25}
              height={25}
              alt=""
              className={styles['image-icon']}
              src="https://hungha365.com/storageimage/GV/homeicon.svg"
            ></Image>
            Trang Chủ
          </MenuItem>
          <SubMenu
            className={`${styles.menuItem} `}
            key="quan-ly-du-an"
            title={
              <span style={{ paddingLeft: '0px' }}>
                <Image
                  unoptimized
                  width={26}
                  height={21}
                  alt=""
                  className={styles['image-icon']}
                  src="https://hungha365.com/storageimage/GV/group-31231.svg"
                ></Image>
                Quản lý dự án
              </span>
            }
          >
            <MenuItem
              className={`${styles.menuItem}`}
              key="theo-danh-sach-cong-viec"
              style={{ padding: '0px 0 0 50px', margin: '2px' }}
              onClick={() => {
                router.push('/quan-ly-du-an-theo-danh-sach-cong-viec');
              }}
            >
              <Image
                unoptimized
                width={20}
                height={20}
                alt=""
                className={styles['image-icon']}
                src="https://hungha365.com/storageimage/GV/theods.svg"
              ></Image>
              Theo danh sách công việc
            </MenuItem>
            <MenuItem
              style={{ padding: '0px 0 0 50px', margin: '2px' }}
              className={`${styles.menuItem}`}
              key="theo-quy-trinh"
              onClick={() => {
                router.push('/quan-ly-du-an-theo-quy-trinh');
              }}
            >
              <Image
                unoptimized
                width={20}
                height={20}
                alt=""
                className={styles['image-icon']}
                src="https://hungha365.com/storageimage/GV/theoqt.svg"
              ></Image>
              Theo quy trình
            </MenuItem>
          </SubMenu>
          <SubMenu
            className={`${styles.menuItem}`}
            key="quan-ly-tai-lieu"
            title={
              <span style={{ paddingLeft: '0px' }}>
                <Image
                  unoptimized
                  width={26}
                  height={22}
                  alt=""
                  className={styles['image-icon']}
                  src="https://hungha365.com/storageimage/GV/group-31232.svg"
                ></Image>
                Quản lý tài liệu
              </span>
            }
          >
            <MenuItem
              style={{ padding: '0px 0 0 50px', margin: '2px' }}
              className={`${styles.menuItem}`}
              key="tai-lieu-cong-viec"
              onClick={() => {
                router.push('/quan-ly-tai-lieu-cong-viec');
              }}
            >
              <Image
                unoptimized
                width={20}
                height={20}
                alt=""
                className={styles['image-icon']}
                src="https://hungha365.com/storageimage/GV/tai-lieu-cong-viec.png"
              ></Image>
              Tài liệu công việc
            </MenuItem>
            <MenuItem
              style={{ padding: '0px 0 0 50px', margin: '2px' }}
              className={`${styles.menuItem}`}
              key="tai-lieu-cua-toi"
              onClick={() => {
                router.push('/quan-ly-tai-lieu-cua-toi');
              }}
            >
              <Image
                unoptimized
                width={20}
                height={20}
                alt=""
                className={styles['image-icon']}
                src="https://hungha365.com/storageimage/GV/tai-lieu-cua-toi.png"
              ></Image>
              Tài liệu của tôi
            </MenuItem>
          </SubMenu>
          <SubMenu
            className={`${styles.menuItem}`}
            key="quan-ly-phong-hop"
            title={
              <span style={{ paddingLeft: '0px' }}>
                <Image
                  unoptimized
                  width={22}
                  height={26}
                  alt=""
                  className={styles['image-icon']}
                  src="https://hungha365.com/storageimage/GV/vector.svg"
                ></Image>
                Quản lý phòng họp
              </span>
            }
          >
            <MenuItem
              style={{ padding: '0px 0 0 50px', margin: '2px' }}
              className={`${styles.menuItem}`}
              key="dia-diem"
              onClick={() => {
                router.push('/quan-ly-dia-diem');
              }}
            >
              <Image
                unoptimized
                width={25}
                height={25}
                alt=""
                className={styles['image-icon']}
                src="https://hungha365.com/storageimage/GV/diadiem.svg"
              ></Image>
              Địa điểm
            </MenuItem>
            <MenuItem
              style={{ padding: '0px 0 0 50px', margin: '2px' }}
              className={`${styles.menuItem}`}
              key="phong-hop"
              onClick={() => {
                router.push('/quan-ly-phong-hop');
              }}
            >
              <Image
                unoptimized
                width={25}
                height={25}
                alt=""
                className={styles['image-icon']}
                src="https://hungha365.com/storageimage/GV/phonghop.svg"
              ></Image>
              Phòng họp
            </MenuItem>
          </SubMenu>
          <MenuItem
            className={`${styles.menuItem} ${styles.pdLeft23}`}
            key="quan-ly-cuoc-hop"
            onClick={() => {
              router.push('/quan-ly-cuoc-hop');
            }}
          >
            {/* <HomeOutlined></HomeOutlined> */}
            <Image
              unoptimized
              width={26}
              height={24}
              alt=""
              className={styles['image-icon']}
              src="https://hungha365.com/storageimage/GV/quanlycuochop.svg"
            ></Image>
            Quản lý cuộc họp
          </MenuItem>
          <SubMenu
            className={`${styles.menuItem}`}
            key="bao-cao"
            title={
              <span style={{ paddingLeft: '0px' }}>
                <Image
                  unoptimized
                  width={26}
                  height={26}
                  alt=""
                  className={styles['image-icon']}
                  src="https://hungha365.com/storageimage/GV/qlbaocao.svg"
                ></Image>
                Báo cáo
              </span>
            }
          >
            <MenuItem
              style={{ padding: '0px 0 0 50px', margin: '2px' }}
              className={`${styles.menuItem}`}
              key="quy-trinh"
              onClick={() => {
                router.push('/quan-ly-bao-cao-quy-trinh-nhan-vien');
              }}
            >
              <Image
                unoptimized
                width={20}
                height={20}
                alt=""
                className={styles['image-icon']}
                src="https://hungha365.com/storageimage/GV/quy-trinh.png"
              ></Image>
              Quy Trình
            </MenuItem>
            <MenuItem
              style={{ padding: '0px 0 0 50px', margin: '2px' }}
              className={`${styles.menuItem}`}
              key="du-an"
              onClick={() => {
                router.push('/quan-ly-bao-cao-du-an-nhan-vien');
              }}
            >
              <Image
                unoptimized
                width={20}
                height={20}
                alt=""
                className={styles['image-icon']}
                src="https://hungha365.com/storageimage/GV/du-an.png"
              ></Image>
              Dự Án
            </MenuItem>
          </SubMenu>
          <MenuItem
            className={`${styles.menuItem} ${styles.pdLeft23}`}
            key="du-lieu-da-xoa-gan-day"
            onClick={() => {
              router.push('/quan-ly-du-lieu-da-xoa-gan-day');
            }}
          >
            {/* <HomeOutlined></HomeOutlined> */}
            <Image
              unoptimized
              width={25}
              height={25}
              alt=""
              className={styles['image-icon']}
              src="https://hungha365.com/storageimage/GV/dulieudaxoa.svg"
            />
            Dữ liệu đã xóa gần đây
          </MenuItem>
          <SubMenu
            className={`${styles.menuItem}`}
            key="phan-quyen"
            title={
              <span style={{ paddingLeft: '0px' }}>
                <Image
                  unoptimized
                  width={25}
                  height={26}
                  alt=""
                  className={styles['image-icon']}
                  src="https://hungha365.com/storageimage/GV/phanquyen.svg"
                ></Image>
                Phân quyền
              </span>
            }
          >
            <MenuItem
              style={{ padding: '0px 0 0 50px', margin: '2px' }}
              className={`${styles.menuItem}`}
              key="vai-tro"
              onClick={() => {
                router.push('/quan-ly-vai-tro');
              }}
            >
              <Image
                unoptimized
                width={25}
                height={25}
                alt=""
                className={styles['image-icon']}
                src="https://hungha365.com/storageimage/GV/vaitro.svg"
              ></Image>
              Vai trò
            </MenuItem>
            <MenuItem
              style={{ padding: '0px 0 0 50px', margin: '2px' }}
              className={`${styles.menuItem}`}
              key="nguoi-dung"
              onClick={() => {
                router.push('/quan-ly-nguoi-dung');
              }}
            >
              <Image
                unoptimized
                width={25}
                height={25}
                alt=""
                className={styles['image-icon']}
                src="https://hungha365.com/storageimage/GV/nguoidung.svg"
              ></Image>
              Người dùng
            </MenuItem>
          </SubMenu>
          <MenuItem
            className={`${styles.menuItem} ${styles.pdLeft23}`}
            key="chuyen-doi-so"
            onClick={() => {
              router.push('https://hungha365.com');
            }}
          >
            {/* <HomeOutlined></HomeOutlined> */}
            <Image
              unoptimized
              width={25}
              height={25}
              alt=""
              className={styles['image-icon']}
              src="https://hungha365.com/storageimage/GV/chuyendoiso.svg"
            ></Image>
            Chuyển đổi số
          </MenuItem>
        </Menu>
      </div>
      <div className={styles.date_sidebar}>
        <p className={`${styles.hours} mb-0`}>
          <span className="clock-hour">{formatTime(currentTime)}</span>
        </p>
        <p className={`${styles.address_date}`}>
          Hà Nội , <span className="l_day">{formatDate(currentTime)}</span>
        </p>
      </div>
    </div>
  );
};

export default SideBarCongTy;
