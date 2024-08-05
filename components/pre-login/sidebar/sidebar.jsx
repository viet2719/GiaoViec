import React, { useState } from 'react';
import styles from './sb.module.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ModalLogin from '../modal-login/modallogin';
import Link from 'next/link';
import ModalRegister from '../modal-register/modalregister';
const SideBar = (props) => {
  const [showModalLogin, setOpenModalLogin] = useState(false);
  const router = useRouter();
  const path = router.pathname;
  const [showModalRegister, setOpenModalRegister] = useState(false);
  return (
    <>
      <div
        className={
          props.openSidebar
            ? `${styles.sidebarWrap} ${styles.active}`
            : `${styles.sidebarWrap}`
        }
      >
        {props.openSidebar ? (
          <>
            <div
              className={styles.item}
              onClick={() => {
                setOpenModalRegister(true);
                props.setOpenSidebar(!props.openSidebar);
              }}
            >
              <div className={styles.icon}>
                <Image
                  unoptimized
                  src="https://hungha365.com/storageimage/QLTS/item_1.png"
                  alt=""
                  className="logoImg"
                  width={22}
                  height={22}
                  sizes="100vw"
                />
              </div>
              <p className={styles.text}>Đăng ký</p>
            </div>
            <div
              className={styles.item}
              onClick={() => {
                setOpenModalLogin(true);
                props.setOpenSidebar(!props.openSidebar);
              }}
            >
              <div className={styles.icon}>
                <Image
                  unoptimized
                  src="https://hungha365.com/storageimage/QLTS/item_2.png"
                  alt=""
                  className="logoImg"
                  width={22}
                  height={22}
                  sizes="100vw"
                />
              </div>
              <p className={styles.text}>Đăng nhập</p>
            </div>
          </>
        ) : (
          <>
            <Link href="https://hungha365.com">
              <div className={styles.logo}>
                <Image
                  unoptimized
                  src="https://hungha365.com/storageimage/GV/group-632585.svg"
                  alt="Logo"
                  className="logoImg"
                  width={140}
                  height={42}
                />
              </div>
            </Link>

            <hr />
            <div className={styles.list}>
              <div
                className={
                  path.includes('trang-chu')
                    ? `${styles.item} ${styles.active}`
                    : `${styles.item}`
                }
              >
                <div className={styles.icon}>
                  <Image
                    unoptimized
                    src="https://hungha365.com/storageimage/GV/homeicon.svg"
                    alt=""
                    className="logoImg"
                    width={22}
                    height={22}
                    sizes="100vw"
                  />
                </div>
                <p className={styles.text}>Trang chủ</p>
              </div>
              <div
                className={
                  path.includes('danh-sach-tai-san')
                    ? `${styles.item} ${styles.active}`
                    : `${styles.item}`
                }
              >
                <div className={styles.icon}>
                  <Image
                    unoptimized
                    src="https://hungha365.com/storageimage/GV/group-31231.svg"
                    alt=""
                    width={22}
                    height={22}
                  />
                </div>
                <p className={styles.text}>Quản lý dự án</p>
              </div>
              <div
                className={
                  path.includes('cap-phat-thu-hoi')
                    ? `${styles.item} ${styles.active}`
                    : `${styles.item}`
                }
              >
                <div className={styles.icon}>
                  <Image
                    unoptimized
                    src="https://hungha365.com/storageimage/GV/group-31232.svg"
                    alt=""
                    width={22}
                    height={22}
                  />
                </div>
                <p className={styles.text}>Quản lý tài liệu</p>
              </div>
              <div
                className={
                  path.includes('dieu-chuyen-ban-giao')
                    ? `${styles.item} ${styles.active}`
                    : `${styles.item}`
                }
              >
                <div className={styles.icon}>
                  <Image
                    unoptimized
                    src="https://hungha365.com/storageimage/GV/vector.svg"
                    alt=""
                    width={22}
                    height={22}
                  />
                </div>
                <p className={styles.text}>Quản lý phòng họp</p>
              </div>
              <div
                className={
                  path.includes('sua-chua-bao-duong')
                    ? `${styles.item} ${styles.active}`
                    : `${styles.item}`
                }
              >
                <div className={styles.icon}>
                  <Image
                    unoptimized
                    src="https://hungha365.com/storageimage/GV/quanlycuochop.svg"
                    alt=""
                    width={22}
                    height={22}
                  />
                </div>
                <p className={styles.text}>Quản lý cuộc họp</p>
              </div>
              <div
                className={
                  path.includes('mat-huy-thanh-ly')
                    ? `${styles.item} ${styles.active}`
                    : `${styles.item}`
                }
              >
                <div className={styles.icon}>
                  <Image
                    unoptimized
                    src="https://hungha365.com/storageimage/GV/group-31230.svg"
                    alt=""
                    width={22}
                    height={22}
                  />
                </div>
                <p className={styles.text}>Công việc của tôi</p>
              </div>
              <div
                className={
                  path.includes('kiem-ke')
                    ? `${styles.item} ${styles.active}`
                    : `${styles.item}`
                }
              >
                <div className={styles.icon}>
                  <Image
                    unoptimized
                    src="https://hungha365.com/storageimage/GV/qlbaocao.svg"
                    alt=""
                    width={22}
                    height={22}
                  />
                </div>
                <p className={styles.text}>Báo cáo</p>
              </div>
              <div className={styles.item}>
                <div className={styles.icon}>
                  <Image
                    unoptimized
                    src="https://hungha365.com/storageimage/GV/dulieudaxoa.svg"
                    alt=""
                    width={22}
                    height={22}
                  />
                </div>
                <p className={styles.text}>Dữ liệu đã xóa gần đây</p>
              </div>
              <div className={styles.item}>
                <div className={styles.icon}>
                  <Image
                    unoptimized
                    src="https://hungha365.com/storageimage/GV/caidat.svg"
                    alt=""
                    width={22}
                    height={22}
                  />
                </div>
                <p className={styles.text}>Cài đặt</p>
              </div>
              <div className={styles.item} onClick={() => {}}>
                <div className={styles.icon}>
                  <Image
                    unoptimized
                    src="https://hungha365.com/storageimage/GV/chuyendoiso.svg"
                    alt=""
                    width={22}
                    height={22}
                  />
                </div>
                <p className={styles.text}>Chuyển đổi số</p>
              </div>
            </div>
          </>
        )}
      </div>
      {showModalLogin && <ModalLogin setOpenModalLogin={setOpenModalLogin} />}
      {showModalRegister && (
        <ModalRegister setOpenModalRegister={setOpenModalRegister} />
      )}
    </>
  );
};

export default SideBar;
