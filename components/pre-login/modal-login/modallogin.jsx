import React, { useEffect, useState } from 'react';
import styles from './mdlg.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ModalSignInHome from '../modal-dang-nhap/mddn';
export default function ModalLogin({ setOpenModalLogin }) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(1);
  return (
    <>
      <ModalSignInHome open={open} setOpen={setOpen} type={type} />
      {!open && (
        <>
          <div>
            <div className={styles.modal_login_register}>
              <div
                className={styles.close}
                onClick={() => {
                  setOpenModalLogin(false);
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
                >{`Để tiếp tục đăng nhập bạn vui lòng chọn loại tài khoản.`}</div>
                <div className={styles.khoi}>
                  <div
                    style={{ textDecoration: 'none' }}
                    onClick={(e) => {
                      setOpen(true);
                      setType(1);
                    }}
                  >
                    <div className={styles.khoi_item}>
                      <Image
                        unoptimized
                        src="https://hungha365.com/storageimage/QLTS/Home_fill.png"
                        width={52}
                        height={52}
                        alt=""
                      />
                      <span>Công ty</span>
                    </div>
                  </div>
                  <div
                    style={{ textDecoration: 'none' }}
                    onClick={(e) => {
                      setOpen(true);
                      setType(2);
                    }}
                  >
                    <div className={styles.khoi_item}>
                      <Image
                        unoptimized
                        src="https://hungha365.com/storageimage/QLTS/User_alt_fill.png"
                        width={52}
                        height={52}
                        alt=""
                      />
                      <span>Nhân viên</span>
                    </div>
                  </div>
                  <div
                    style={{ textDecoration: 'none' }}
                    onClick={(e) => {
                      setOpen(true);
                      setType(3);
                    }}
                  >
                    <div className={styles.khoi_item}>
                      <Image
                        unoptimized
                        src="https://hungha365.com/storageimage/QLTS/User_circle.png"
                        width={52}
                        height={52}
                        alt=""
                      />
                      <span>Cá nhân</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.dark_overlay}></div>
          </div>
        </>
      )}
    </>
  );
}
