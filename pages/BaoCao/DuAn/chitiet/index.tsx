import React, { use, useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../Body.module.css';
import Link from 'next/link';
import { test } from 'node:test';
import Image from 'next/image';
import { POST } from '@/pages/api/auth';

export interface AboutPageAProps {}

export default function About({
  setActiveKey,
  selectedColor,
  item,
}: {
  setActiveKey: Function;
  selectedColor: string;
  item: any;
}) {
  const renderApplyKey = () => {
    setActiveKey('du-an');
  };

  const [apiData, setApiData] = useState<any>();

  const fetchApiData = () => {
    POST(`me/quan-ly-bao-cao-du-an-nhan-vien-chi-tiet/${item}`, {}).then(
      (response) => {
        setApiData(response?.data);
      }
    );
  };

  useEffect(() => {
    fetchApiData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userConNhieuViecNhat = apiData?.nvConNhieuViecNhat;
  const userHoanThanhMuonNhieuNhat = apiData?.nvHoanThanhMuonNhieuNhat;
  const userHoanThanhXuatSacNhat = apiData?.nvHoanThanhXuatSacNhat;
  return (
    <>
      <div
        className={styles.boxt_setting}
        style={{ paddingTop: '30px', display: 'block' }}
      >
        <div className={`${styles.path_tlct} ${styles.qly_bcqt}  `}>
          <div className="d-flex">
            <Image
              unoptimized
              src="https://phanmemgiaoviec.timviec365.vn/assets/images/l_exp22.png"
              width={60}
              height={60}
              alt=""
            />
            <h4 className={styles.path_n}>Dự án :</h4>

            <h4 className={styles.path_form}>
              {' '}
              {apiData?.project?.project_name}
            </h4>
          </div>
        </div>
        <div
          onClick={renderApplyKey}
          className={`text-decoration-none text-light`}
        >
          <div className={styles.report_search}>
            <div className={styles.prew_repr}>
              <div
                className={`${styles.pre_rep} text-decoration-none text-dark `}
              >
                Trở về
              </div>
            </div>
          </div>
        </div>
        <div className={styles.report_proce}>
          <h4 className={styles.detli_repr}>
            {apiData?.project?.project_name}
          </h4>
          <div
            className={styles.numb_reprt_pc}
            style={{
              display: 'flex',
              marginBottom: '20px',
              justifyContent: 'space-between',
            }}
          >
            <div className={styles.mission_reprt}>
              <div className={styles.fl_repr}>
                <h4 className={styles.deil_reph}>Nhóm công việc</h4>
                <div className={styles.numbr_repr}>
                  <p className={styles.numbr_cn}>
                    <span className={styles.colrb_numbr}>
                      {apiData?.jobGroup?.countNhomCongViec?.hoanthanh}
                    </span>
                    /{apiData?.jobGroup?.countNhomCongViec?.tongso}
                  </p>
                  <p className={styles.note_numbr}>Hoàn thành/Tổng số</p>
                </div>
              </div>
            </div>

            <div className={`${styles.mission_reprt} ${styles.mission_repr_o}`}>
              <div className={styles.fl_repr}>
                <h4 className={styles.deil_reph}>Nhóm công việc quan trọng</h4>
                <div className={styles.numbr_repr}>
                  <p className={styles.numbr_cn}>
                    <span className={styles.colrb_numbr}>
                      {apiData?.jobGroup?.countNhomCongViecQuanTrong?.hoanthanh}
                    </span>
                    /{apiData?.jobGroup?.countNhomCongViecQuanTrong?.tongso}
                  </p>
                  <p className={styles.note_numbr}>Hoàn thành/Tổng số</p>
                </div>
              </div>
            </div>

            <div className={`${styles.mission_reprt} ${styles.mission_repr_t}`}>
              <div className={styles.fl_repr}>
                <h4 className={styles.deil_reph}>Nhóm công việc khẩn cấp</h4>
                <div className={styles.numbr_repr}>
                  <p className={styles.numbr_cn}>
                    <span className={styles.colrx_numbr}>
                      {apiData?.jobGroup?.countNhomCongViecKhanCap?.hoanthanh}
                    </span>
                    /{apiData?.jobGroup?.countNhomCongViecKhanCap?.tongso}
                  </p>
                  <p className={styles.note_numbr}>Hoàn thành/Tổng số</p>
                </div>
              </div>
            </div>

            <div className={styles.mission_reprt}>
              <div className={styles.fl_repr}>
                <h4 className={styles.deil_reph}>Nhóm công việc quá hạn</h4>
                <div className={styles.numbr_repr}>
                  <p className={styles.numbr_cn}>
                    <span className={styles.colrr_numbr}>
                      {apiData?.jobGroup?.countNhomCongViecQuaHan}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.report_finish}>
            <div className={`${styles.staff_rep_lotwk} ${styles.repr_finle}`}>
              <h4 className={styles.titl_rept}>
                Nhân viên còn nhiều việc nhất
              </h4>
              {userConNhieuViecNhat && userConNhieuViecNhat.length > 0 ? (
                userConNhieuViecNhat.map((item: any) => (
                  <div key={item.id} className={styles.div_bo}>
                    <Image
                      unoptimized
                      src="https://hungha365.com/storageimage/GV/avt.png"
                      alt="avt"
                      width={22}
                      height={22}
                    />
                    <div className={styles.div_bo_div}>
                      <h4>{item?.userName}</h4>
                      <p>
                        {item?.soCongViec} / {item?.tongCongViec} Công việc được
                        giao
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className={styles.chuxanh}>Trống</p>
              )}
            </div>

            <div className={`${styles.staff_rep_latewk} ${styles.repr_finle}`}>
              <h4 className={styles.titl_rept}>
                Nhân viên hoàn thành muộn nhiều nhất
              </h4>
              {userHoanThanhMuonNhieuNhat &&
              userHoanThanhMuonNhieuNhat.length > 0 ? (
                userHoanThanhMuonNhieuNhat.map((item: any) => (
                  <div key={item.id} className={styles.div_bo}>
                    <Image
                      unoptimized
                      src="https://hungha365.com/storageimage/GV/avt.png"
                      alt="avt"
                      width={22}
                      height={22}
                    />
                    <div className={styles.div_bo_div}>
                      <h4>{item?.userName}</h4>
                      <p>
                        {item?.soCongViec} / {item?.tongCongViec} Công việc được
                        giao
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className={styles.chuxanh}>Trống</p>
              )}
            </div>

            <div
              className={`${styles.staff_rep_excellent} ${styles.repr_finle}`}
            >
              <h4 className={styles.titl_rept}>Nhân viên hoàn xuất sắc nhất</h4>
              {userHoanThanhXuatSacNhat &&
              userHoanThanhXuatSacNhat.length > 0 ? (
                userHoanThanhXuatSacNhat.map((item: any) => (
                  <div key={item.id} className={styles.div_bo}>
                    <Image
                      unoptimized
                      src="https://hungha365.com/storageimage/GV/avt.png"
                      alt="avt"
                      width={22}
                      height={22}
                    />
                    <div className={styles.div_bo_div}>
                      <h4>{item?.userName}</h4>
                      <p>
                        {item?.soCongViec} / {item?.tongCongViec} Công việc được
                        giao
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className={styles.chuxanh}>Trống</p>
              )}
            </div>
          </div>

          <div className={styles.proj_reprt}>
            <div className={styles.reprt_protb}>
              <table className={styles.table}>
                <thead className={`${styles.thead_tb} ${selectedColor}`}>
                  <tr>
                    <th className={styles.col_tb}>Tên thành viên</th>
                    <th className={styles.col_tb}>Số công việc được giao</th>
                    <th className={styles.col_tb}>
                      Số công việc đã hoàn thành
                    </th>
                    <th className={styles.col_tb}>Thời gian trung bình</th>
                    <th className={styles.col_tb}>Hoàn thành muộn</th>
                    <th className={styles.col_tb}>Quá hạn</th>
                    <th className={styles.col_tb}>Đang thực hiện</th>
                  </tr>
                </thead>
                <tbody className={styles.tbody_tb}>
                  {apiData?.listMember.map((item: any, index: number) => (
                    <tr key={index}>
                      <td>
                        <div className={styles.div_xl}>
                          <div className={styles.img}>
                            <Image
                              unoptimized
                              src="https://hungha365.com/storageimage/GV/avt.png"
                              alt="avt"
                              width={22}
                              height={22}
                            />
                          </div>
                          <div className={styles.text_vip}>
                            <p className={styles.name_tg}>{item?.userName}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p>{item?.countCV}</p>
                      </td>
                      <td>
                        <p>{item?.countCVHoanThanh}</p>
                      </td>
                      <td>
                        <p>{item?.timeTB} giờ</p>
                      </td>
                      <td>
                        <p>{item?.countCvHoanThanhMuon}</p>
                      </td>
                      <td>
                        <p>{item?.countCvQuaHan}</p>
                      </td>
                      <td>
                        <p>{item?.countCVThucHien}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
