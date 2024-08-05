'use client';
import React from 'react';
import Image from 'next/image';
import styles from './Detail.module.css';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
export default function TodayMeeting({
  data = [],
  setActiveKey,
  setOpenKeys,
  selectedColor,
}: {
  data: any;
  setActiveKey: Function;
  setOpenKeys: Function;
  selectedColor: string;
}) {
  const router = useRouter();
  const onClick = (info: any) => {
    setActiveKey(info?.key);
    window.sessionStorage.setItem('id_chi_tiet_cuoc_hop', info?.id);
    info?.key === 'trang-chu' ? setOpenKeys([]) : null;
  };
  const statusColors = {
    'Bị hủy': 'red', // Example color for "hủy" status
    'Sắp diễn ra': '#4c5bd4', // Example color for "sắp tới" status
    'Hoàn thành': 'green', // Example color for "hoàn thành" status
    'Đang diễn ra': '#FFA800',
  };
  //console.log(data);
  return (
    <div>
      <div className={styles.content}>
        <div className={styles.detai_meeting}>
          <div className={styles.list_mtt}>
            <div className={styles.cnt_lsmt}>
              {/*------lọc họp hôm nay------- */}
              <div className={styles.hn_meet}>
                <div className={styles.ctn_meet_ctn}>
                  <div className={styles.td_meet}>
                    <h4>Cuộc họp hôm nay</h4>
                  </div>
                  {data?.map((dt: any, index: number) => (
                    <div className={styles.m_scroll} key={index}>
                      <div className={styles.nd_meet}>
                        <div className={styles.tgct_met}>
                          <div className={styles.tday_met}>
                            <div className={styles.day_meet}>
                              <p className={styles.day_meeting}>
                                {dayjs(dt?.date_start).format('DD/MM')}
                              </p>
                              <p className={styles.time_meeting}>
                                {dt?.time_start}
                              </p>
                            </div>
                            <div className={styles.name_meet}>
                              <div
                                key={'chi-tiet-cuoc-hop'}
                                onClick={() =>
                                  router.push(
                                    `/quan-ly-cuoc-hop/chi-tiet-cuoc-hop?id=${dt?.id}`
                                  )
                                }
                                style={{
                                  textDecoration: 'none',
                                  color: '#474747',
                                  fontSize: '16px',
                                  fontWeight: 'bold',
                                  cursor: 'pointer',
                                }}
                              >
                                <p className={styles.title_meet}>
                                  {dt?.name_meeting}
                                </p>
                              </div>

                              {/* <p className={styles.time}>Từ 09:25 - 02/08/2023 đến 09:48 - 02/08/2023</p> */}
                              <p className={styles.time}>
                                {`Từ ${dt?.time_start} - ${dayjs(
                                  dt?.date_start
                                ).format('DD/MM/YYYY')} 
                                đến ${dayjs(
                                  `${dt?.date_start} ${dt?.time_start}:00`
                                )
                                  .add(Number(dt?.time_estimated), 'minute')
                                  .format('HH:mm')} - 
                                ${dayjs(
                                  `${dt?.date_start} ${dt?.time_start}:00`
                                )
                                  .add(Number(dt?.time_estimated), 'minute')
                                  .format('DD/MM/YYYY')}`}
                              </p>
                              <div className={styles.add}>
                                {dt?.type == '1' ? (
                                  <>
                                    <Image
                                      unoptimized
                                      width={15}
                                      height={18}
                                      alt=""
                                      src="https://hungha365.com/storageimage/GV/vitri.png"
                                    />
                                    <p className={styles.addres_meet}>
                                      {' '}
                                      {dt?.nameRoom || 'Không tồn tại'}
                                    </p>
                                  </>
                                ) : (
                                  <>
                                    <Image
                                      unoptimized
                                      width={25}
                                      height={18}
                                      alt=""
                                      src="https://hungha365.com/storageimage/GV/wif_meet.png"
                                    />
                                    <a
                                      className={styles.addres_meet}
                                      href={dt?.address_links}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      {' '}
                                      {dt?.address_links}
                                    </a>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className={styles.pep_meet}>
                            <div className={styles.num_meet}>
                              <Image
                                unoptimized
                                width={25}
                                height={25}
                                alt=""
                                src="https://hungha365.com/storageimage/GV/favico.png"
                              />
                              <p className={styles.count_met}>
                                +{dt?.nameTakeIn?.length}
                              </p>
                            </div>
                            <p>{}</p>
                            {dt?.is_cancel == 1 ? (
                              <div
                                className={styles.stat_met}
                                style={{ background: statusColors['Bị hủy'] }}
                              >
                                <p>Bị hủy</p>
                              </div>
                            ) : dayjs(`${dt?.date_start} ${dt?.time_start}:00`)
                                .add(Number(dt?.time_estimated), 'minute')
                                .isBefore(dayjs()) ? (
                              <div
                                className={styles.stat_met}
                                style={{
                                  background: statusColors['Hoàn thành'],
                                }}
                              >
                                <p>Hoàn thành</p>
                              </div>
                            ) : dayjs(
                                `${dt?.date_start} ${dt?.time_start}:00`
                              ).isAfter(dayjs()) ? (
                              <div
                                className={styles.stat_met}
                                style={{
                                  background: statusColors['Sắp diễn ra'],
                                }}
                              >
                                <p>Sắp diễn ra</p>
                              </div>
                            ) : (
                              <div
                                className={styles.stat_met}
                                style={{
                                  background: statusColors['Đang diễn ra'],
                                }}
                              >
                                <p>Đang diễn ra</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
