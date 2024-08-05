import React, { useEffect, useState } from 'react';
import styles from './mds.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
export default function ModalRegister({ setOpenModalRegister }) {
  return (
    <>
      <>
        <div>
          <div className={styles.modal_login_register}>
            <div
              className={styles.close}
              onClick={() => {
                setOpenModalRegister(false);
              }}
            >
              <Image
                unoptimized
                src="https://hungha365.com/storageimage/QLTS/qlc_close.png"
                width={29}
                height={29}
                alt=""
              />
            </div>
            <div className={styles.content}>
              <div
                className={styles.text}
              >{`Để tiếp tục đăng ký bạn vui lòng chọn loại tài khoản.`}</div>
              <div className={styles.khoi}>
                <div style={{ textDecoration: 'none' }}>
                  <Link
                    className={styles.khoi_item}
                    href={'https://hungha365.com/dang-ky-cong-ty.html'}
                  >
                    <Image
                      unoptimized
                      src="https://hungha365.com/storageimage/QLTS/Home_fill.png"
                      width={52}
                      height={52}
                      alt=""
                    />
                    <span>Công ty</span>
                  </Link>
                </div>
                <div style={{ textDecoration: 'none' }}>
                  <Link
                    className={styles.khoi_item}
                    href={'https://hungha365.com/dang-ky-nhan-vien.html'}
                  >
                    <Image
                      unoptimized
                      src="https://hungha365.com/storageimage/QLTS/User_alt_fill.png"
                      width={52}
                      height={52}
                      alt=""
                    />
                    <span>Nhân viên</span>
                  </Link>
                </div>
                <div style={{ textDecoration: 'none' }}>
                  <Link
                    className={styles.khoi_item}
                    href={'https://hungha365.com/dang-ky-ca-nhan.html'}
                  >
                    <Image
                      unoptimized
                      src="https://hungha365.com/storageimage/QLTS/User_circle.png"
                      width={52}
                      height={52}
                      alt=""
                    />
                    <span>Cá nhân</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.dark_overlay}></div>
        </div>
      </>
    </>
  );
}
