import React, { useState, useEffect } from 'react';
import { SubMenu, Item as MenuItem } from 'rc-menu';
import styles from '@/components/sidebar/Sidebar.module.css';
import { Menu, MenuProps, Button } from 'antd';
import { Router, useRouter } from 'next/router';
import Image from 'next/image';
import { getName } from '@/pages/api/auth';

const App = ({
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
      className={`mainSideBar ${styles.sidebar} ${styles.remove_class} ${selectedColor}`}
    >
      <div
        className={styles.header}
        //onClick={() => setIsHasRole(!isHasRole)}
      >
        <Image
          unoptimized
          src="https://hungha365.com/storageimage/GV/duc.jpg"
          width={25}
          height={25}
          alt=""
          className={styles.avatar_nhanvien}
        />
        <div className={styles.name}>
          <span className={styles.f_name}>{getName()}</span>
          <p className={styles.staff}>Nhân Viên</p>
        </div>
      </div>

      <div className={`${styles.sidebar_menu}  `}>
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
            style={{ paddingLeft: '22px' }}
            className={`${styles.menuItem}`}
            key="trang-chu"
          >
            <Image
              unoptimized
              width={25}
              height={25}
              alt=""
              className={styles['image-icon']}
              src="https://hungha365.com/storageimage/GV/trang-chu.png"
            ></Image>
            Trang Chủ
          </MenuItem>
          <SubMenu
            className={`${styles.menuItem}`}
            key="quan-ly-du-an"
            title={
              <span style={{ paddingLeft: '0px' }}>
                <Image
                  unoptimized
                  width={26}
                  height={21}
                  alt=""
                  className={styles['image-icon']}
                  src="https://hungha365.com/storageimage/GV/quan-ly-du-an.png"
                ></Image>
                Quản lý dự án
              </span>
            }
          >
            <MenuItem
              className={`${styles.menuItem}`}
              key="theo-danh-sach-cong-viec"
              style={{ padding: '0px 0 0 36px', margin: '2px' }}
            >
              <Image
                unoptimized
                width={20}
                height={20}
                alt=""
                className={styles['image-icon']}
                src="https://hungha365.com/storageimage/GV/theo-danh-sach-cong-viec.png"
              ></Image>
              Theo danh sách công việc
            </MenuItem>
            <MenuItem
              style={{ padding: '0px 0 0 36px', margin: '2px' }}
              className={`${styles.menuItem}`}
              key="theo-quy-trinh"
            >
              <Image
                unoptimized
                width={20}
                height={20}
                alt=""
                className={styles['image-icon']}
                src="https://hungha365.com/storageimage/GV/theo-quy-trinh.png"
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
                  src="https://hungha365.com/storageimage/GV/quan-ly-tai-lieu.png"
                ></Image>
                Quản lý tài liệu
              </span>
            }
          >
            <MenuItem
              style={{ padding: '0px 0 0 36px', margin: '2px' }}
              className={`${styles.menuItem}`}
              key="tai-lieu-cong-viec"
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
              style={{ padding: '0px 0 0 36px', margin: '2px' }}
              className={`${styles.menuItem}`}
              key="tai-lieu-cua-toi"
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
                  src="https://hungha365.com/storageimage/GV/quan-ly-phong-hop.png"
                ></Image>
                Quản lý phòng họp
              </span>
            }
          >
            <MenuItem
              style={{ padding: '0px 0 0 36px', margin: '2px' }}
              className={`${styles.menuItem}`}
              key="dia-diem"
            >
              <Image
                unoptimized
                width={25}
                height={25}
                alt=""
                className={styles['image-icon']}
                src="https://hungha365.com/storageimage/GV/dia-diem.png"
              ></Image>
              Địa điểm
            </MenuItem>
            <MenuItem
              style={{ padding: '0px 0 0 36px', margin: '2px' }}
              className={`${styles.menuItem}`}
              key="phong-hop"
            >
              <Image
                unoptimized
                width={25}
                height={25}
                alt=""
                className={styles['image-icon']}
                src="https://hungha365.com/storageimage/GV/phong-hop.png"
              ></Image>
              Phòng họp
            </MenuItem>
          </SubMenu>
          <MenuItem
            style={{ paddingLeft: '23px' }}
            className={`${styles.menuItem}`}
            key="quan-ly-cuoc-hop"
          >
            {/* <HomeOutlined></HomeOutlined> */}
            <Image
              unoptimized
              width={26}
              height={24}
              alt=""
              className={styles['image-icon']}
              src="https://hungha365.com/storageimage/GV/quan-ly-cuoc-hop.png"
            ></Image>
            Quản lý cuộc họp
          </MenuItem>
          <MenuItem
            className={`${styles.menuItem}`}
            key="cong-viec-cua-toi"
            style={{ paddingLeft: '23px' }}
          >
            <Image
              unoptimized
              width={26}
              height={25}
              alt=""
              className={styles['image-icon']}
              src="https://hungha365.com/storageimage/GV/cong-viec-cua-toi.svg"
            ></Image>
            Công việc của tôi
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
                  src="https://hungha365.com/storageimage/GV/bao-cao.png"
                ></Image>
                Báo cáo
              </span>
            }
          >
            <MenuItem
              style={{ padding: '0px 0 0 36px', margin: '2px' }}
              className={`${styles.menuItem}`}
              key="du-an"
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
            <MenuItem
              style={{ padding: '0px 0 0 36px', margin: '2px' }}
              className={`${styles.menuItem}`}
              key="quy-trinh"
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
          </SubMenu>

          <MenuItem
            className={`${styles.menuItem}`}
            key="du-lieu-da-xoa-gan-day"
            style={{ paddingLeft: '23px' }}
          >
            {/* <HomeOutlined></HomeOutlined> */}
            <Image
              unoptimized
              width={21}
              height={26}
              alt=""
              className={styles['image-icon']}
              src="https://hungha365.com/storageimage/GV/du-lieu-da-xoa-gan-day.png"
            ></Image>
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
                  src="https://hungha365.com/storageimage/GV/phan-quyen.png"
                ></Image>
                Phân quyền
              </span>
            }
          >
            <MenuItem
              style={{ padding: '0px 0 0 36px', margin: '2px' }}
              className={`${styles.menuItem}`}
              key="vai-tro"
            >
              <Image
                unoptimized
                width={25}
                height={25}
                alt=""
                className={styles['image-icon']}
                src="https://hungha365.com/storageimage/GV/vai-tro.png"
              ></Image>
              Vai trò
            </MenuItem>
            <MenuItem
              style={{ padding: '0px 0 0 36px', margin: '2px' }}
              className={`${styles.menuItem}`}
              key="nguoi-dung"
            >
              <Image
                unoptimized
                width={25}
                height={25}
                alt=""
                className={styles['image-icon']}
                src="https://hungha365.com/storageimage/GV/nguoi-dung.png"
              ></Image>
              Người dùng
            </MenuItem>
          </SubMenu>
          <MenuItem
            style={{ paddingLeft: '22px' }}
            className={`${styles.menuItem}`}
            key="chuyen-doi-so"
          >
            {/* <HomeOutlined></HomeOutlined> */}
            <Image
              unoptimized
              width={25}
              height={25}
              alt=""
              className={styles['image-icon']}
              src="https://hungha365.com/storageimage/GV/chuyen-doi-so.png"
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
          Hà Nội, <span className="l_day">{formatDate(currentTime)}</span>
        </p>
      </div>
    </div>
  );
};

export default App;
