import React, { useEffect, useState } from 'react';
import styles from './baocaoquytrinh.module.scss';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { setDatasets } from 'react-chartjs-2/dist/utils';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { POST } from '@/pages/api/auth';
import { pos } from '@/components/Department';
ChartJS.register(ArcElement, Tooltip, Legend);

export interface BodyProp {}

export default function Page({
  setActiveKey,
  setOpenKeys,
  selectedColor,
  setData,
}: {
  setActiveKey: Function;
  setOpenKeys: Function;
  selectedColor: string;
  setData: any;
}) {
  const onClick = (info: any, item: any) => {
    setData(item?.process_id);
    setActiveKey(info?.key);
    info?.key === 'trang-chu' ? setOpenKeys([]) : null;
  };
  const [apiData, setApiData] = useState<any>();

  const fetchApiData = async () => {
    await POST('me/quan-ly-bao-cao-quy-trinh-nhan-vien', {}).then((res) => {
      setApiData(res?.data);
    });
  };
  useEffect(() => {
    fetchApiData();
  }, []);

  const QuyTrinhHoanThanh = apiData?.Process?.doneProcessCount;
  const QuyTrinhDangThucHien = apiData?.Process?.doingProcessCount;
  const QuyTrinhQuaTai = apiData?.Process?.overTimeProcessCount;
  const QuyTrinhThatBai = apiData?.Process?.failureProcessCount;

  const data = {
    labels: [
      'Quy trình hoàn thành',
      'Quy trình đang thực hiện',
      'Quy trình quá hạn',
      'Quy trình thất bại',
    ],
    datasets: [
      {
        // label: '# of Votes',
        data: [
          QuyTrinhHoanThanh,
          QuyTrinhDangThucHien,
          QuyTrinhQuaTai,
          QuyTrinhThatBai,
        ],
        backgroundColor: ['#76B51B', '#4C5BD4', '#FFA800', '#FF3333'],

        cutout: '80%',
      },
    ],
  };

  const TongGiaiDoanHoanThanhTot = apiData?.Stage?.HoanThanhTot;
  const TongGiaiDoanDangTangToc = apiData?.Stage?.DangTangToc;
  const TongGiaiDoanRuiRoCao = apiData?.Stage?.RuiRoCao;
  const TongGiaiDoanChamTre = apiData?.Stage?.ChamTre;

  const data2 = {
    labels: [
      'Tổng giai đoạn hoàn thành tốt',
      'Tổng giai đoạn đang tăng tốc',
      'Tổng giai đoạn rủi ro cao',
      'Tổng giai đoạn chậm trễ',
    ],
    datasets: [
      {
        // label: '# of Votes',
        data: [
          TongGiaiDoanHoanThanhTot,
          TongGiaiDoanDangTangToc,
          TongGiaiDoanRuiRoCao,
          TongGiaiDoanChamTre,
        ],
        backgroundColor: ['#76B51B', '#4C5BD4', '#FFA800', '#FF3333'],
        cutout: '80%',
      },
    ],
  };

  const CongViecHoanThanhDungHan = apiData?.Mission?.countHoanThanhDungHan;
  const CongViecHoanThanhMuon = apiData?.Mission?.countHoanThanhMuon;
  const CongViecDangLam = apiData?.Mission?.countDangLam;
  const CongViecQuaHan = apiData?.Mission?.countQuaHan;
  const CongViecThatBai = apiData?.Mission?.countThatBai;

  const data3 = {
    labels: [
      'Số công việc hoàn thành đúng hạn',
      'Số công việc hoàn thành muộn',
      'Số công việc đang làm',
      'Số công việc quá hạn',
      'Số nhiệm vụ thất bại',
    ],
    datasets: [
      {
        // label: '# of Votes',
        data: [
          CongViecHoanThanhDungHan,
          CongViecHoanThanhMuon,
          CongViecDangLam,
          CongViecQuaHan,
          CongViecThatBai,
        ],
        backgroundColor: [
          '#76B51B',
          '#4C5BD4',
          '#FFA800',
          '#FF3333',
          '#FCE40F',
        ],
        cutout: '80%',
      },
    ],
  };

  const chartOptions = {
    // cutoutPercentage: 0.9,
    plugins: {
      legend: {
        display: false, // Hide the labels
      },
    },
  };

  const datasetData = data.datasets[0].data;
  const datasetLabels = data.labels;

  const datasetData2 = data2.datasets[0].data;
  const datasetLabels2 = data2.labels;

  const datasetData3 = data3.datasets[0].data;
  const datasetLabels3 = data3.labels;

  const userConNhieuViecNhat = apiData?.NhanVienConNhieuViecNhat;
  const userHoanThanhMuonNhieuNhat = apiData?.NhanVienHoanThanhMuonNhieuNhat;
  const userHoanThanhXuatSacNhat = apiData?.NhanVienHoanThanhXuatSacNhat;
  const Prosess = apiData?.ProcessReport;
  return (
    <div className={styles.margin_20px} style={{ marginRight: '30px' }}>
      <div className={styles.boxt_setting}>
        <div className={styles.meeting_all} style={{ display: 'block' }}>
          <div className={styles.report_map}>
            <div className={`${styles.report_qgc} ${styles.map_proced}`}>
              <div className={styles.chart} style={{ position: 'relative' }}>
                <h4 className={styles.chart_titl}>Quy trình</h4>

                <div className={styles.pie_chart}>
                  <Doughnut data={data} options={chartOptions} />
                </div>
                <div className={styles.note_chart}>
                  <p className={styles.rept_note_one}>
                    {' '}
                    {data.labels[0]} : {datasetData[0]}{' '}
                  </p>

                  <p className={styles.rept_note_tow}>
                    {' '}
                    {data.labels[1]} : {datasetData[1]}
                  </p>
                  <p className={styles.rept_note_three}>
                    {' '}
                    {data.labels[2]} : {datasetData[2]}{' '}
                  </p>
                  <p className={styles.rept_note_four}>
                    {' '}
                    {data.labels[3]} : {datasetData[3]}{' '}
                  </p>
                </div>
              </div>
            </div>
            <div className={`${styles.report_qgc} ${styles.map_stage}`}>
              <div className={styles.chart} style={{ position: 'relative' }}>
                <h4 className={styles.chart_titl}>
                  Tiến độ thực hiện giai đoạn
                </h4>
                <div className={styles.pie_chart}>
                  <Doughnut data={data2} options={chartOptions} />
                </div>
                <div className={styles.note_chart}>
                  <p className={styles.rept_note_one}>
                    {data2.labels[0]} : {datasetData2[0]}{' '}
                  </p>
                  <p className={styles.rept_note_tow}>
                    {data2.labels[1]} : {datasetData2[1]}{' '}
                  </p>
                  <p className={styles.rept_note_three}>
                    {data2.labels[2]} : {datasetData2[2]}{' '}
                  </p>
                  <p className={styles.rept_note_four}>
                    {data2.labels[3]} : {datasetData2[3]}{' '}
                  </p>
                </div>
              </div>
            </div>

            <div className={`${styles.report_qgc} ${styles.map_work}`}>
              <div className={styles.chart} style={{ position: 'relative' }}>
                <h4 className={styles.chart_titl}>Công việc</h4>
                <div className={styles.pie_chart}>
                  <Doughnut data={data3} options={chartOptions} />
                </div>
                <div className={styles.note_chart}>
                  <p className={styles.rept_note_one}>
                    {data3.labels[0]}: {datasetData3[0]}
                  </p>
                  <p className={styles.rept_note_tow}>
                    {data3.labels[1]}: {datasetData3[1]}
                  </p>
                  <p className={styles.rept_note_three}>
                    {data3.labels[2]}: {datasetData3[2]}
                  </p>
                  <p className={styles.rept_note_four}>
                    {data3.labels[3]}: {datasetData3[3]}
                  </p>
                  <p className={styles.rept_note_five}>
                    {data3.labels[4]}: {datasetData3[4]}
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
              <h4 className={styles.titl_rept}>
                Nhân viên hoàn thành xuất sắc nhất
              </h4>
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

          <div className="w-full">
            <div className={styles.report_count}>
              <div className={styles.report_coutb}>
                <table className={styles.table}>
                  <thead
                    className={`${styles.thead_tb} ${selectedColor}`}
                    style={{ backgroundColor: '#4C5BD4' }}
                  >
                    <tr>
                      <th className={styles.col_tb}>Tên Quy trình</th>
                      <th className={styles.col_tb}>Số thành viên tham gia</th>
                      <th className={styles.col_tb}>Trạng thái quy trình</th>
                      <th className={styles.col_tb}>
                        Tổng nhiệm vụ/Số giai đoạn
                      </th>
                      <th className={styles.col_tb}>Số nhiệm vụ đang làm</th>
                      <th className={styles.col_tb}>Số nhiệm vụ quá hạn</th>
                      <th className={styles.col_tb}>Số nhiệm vụ hoàn thành</th>
                      <th className={styles.col_tb}>Số nhiệm vụ thất bại</th>
                    </tr>
                  </thead>
                  <tbody className={styles.tbody_tb}>
                    {Prosess &&
                      Prosess.map((item: any, index: number) => (
                        <tr key={index}>
                          <td>
                            <div
                              onClick={() =>
                                onClick({ key: 'chi-tiet-quy-trinh' }, item)
                              }
                              className={styles.chuden}
                            >
                              {item.process_name}
                            </div>
                          </td>

                          <td>
                            <div className={styles.numb_staff}>
                              {item?.detail_process_member?.map(
                                (user: any, userIndex: number) => (
                                  <div
                                    key={userIndex}
                                    className={styles.avt_fuln_sf}
                                  >
                                    <Image
                                      unoptimized
                                      src={
                                        user?.avatarUser === null ||
                                        user?.avatarUser === ''
                                          ? 'https://hungha365.com/storageimage/GV/avt.png'
                                          : user?.avatarUser
                                      }
                                      width={22}
                                      height={22}
                                      alt="avt"
                                      className={`${styles.avt_tbrep} ${styles.show_tv_tg}`}
                                    />
                                    <div className={styles.tv_tg}>
                                      <div className={styles.tv_tg_item}>
                                        <div className={styles.img}>
                                          <Image
                                            unoptimized
                                            src={
                                              user?.avatarUser === null ||
                                              user?.avatarUser === ''
                                                ? 'https://hungha365.com/storageimage/GV/avt.png'
                                                : user?.avatarUser
                                            }
                                            alt="avt"
                                            width={22}
                                            height={22}
                                          />
                                        </div>
                                        <div className={styles.text}>
                                          <p className={styles.name_tg}>
                                            {user?.userName}
                                          </p>
                                          <p className={styles.cv}>
                                            {
                                              pos.find(
                                                (item) =>
                                                  item.value ===
                                                  user?.inForPerson?.employee
                                                    ?.position_id
                                              )?.label
                                            }
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </td>
                          <td>
                            <p className={styles.bihuy_report}>
                              {item.process_status === 1
                                ? 'Đang thực hiện'
                                : item.process_status === 2
                                ? 'Hoàn thành'
                                : item.process_status === 3
                                ? 'Thất bại'
                                : ''}
                            </p>
                          </td>
                          <td>
                            <p className={styles.work_sumg}>
                              {item.totalMissions} / {item?.totalStages}
                            </p>
                          </td>
                          <td>
                            <p className={styles.work_do}>
                              {item.missionDoing}
                            </p>
                          </td>
                          <td>
                            <p className={styles.work_qh}>{item.missionDue}</p>
                          </td>
                          <td>
                            <p className={styles.work_nvht}>
                              {item.missionDone}
                            </p>
                          </td>
                          <td>
                            <p className={styles.work_thatb}>
                              {item.missionFailed}
                            </p>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
