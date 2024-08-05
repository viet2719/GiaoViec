import React, { useState } from 'react';
import styles from './prelogin.module.scss';
import Image from 'next/image';
import Header from './header/header';
import Sidebar from './sidebar/sidebar';
import Footer from './footer/footer';
const PreLogin = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const [height, setHeight] = useState('74vh');

  const [expandedSections, setExpandedSections] = useState({});

  const toggleExpanded = () => {
    setExpanded(!expanded);
    setHeight(expanded ? '74vh' : 'auto');
  };

  const handleExpand = (section) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  return (
    <>
      <div className="containers">
        <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <div className="contentWrap" style={{ margin: 'unset' }}>
          <Header setOpenSidebar={setOpenSidebar} openSidebar={openSidebar} />
          <div className={styles.frame}>
            <div className={styles.box_left}>
              <div className={styles.title}>
                <div className={styles.title_background}></div>
                <div className={styles.title_text}>Mục lục</div>
              </div>
              <div className={styles.nav}>
                <div className={styles.nav_item_frame}>
                  <ul>
                    <li>1. Vai trò của CV xin việc quan trọng ra sao?</li>
                  </ul>
                </div>
                <div className={styles.nav_item_frame}>
                  <div className={styles.nav_content}>
                    <div
                      className={styles.nav_top}
                      onClick={() => handleExpand(2)}
                    >
                      <div
                        className={`${styles.arrow_drop} ${
                          expandedSections[2] ? styles.rotated : ''
                        }`}
                      >
                        <Image
                          unoptimized
                          src="https://hungha365.com/storageimage/GV/dropdown.svg"
                          width={24}
                          height={24}
                          style={{ transform: 'rotate(180deg)' }}
                          alt=""
                        />
                      </div>
                      <div>
                        2. Mẫu CV xin việc giúp quảng bá tốt hình ảnh ứng viên
                      </div>
                    </div>
                  </div>
                </div>
                {expandedSections[2] && (
                  <>
                    <div className={styles.nav_item_frame}>
                      <ul>
                        <li>
                          2.1 CV làm tốt vai trò cầu nối giữa ứng viên với doanh
                          nghiệp
                        </li>
                      </ul>
                    </div>
                    <div className={styles.nav_item_frame}>
                      <ul>
                        <li>
                          2.2 Mẫu CV xin việc giúp quảng bá tốt hình ảnh ứng
                          viên
                        </li>
                      </ul>
                    </div>
                    <div className={styles.nav_item_frame}>
                      <ul>
                        <li>2.3 Vai trò của CV xin việc quan trọng ra sao?</li>
                      </ul>
                    </div>
                    <div className={styles.nav_item_frame}>
                      <ul>
                        <li>
                          2.4 CV làm tốt vai trò cầu nối giữa ứng viên với doanh
                          nghiệp
                        </li>
                      </ul>
                    </div>
                  </>
                )}

                <div className={styles.nav_item_frame}>
                  <div className={styles.nav_content}>
                    <div className={styles.nav_top}>
                      <div className={styles.arrow_drop}>
                        <Image
                          unoptimized
                          src="https://hungha365.com/storageimage/GV/dropdown.svg"
                          width={24}
                          height={24}
                          alt=""
                          style={{ transform: 'rotate(180deg)' }}
                        />
                      </div>
                      <div>
                        3. Mẫu CV xin việc giúp quảng bá tốt hình ảnh ứng viên
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.box_right}>
              <div className={styles.right_top} style={{ height: height }}>
                <div className={styles.text}>
                  Phần mềm giao việc - thâu tóm toàn diện khối công việc không
                  lồ
                </div>
                <div className={styles.text_small}>
                  Trong những năm gần đây, việc lựa chọn đúng mô hình phát triển
                  phần mềm đã trở nên cấp thiết hơn bao giờ hết. Bởi nó sẽ giúp
                  các nhà lập trình có thể tạo ra được một phần mềm theo một
                  trình tự khoa học và tránh được các lỗi sai sót. Ở bài viết
                  lần này, trang web timviec365.vn sẽ giúp các bạn tìm hiểu{' '}
                  <span>mô hình phát triển phần mềm là gì</span> và những loại
                  mô hình phổ biến hiện nay.
                </div>
                <div className={styles.text_2}>
                  1. Quản trị doanh hiệu quả với công cụ hỗ trợ tốt nhất thị
                  trường
                </div>
                <div className={styles.text_small_2}>
                  Phần mềm HR tại hungha365.com là công cụ quản trị nhân sự đắc
                  lực bất kể doanh nghiệp nào cũng cần sở hữu. Được tích hợp
                  toàn diện các tính năng quản trị doanh nghiệp cần thiết từ cơ
                  bản đến nâng cao, phần mềm đem đến một quy trình quản trị
                  chuẩn với cách sử dụng dễ dàng cho nhà tuyển dụng.
                </div>
                <div className={styles.img}>
                  <Image
                    layout="responsive"
                    unoptimized
                    src="https://hungha365.com/storageimage/GV/unnamed.png"
                    width={800}
                    height={550}
                    alt=""
                  />
                </div>
                <div className={styles.text_small_2}>
                  Mô hình phát triển phần mềm còn được biết đến với tên gọi là
                  quy trình phát triển phần mềm. Nó chính là một tập hợp các kỹ
                  thuật hay một hệ thống được tạo ra trên phần mềm máy tính.
                  Trong mỗi trường hợp, mô hình phát triển phần mềm sẽ được
                  người sử dụng với mục đích khác nhau nhưng suy cho cùng, nó sẽ
                  được áp dụng để làm nên cấu trúc nhóm làm việc nhằm giúp người
                  dùng làm nên các chức năng của phần mềm một cách hiệu quả
                  nhất. Hầu hết các mô hình phát triển phần mềm đều cung cấp một
                  framework. Đây là một cách thức được dùng để kiểm soát sự phát
                  triển hệ thống thông tin.
                </div>
                <div className={styles.img}>
                  <Image
                    unoptimized
                    layout="responsive"
                    src="https://hungha365.com/storageimage/GV/management-coaching-business-dealing-mentor-concept-1.png"
                    width={800}
                    height={516}
                    alt=""
                  />
                </div>
                {/* <div className={styles.img}>
                  <Image
                    unoptimized
                    layout="responsive"
                    src="https://hungha365.com/storageimage/QLTS/businesspeople-working-finance-accounting-analyze-financi-2.png"
                    width={800}
                    height={526}
                    alt=""
                  />
                </div> */}
              </div>
              <button className={styles.right_bottom} onClick={toggleExpanded}>
                <div className={styles.text}>
                  {expanded ? 'Thu gọn' : 'Xem thêm'}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PreLogin;
