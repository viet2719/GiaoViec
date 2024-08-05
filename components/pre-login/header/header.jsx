import React, { useState } from 'react';
import styles from './header.module.scss';
import Image from 'next/image';
import ModalLogin from '../modal-login/modallogin';
import Link from 'next/link';
import ModalRegister from '../modal-register/modalregister';
const Header = (props) => {
  const [showModalLogin, setOpenModalLogin] = useState(false);
  const [showModalRegister, setOpenModalRegister] = useState(false);
  return (
    <>
      <div className={styles.header}>
        <div className={styles.header_frame}>
          {/* <div className={styles.header_left}></div> */}
          <div className={styles.header_right}>
            <div className={styles.text}>Trang chủ</div>
            <div className={styles.text}>Hướng dẫn</div>
            <div className={styles.text}>Tin tức</div>
            <div className={styles.btn_login}>
              <div
                className={styles.text_login}
                onClick={() => setOpenModalLogin(true)}
              >
                Đăng nhập
              </div>
            </div>
            <div
              className={styles.btn_sigin}
              onClick={() => setOpenModalRegister(true)}
            >
              <div className={styles.text_sigin}>Đăng ký</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.header_menu}>
        <div className={styles.menu}>
          <button
            className={styles.btn_sidebar}
            onClick={() => props.setOpenSidebar(!props.openSidebar)}
          >
            {props.openSidebar ? (
              <>
                <Image
                  unoptimized
                  src="https://hungha365.com/storageimage/GV/close.svg"
                  alt=""
                  width={22}
                  height={22}
                />
              </>
            ) : (
              <>
                <Image
                  unoptimized
                  src="https://hungha365.com/storageimage/GV/barwhite.svg"
                  alt=""
                  width={26}
                  height={26}
                />
              </>
            )}
          </button>
          <div className={styles.logo_frame}>
            <div className={styles.logo}>
              <Link href="https://hungha365.com">
                <Image
                  unoptimized
                  src="https://hungha365.com/storageimage/GV/group-632585.svg"
                  alt="Logo"
                  className="logoImg"
                  width={140}
                  height={42}
                  priority="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {props.openSidebar && (
        <div
          className={styles.overLay}
          onClick={() => props.setOpenSidebar(!props.openSidebar)}
        ></div>
      )}
      {showModalLogin && <ModalLogin setOpenModalLogin={setOpenModalLogin} />}
      {showModalRegister && (
        <ModalRegister setOpenModalRegister={setOpenModalRegister} />
      )}
    </>
  );
};

export default Header;
