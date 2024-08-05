import React, { useState } from 'react';
import styles from './footer.module.scss';
import Image from 'next/image';
import Link from 'next/link';
const Footer = () => {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.rectangle}>
          <div className={styles.content}>
            <div className={styles.group_under}>
              <div className={styles.left}>
                <div className={styles.info_com}>
                  <div className={styles.text_max}>Đơn vị chủ quản:</div>
                  <div className={styles.text_bold_max}>
                    Công ty Cổ phần Thanh toán Hưng Hà
                  </div>
                  <Link
                    className={styles.text_max}
                    target="_blank"
                    href={'https://goo.gl/maps/stYYuH5Ln5U2'}
                  >
                    VP1: Tầng 4, B50, Lô 6, KĐT Định Công, Hoàng Mai, Hà Nội
                  </Link>
                  <div className={styles.text_max}>
                    VP2: Thôn Thanh Miếu, Xã Việt Hưng, Huyện Văn Lâm, Tỉnh Hưng
                    Yên
                  </div>
                  <div className={styles.text_max}>
                    VP3: Tầng 2, Số 1 Đường Trần Nguyên Đán, KĐT Định Công,
                    Hoàng Mai, Hà Nội
                  </div>
                  <div className={styles.text_max}>Hotline: 0982.079.209</div>
                  <div className={styles.text_max}>
                    Email hỗ trợ: hungha365@gmail.com
                  </div>
                </div>
                <div className={styles.more}>
                  <div className={styles.more_one}>
                    <Link
                      className={styles.one_left}
                      href={'https://hungha365.com/gioi-thieu-chung'}
                    >
                      <Image
                        unoptimized
                        src="https://hungha365.com/storageimage/QLTS/play-fill.png"
                        width={24}
                        height={24}
                        alt=""
                      />
                      <div className={styles.text_max}>Giới thiệu chung</div>
                    </Link>
                    <Link
                      className={styles.one_right}
                      href={'https://hungha365.com/quy-dinh-bao-mat'}
                    >
                      <Image
                        unoptimized
                        src="https://hungha365.com/storageimage/QLTS/play-fill.png"
                        width={24}
                        height={24}
                        alt=""
                      />
                      <div className={styles.text_max}>Quy định bảo mật</div>
                    </Link>
                  </div>
                  <div className={styles.more_two}>
                    <Link
                      className={styles.two_left}
                      href={'https://hungha365.com/thong-tin-can-thiet'}
                    >
                      <Image
                        unoptimized
                        src="https://hungha365.com/storageimage/QLTS/play-fill.png"
                        width={24}
                        height={24}
                        alt=""
                      />
                      <div className={styles.text_max}>Thông tin cần thiết</div>
                    </Link>
                    <Link
                      className={styles.two_right}
                      href={
                        'https://hungha365.com/quy-trinh-giai-quyet-tranh-chap'
                      }
                    >
                      <Image
                        unoptimized
                        src="https://hungha365.com/storageimage/QLTS/play-fill.png"
                        width={24}
                        height={24}
                        alt=""
                      />
                      <div className={styles.text_max}>
                        Quy trình giải quyết tranh chấp
                      </div>
                    </Link>
                  </div>
                  <div className={styles.more_three}>
                    <div className={styles.three_left}>
                      <div>
                        <Link
                          style={{ display: 'flex' }}
                          href={'https://hungha365.com/thoa-thuan-su-dung'}
                        >
                          <Image
                            unoptimized
                            src="https://hungha365.com/storageimage/QLTS/play-fill.png"
                            width={24}
                            height={24}
                            alt=""
                          />
                          <div className={styles.text_max}>
                            Thỏa thuận sử dụng
                          </div>
                        </Link>
                      </div>
                    </div>
                    <Link
                      className={styles.three_right}
                      href={'https://hungha365.com/so-do-website'}
                    >
                      <Image
                        unoptimized
                        src="https://hungha365.com/storageimage/QLTS/play-fill.png"
                        width={24}
                        height={24}
                        alt=""
                      />
                      <div className={styles.text_max}>Sơ đồ website</div>
                    </Link>
                    {/* <div className={styles.three_right}>
                      <Image
                        unoptimized
                        src="https://hungha365.com/storageimage/QLTS/layer-01.png"
                        width={148}
                        height={56}
                        alt=""
                      />
                      <Image
                        unoptimized
                        src="https://hungha365.com/storageimage/QLTS/dmca-protected-1.png"
                        width={118}
                        height={59}
                        alt=""
                      />
                    </div> */}
                  </div>
                </div>
              </div>
              <div className={styles.qr}>
                <div className={styles.qr_text}>Tải APP Chat 365 tại đây</div>
                <Image
                  unoptimized
                  src="https://hungha365.com/storageimage/QLTS/image-2.png"
                  width={295}
                  height={295}
                  alt=""
                  className={styles.fix_img}
                />
              </div>
            </div>
          </div>
          <div className={styles.content_mobile}>
            <div className={styles.group_under}>
              <div className={styles.left}>
                <div className={styles.info_com}>
                  <div className={styles.text_max}>Đơn vị chủ quản:</div>
                  <div className={styles.text_bold_max}>
                    Công ty Cổ phần Thanh toán Hưng Hà
                  </div>
                  <Link
                    className={styles.text_max}
                    href={'https://goo.gl/maps/stYYuH5Ln5U2'}
                  >
                    VP1: Tầng 4, B50, Lô 6, KĐT Định Công, Hoàng Mai, Hà Nội
                  </Link>
                  <div className={styles.text_max}>
                    VP2: Thôn Thanh Miếu, Xã Việt Hưng, Huyện Văn Lâm, Tỉnh Hưng
                    Yên
                  </div>
                  <div className={styles.text_max}>
                    VP3: Tầng 2, Số 1 Đường Trần Nguyên Đán, KĐT Định Công,
                    Hoàng Mai, Hà Nội
                  </div>
                  <div className={styles.text_max}>Hotline: 0982.079.209</div>
                  <div className={styles.text_max}>
                    Email hỗ trợ: hungha365@gmail.com
                  </div>
                </div>
                <div className={styles.more}>
                  <div className={styles.more_one}>
                    <Link
                      className={styles.one_left}
                      href="https://hungha365.com/gioi-thieu-chung"
                    >
                      <Image
                        unoptimized
                        src="https://hungha365.com/storageimage/QLTS/play-fill.png"
                        width={24}
                        height={24}
                        alt=""
                      />
                      <div className={styles.text_max}>Giới thiệu chung</div>
                    </Link>
                    <Link
                      className={styles.two_left}
                      href="https://hungha365.com/thong-tin-can-thiet"
                    >
                      <Image
                        unoptimized
                        src="https://hungha365.com/storageimage/QLTS/play-fill.png"
                        width={24}
                        height={24}
                        alt=""
                      />
                      <div className={styles.text_max}>Thông tin cần thiết</div>
                    </Link>
                    <Link
                      className={styles.three_left}
                      href="https://hungha365.com/thoa-thuan-su-dung"
                    >
                      <Image
                        unoptimized
                        src="https://hungha365.com/storageimage/QLTS/play-fill.png"
                        width={24}
                        height={24}
                        alt=""
                      />
                      <div className={styles.text_max}>Thỏa thuận sử dụng</div>
                    </Link>
                  </div>
                  <div className={styles.more_two}>
                    <Link
                      className={styles.one_right}
                      href="https://hungha365.com/quy-dinh-bao-mat"
                    >
                      <Image
                        unoptimized
                        src="https://hungha365.com/storageimage/QLTS/play-fill.png"
                        width={24}
                        height={24}
                        alt=""
                      />
                      <div className={styles.text_max}>Quy định bảo mật</div>
                    </Link>
                    <Link
                      className={styles.two_right}
                      href="https://hungha365.com/quy-trinh-giai-quyet-tranh-chap"
                    >
                      <Image
                        unoptimized
                        src="https://hungha365.com/storageimage/QLTS/play-fill.png"
                        width={24}
                        height={24}
                        alt=""
                      />
                      <div className={styles.text_max}>
                        Quy trình giải quyết tranh chấp
                      </div>
                    </Link>
                    <Link
                      className={styles.three_right}
                      href="https://hungha365.com/so-do-website"
                    >
                      <Image
                        unoptimized
                        src="https://hungha365.com/storageimage/QLTS/play-fill.png"
                        width={24}
                        height={24}
                        alt=""
                      />
                      <div className={styles.text_max}>Sơ đồ website</div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className={styles.qr}>
                <div className={styles.qr_text}>Tải APP Chat 365 tại đây</div>
                <div className={styles.img}>
                  <Image
                    unoptimized
                    src="https://hungha365.com/storageimage/QLTS/app_store.png"
                    width={160}
                    height={48}
                    alt=""
                    className={styles.fix_img}
                  />
                  <Image
                    unoptimized
                    src="https://hungha365.com/storageimage/QLTS/gg_play.png"
                    width={160}
                    height={48}
                    alt=""
                    className={styles.fix_img}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
