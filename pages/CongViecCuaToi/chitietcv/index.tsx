import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Col, Dropdown, Row, Space, message } from 'antd';
import { Button, Upload } from 'antd';
import styles from './chitiet.module.css';
import DelCMT from '@/pages/components/Quanlyduan/Chitiettheoquytinh/Bacham/Nhiemvu/DelCMT';
import Router, { useRouter } from 'next/router';
import DropDot from '../modal/DropDot';
import { GET_EXCEL, POST, getCurrentID } from '@/pages/api/auth';
import dayjs from 'dayjs';
interface Comment {
  id: number;
  user: string;
  avatar: string;
  content: string;
  chucvu: string;
}

export default function Chitietcongvieccuatoi({
  selectedColor,
}: {
  selectedColor: string;
}) {
  // ========================================
  console.log('dmc t');
  const [data, setData] = useState<any>();
  const [reload, setReload] = useState(false);
  const [isCvconVisible, setIsCvconVisible] = useState(false);
  const [isCvconVisible2, setIsCvconVisible2] = useState(false);
  const [rangeValue, setRangeValue] = useState(0);
  const [numberValue, setNumberValue] = useState(0);
  const [isCompleted2, setIsCompleted2] = useState(false);
  const [subWorkName, setSubWorkName] = useState('');
  const [subWorkDate, setSubWorkDate] = useState('');
  const [subWorkTime, setSubWorkTime] = useState('');
  const [isCommentVisible, setIsCommentVisible] = useState(true); // Thêm trạng thái
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState('');
  const [danhGia, setDanhGia] = useState(0);
  const router = useRouter();
  const type = router?.asPath?.substring(router?.asPath?.search('type=') + 5);
  const jobId = router?.asPath?.slice(
    router?.asPath?.search('id=') + 3,
    router?.asPath?.search('type=') - 1
  );
  useEffect(() => {
    if (type === '1') {
      POST(`me/chi-tiet-cong-viec-cua-toi/project/${jobId}`).then((res) => {
        if (res) {
          setData(res?.data?.jobDetail);
        }
      });
    } else {
      POST(`me/chi-tiet-cong-viec-cua-toi/process/${jobId}`).then((res) => {
        if (res) {
          setData(res?.missionDetail);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  useEffect(() => {
    if (type === '1') {
      setRangeValue(data?.process_percent);
      setDanhGia(data?.nhanvien_danhgia);
      setComments(data?.jobComment);
    } else {
      setRangeValue(data?.result_job);
      setDanhGia(data?.nhanvien_danhgia);
      setComments(data?.missionComment);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    setNumberValue(rangeValue);
  }, [rangeValue]);

  const onClick = () => {
    setIsCvconVisible(true);
  };
  const handleSaveCvmy = () => {
    type === '1'
      ? POST(
          `me/chi-tiet-cong-viec-cua-toi/project/${jobId}/chinh-sua-ket-qua`,
          {
            percentComplete: rangeValue,
          }
        ).then((res) => {
          if (res) {
            setIsCvconVisible(false);
            message.success('Cập nhật kết quả công việc thành công !');
            setReload(!reload);
          }
        })
      : POST(
          `me/chi-tiet-cong-viec-cua-toi/process/${jobId}/chinh-sua-ket-qua`,
          {
            percentComplete: rangeValue,
          }
        ).then((res) => {
          if (res) {
            setIsCvconVisible(false);
            message.success('Cập nhật kết quả công việc thành công !');
            setReload(!reload);
          }
        });
  };
  const handleCancelCvmy = () => {
    setIsCvconVisible(false);
  };

  const handleRangeChange = (event: any) => {
    const newValue = Math.min(100, event.target.value);
    setRangeValue(newValue);
    setNumberValue(newValue);
    setIsCvconVisible(true);
  };

  const handleNumberChange = (event: any) => {
    const newValue = Math.min(100, event.target.value);
    setNumberValue(newValue);
    setRangeValue(newValue);
  };

  // Hàm xử lý khi checkbox thay đổi
  const handleCheckboxChange = (id: any) => {
    //setIsCompleted(!isCompleted); // Đảo ngược trạng thái
    type === '1'
      ? POST(`me/chi-tiet-cong-viec-cua-toi/project/
    ${jobId}/switch-job-of-job/${id}`).then((res) => {
          if (res) {
            setReload(!reload);
          }
        })
      : POST(`me/chi-tiet-cong-viec-cua-toi/process/
    ${jobId}/switch-mission-job/${id}`).then((res) => {
          if (res) {
            setReload(!reload);
          }
        });
  };
  const handleSaveCvcon = () => {
    if (subWorkName && subWorkDate && subWorkTime) {
      if (type === '1') {
        if (
          dayjs(`${data?.date_start} ${data?.time_in}`) <
            dayjs(`${subWorkDate} ${subWorkTime}`) &&
          dayjs(`${subWorkDate} ${subWorkTime}`) <
            dayjs(`${data?.date_end} ${data?.time_out}`)
        ) {
          POST(
            `me/chi-tiet-cong-viec-cua-toi/project/
          ${jobId}/add-job-of-job`,
            {
              job_name_job: subWorkName,
              staff_id: data?.job_member?.id,
              date_limit: subWorkDate,
              hour_limit: subWorkTime,
            }
          ).then((res) => {
            if (res) {
              setIsCvconVisible2(false);
              message.success('Lưu thành công !');
              setReload(!reload);
              setSubWorkName('');
              setSubWorkDate('');
              setSubWorkTime('');
            }
          });
        } else {
          alert(
            `Vui lòng nhập ngày giờ trong khoảng từ ${dayjs(
              `${data?.date_start} ${data?.time_in}`
            ).format('DD/MM/YYYY HH:mm')} đến ${dayjs(
              `${data?.date_end} ${data?.time_out}`
            ).format('DD/MM/YYYY HH:mm')}`
          );
        }
      } else {
        POST(
          `me/chi-tiet-cong-viec-cua-toi/process/
        ${jobId}/add-mission-job`,
          {
            job_name: subWorkName,
            date_limit: subWorkDate,
            hour_limit: subWorkTime,
          }
        ).then((res) => {
          if (res) {
            setIsCvconVisible2(false);
            alert('Lưu thành công !');
            setReload(!reload);
            setSubWorkName('');
            setSubWorkDate('');
            setSubWorkTime('');
          }
        });
      }
    } else {
      alert('Vui lòng điền đầy đủ thông tin công việc con.');
    }
  };
  const huy = () => {
    setSubWorkName('');
    setSubWorkDate('');
    setSubWorkTime('');
    setIsCvconVisible2(false);
  };
  const handleShowCvcon2 = () => {
    setIsCvconVisible2(true);
  };
  const handleNameSubWork = (e: any) => {
    setSubWorkName(e.target.value);
  };
  const handleDateSubWork = (e: any) => {
    setSubWorkDate(e.target.value);
  };
  const handleTimeSubWork = (e: any) => {
    setSubWorkTime(e.target.value);
  };
  // ------------------------------------------------------------------------------------------//
  //Đánh giá
  const handleDanhGia = (e: any) => {
    type === '1'
      ? POST(
          `me/chi-tiet-cong-viec-cua-toi/project/${jobId}/cap-nhap-danh-gia`,
          {
            managerEvaluate: data?.quanli_danhgia,
            employeeEvaluate: e.target.value,
          }
        ).then((res) => {
          if (res) {
            setReload(!reload);
            message.success('Cập nhật thành công');
          }
        })
      : POST(
          `me/chi-tiet-cong-viec-cua-toi/process/${jobId}/cap-nhap-danh-gia`,
          {
            managerEvaluate: data?.quanli_danhgia,
            employeeEvaluate: e.target.value,
          }
        ).then((res) => {
          if (res) {
            setReload(!reload);
            message.success('Cập nhật thành công');
          }
        });
  };

  //
  const addComment = (content: string) => {
    if (content.trim() !== '') {
      type === '1'
        ? POST(`me/chi-tiet-cong-viec-cua-toi/project/${jobId}/add-comment`, {
            content: content,
          }).then((res) => {
            if (res) {
              setReload(!reload);
              setCommentInput('');
            }
          })
        : POST(`me/chi-tiet-cong-viec-cua-toi/process/${jobId}/add-comment`, {
            content: content,
          }).then((res) => {
            if (res) {
              setReload(!reload);
              setCommentInput('');
            }
          });
    }
  };

  // xóa comment
  const deleteComment = (commentId: any) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    setComments(updatedComments);
  };
  const [dueDate, setDueDate] = useState(new Date('2023-09-12'));

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDate = new Date();
      if (isCompleted2 && dueDate < currentDate) {
        setIsCompleted2(true);
      }
    }, 1000); // Kiểm tra mỗi giây

    return () => {
      clearInterval(intervalId); // Dọn dẹp interval khi component unmount
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setIsCompleted2, dueDate]);

  const cvct = () => {
    Router.push('/');
  };

  const handleFileDocUpload = (file: any) => {
    const formData = new FormData();
    formData.append('files', file);
    type === '1'
      ? POST(
          `me/chi-tiet-cong-viec-cua-toi/project/${jobId}/add-file`,
          formData
        ).then((res) => {
          if (res) {
            message.success(`${file.name} tải lên thành công`);
            setReload(!reload);
          }
        })
      : POST(
          `me/chi-tiet-cong-viec-cua-toi/process/${jobId}/add-file`,
          formData
        ).then((res) => {
          if (res) {
            message.success(`${file.name} tải lên thành công`);
            setReload(!reload);
          }
        });
  };

  const handleDeleteDoc = (id: number) => {
    type === '1'
      ? POST(`me/chi-tiet-cong-viec-cua-toi/project/${jobId}
          /delete-file/${id}`).then((res) => {
          if (res) {
            message.success(`Xóa file thành công`);
            setReload(!reload);
          }
        })
      : POST(`me/chi-tiet-cong-viec-cua-toi/process/${jobId}
          /delete-file/${id}`).then((res) => {
          if (res) {
            message.success(`Xóa file thành công`);
            setReload(!reload);
          }
        });
  };

  const items = [
    {
      label: (
        <Upload beforeUpload={handleFileDocUpload} showUploadList={false}>
          <Button>Tải tài liệu từ máy tính</Button>
        </Upload>
      ),
      key: '0',
    },
  ];

  const checkManagement = (): any => {
    let check = false;
    type === '1'
      ? data?.project_management?.forEach((element: any) => {
          if (element?._id === getCurrentID()) {
            check = true;
          }
        })
      : data?.process_management?.forEach((element: any) => {
          if (element?._id === getCurrentID()) {
            check = true;
          }
        });
    return check;
  };
  return (
    <div>
      <div className="margin_20px">
        <div className={styles.box_cv}>
          <div className={styles.chi_tiet}>
            <div
              className={`${styles.text_name} ${selectedColor}`}
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <div className={styles.name}>
                <h4 style={{ margin: '0 10px', fontSize: '16px' }}>
                  {type === '1' ? data?.job_name : data?.name_misssion}
                </h4>
              </div>
              <Image
                unoptimized
                onClick={cvct}
                style={{ margin: '0 20px' }}
                width={20}
                height={20}
                alt=""
                src="https://hungha365.com/storageimage/GV/x-solid.svg"
              />
            </div>
            <div className={styles.chitiet_content}>
              <div className={styles.row_work}>
                <div className={styles.row_work_right}>
                  <p style={{ marginBottom: '0rem' }}>
                    Trong dự án:{' '}
                    <span>
                      {type === '1' ? data?.project_name : data?.process_name}
                    </span>
                  </p>
                  <p style={{ marginBottom: '0rem' }}>
                    Ngày bắt đầu:{' '}
                    <span className={styles.start_work}>
                      {dayjs(`${data?.date_start} ${data?.time_in}`).format(
                        'HH:mm - DD/MM/YYYY'
                      )}
                    </span>
                  </p>
                </div>
                <div className={styles.row_work_left}>
                  <p style={{ marginBottom: '0rem' }}>
                    Đi tới:{' '}
                    <a style={{ color: 'blue', cursor: 'pointer' }}>
                      {type === '1' ? data?.project_name : data?.process_name}
                    </a>
                  </p>
                  <p style={{ marginBottom: '0rem' }}>
                    Ngày kết thúc:{' '}
                    <span className={styles.end_work}>
                      {dayjs(`${data?.date_end} ${data?.time_out}`).format(
                        'HH:mm - DD/MM/YYYY'
                      )}
                    </span>
                  </p>
                </div>
              </div>

              {/*------------------------- Tài liệu đính kèm----------------------- */}
              <div className={styles.doc}>
                <div
                  className={styles.document}
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <span style={{ fontWeight: 'bold' }}>
                      TÀI LIỆU ĐÍNH KÈM
                    </span>
                    <Dropdown
                      menu={{
                        items,
                      }}
                      trigger={['click']}
                    >
                      <a onClick={(e) => e.preventDefault()}>
                        <Space>Thêm tài liệu</Space>
                      </a>
                    </Dropdown>
                  </div>
                  {type === '1'
                    ? data?.jobFile?.map((dt: any, index: number) => (
                        <div
                          key={index}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <p style={{ marginBottom: '0' }}>{dt?.name_file}</p>
                          <div>
                            <a
                              href={GET_EXCEL(
                                `me/chi-tiet-cong-viec-cua-toi/project/${jobId}/download-file/${dt?.id}`
                              )}
                            >
                              <Image
                                unoptimized
                                src={'/down_folder.png'}
                                alt=""
                                height={16}
                                width={16}
                                //style={{cursor:'pointer'}}
                              ></Image>
                            </a>
                            <Image
                              unoptimized
                              onClick={() => handleDeleteDoc(dt?.id)}
                              src={'/xoa_cvc.png'}
                              alt=""
                              height={16}
                              width={16}
                              style={{ marginLeft: '5px', cursor: 'pointer' }}
                            ></Image>
                          </div>
                        </div>
                      ))
                    : data?.missionFile?.map((dt: any, index: number) => (
                        <div
                          key={index}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <p style={{ marginBottom: '0' }}>{dt?.name_file}</p>
                          <div>
                            <a
                              href={GET_EXCEL(
                                `me/chi-tiet-cong-viec-cua-toi/process/${jobId}/download-file/${dt?.id}`
                              )}
                            >
                              <Image
                                unoptimized
                                src={'/down_folder.png'}
                                alt=""
                                height={16}
                                width={16}
                                style={{ cursor: 'pointer' }}
                              ></Image>
                            </a>
                            <Image
                              unoptimized
                              onClick={() => handleDeleteDoc(dt?.id)}
                              src={'/xoa_cvc.png'}
                              alt=""
                              height={16}
                              width={16}
                              style={{ marginLeft: '5px', cursor: 'pointer' }}
                            ></Image>
                          </div>
                        </div>
                      ))}
                </div>
              </div>

              {/*------------------NGƯỜI GIAO VIỆC--------------------------------------------------------  */}
              <div className={styles.add_people}>
                <div className={styles.text_btn_edit}>
                  <span style={{ fontWeight: 'bold' }}>NGƯỜI GIAO VIỆC</span>
                </div>
                <Row>
                  {type === '1'
                    ? data?.project_management?.map(
                        (item: any, index: number) => (
                          <Col
                            xxl={6}
                            xl={8}
                            sm={12}
                            xs={12}
                            key={index}
                            className={styles.people}
                          >
                            <Image
                              unoptimized
                              alt=""
                              width={22}
                              height={22}
                              className={styles.icon_people}
                              src="https://hungha365.com/storageimage/GV/favico.png"
                            />
                            <div className={styles.name_chuvu}>
                              <p style={{ marginBottom: '0rem' }}>
                                {item?.userName}
                              </p>
                              <p>{item?.inForPerson?.employee?.position_id}</p>
                            </div>
                          </Col>
                        )
                      )
                    : data?.process_management?.map(
                        (item: any, index: number) => (
                          <Col
                            xxl={6}
                            xl={8}
                            sm={12}
                            xs={12}
                            key={index}
                            className={styles.people}
                          >
                            <Image
                              unoptimized
                              alt=""
                              width={22}
                              height={22}
                              className={styles.icon_people}
                              src="https://hungha365.com/storageimage/GV/favico.png"
                            />
                            <div className={styles.name_chuvu}>
                              <p style={{ marginBottom: '0rem' }}>
                                {item?.userName}
                              </p>
                              <p>{item?.inForPerson?.employee?.position_id}</p>
                            </div>
                          </Col>
                        )
                      )}
                </Row>
              </div>

              {/* -----------Người thực hiện ============================================================ */}
              <div className={styles.peo_thuchien}>
                <div className={styles.texxt_btn_edit}>
                  <span style={{ fontWeight: 'bold' }}>NGƯỜI THỰC HIỆN</span>
                </div>
                <div>
                  <div className={styles.people_th}>
                    <Image
                      unoptimized
                      width={22}
                      height={22}
                      alt=""
                      className={styles.icon_people_th}
                      src="https://hungha365.com/storageimage/GV/favico.png"
                    />
                    <div className={styles.name_chucvu}>
                      <p style={{ marginBottom: '0rem' }}>
                        {type === '1'
                          ? data?.job_member?.name
                          : data?.misssion_staff_id?.name}
                      </p>
                      <p>
                        {type === '1'
                          ? data?.job_member?.position
                          : data?.misssion_staff_id?.position}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* ==================================================================== */}

              {/*------- Cập nhật công việc ------- */}
              <div className={styles.ket_qua_cv}>
                <div>
                  <div className={styles.capnhat}>
                    <p
                      onClick={onClick}
                      style={{
                        marginBottom: '0rem',
                        color: '#4c5bd4',
                        fontSize: '16px',
                        cursor: 'pointer',
                      }}
                    >
                      Cập nhật công việc
                    </p>
                    <input
                      style={{ color: '#76B51B' }}
                      type="range"
                      value={rangeValue}
                      onChange={handleRangeChange}
                      max={100}
                    />
                  </div>
                  <div className={styles.inp__nhapketqua}>
                    <div>
                      {isCvconVisible && (
                        <div>
                          <div className={styles.kqcongviec}>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                gap: '5px',
                              }}
                            >
                              <textarea
                                value={
                                  type === '1'
                                    ? data?.job_name
                                    : data?.name_misssion
                                }
                                style={{ width: '100%', paddingLeft: '20px' }}
                                disabled
                              />
                              <div className={styles.persen}>
                                <span
                                  style={{ color: '#666666', fontSize: 15 }}
                                >
                                  Hoàn thành
                                </span>
                                <div style={{ display: 'flex' }}>
                                  <input
                                    style={{
                                      color: '#666666',
                                      fontSize: 30,
                                      width: '100%',
                                    }}
                                    type="number"
                                    value={numberValue}
                                    onChange={handleNumberChange}
                                    max={100}
                                  />
                                  <span style={{ padding: '18px 0 0 0' }}>
                                    %
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className={styles.btn}>
                            <button
                              style={{
                                width: '60px',
                                borderRadius: '5px',
                                color: '#ffffff',
                                background: '#FFA800',
                                border: 'none',
                                margin: '0px 15px 0px 15px',
                              }}
                              onClick={handleCancelCvmy}
                            >
                              Hủy
                            </button>
                            <button
                              style={{
                                width: '60px',
                                borderRadius: '5px',
                                color: '#ffffff',
                                background: '#4c5bd4',
                                border: 'none',
                                margin: '0px 15px 0px 15px',
                              }}
                              onClick={handleSaveCvmy}
                            >
                              Lưu
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* -------------------------công việc con--- --------------------------*/}
            <div className={styles.sub_work} style={{ padding: '10px 10px' }}>
              <div className={styles.text_sub_work}>
                <span style={{ fontWeight: 'bold', display: 'flex' }}>
                  CÔNG VIỆC CON{' '}
                  <p style={{ fontWeight: 'normal', color: '#999999' }}>
                    (Chọn để đánh dấu công việc đã hoàn thành):
                  </p>{' '}
                </span>
                {(type === '1' ? data?.jobOfJob : data?.missionJob)?.map(
                  (item: any, index: number) => (
                    <div key={index} className={styles.showcvcon}>
                      <label htmlFor="check" className={styles.checked}>
                        <input
                          type="checkbox"
                          name=""
                          id="check"
                          onChange={() => handleCheckboxChange(item?.id)}
                          checked={item?.status === 0}
                        />
                        <span
                          className={
                            item?.status === 0
                              ? styles.completedName
                              : styles.uncompletedName
                          }
                        >
                          {type === '1' ? item?.job_name_job : item?.job_name}
                        </span>
                      </label>
                      <div className={styles.status}>
                        {item?.status === 0 ? (
                          <span>Đã hoàn thành</span>
                        ) : (
                          <div style={{ display: 'flex' }}>
                            {dayjs() <
                            dayjs(`${item?.date_limit} ${item?.hour_limit}`) ? (
                              <span className="dangthuchien">
                                Đang thực hiện
                              </span>
                            ) : (
                              <span className="quahan">Quá hạn</span>
                            )}
                          </div>
                        )}
                      </div>
                      <p className={styles.peodo}>
                        <Image
                          unoptimized
                          width={20}
                          height={20}
                          alt=""
                          src={'/anh100.png'}
                        />
                        <span>{`Giao cho: ${item?.staff_name}`}</span>
                      </p>
                      <p className={styles.thoigian}>
                        {dayjs(
                          `${item?.date_limit} ${item?.hour_limit}`
                        ).format('HH:mm - DD/MM/YYYY')}
                      </p>
                      <DropDot
                        type={type}
                        id={Number(jobId)}
                        data={item}
                        reload={reload}
                        setReload={setReload}
                        message={`Vui lòng nhập ngày giờ trong khoảng từ ${dayjs(
                          `${data?.date_start} ${data?.time_in}`
                        ).format('DD/MM/YYYY HH:mm')} đến ${dayjs(
                          `${data?.date_end} ${data?.time_out}`
                        ).format('DD/MM/YYYY HH:mm')}`}
                      />
                    </div>
                  )
                )}
              </div>
            </div>
            {/* ////////////////// */}
            <div className={styles.sub_work}>
              <div className={styles.text_sub_work}>
                <div>
                  <div>
                    <input
                      value={subWorkName}
                      style={{ paddingLeft: '18px', width: '50%' }}
                      className={styles.ip_sub_work}
                      placeholder="Nhập tên công việc con"
                      onClick={handleShowCvcon2}
                      onChange={handleNameSubWork}
                    />
                  </div>
                </div>
                {isCvconVisible2 && (
                  <div>
                    <div className={styles.cvcon}>
                      <div style={{ display: 'flex' }}>
                        <Image
                          unoptimized
                          alt=""
                          width={20}
                          height={20}
                          src="https://hungha365.com/storageimage/GV/Group 626671 (1).png"
                          style={{ margin: '7px' }}
                        />
                        <input
                          value={
                            type === '1'
                              ? data?.job_member?.name
                              : data?.misssion_staff_id?.name
                          }
                          type="text"
                          style={{
                            width: '100%',
                            backgroundColor: '#CCCCCC',
                            border: '1px solid black',
                            padding: '5px',
                          }}
                          readOnly
                        />
                      </div>
                      <div className={styles.thoigian}>
                        <input
                          value={subWorkDate}
                          type="date"
                          style={{
                            width: '50%',
                            border: 'none',
                            paddingRight: '40px',
                          }}
                          onChange={handleDateSubWork}
                        />
                        <input
                          value={subWorkTime}
                          type="time"
                          style={{
                            width: '50%',
                            border: 'none',
                            paddingRight: '45px',
                          }}
                          onChange={handleTimeSubWork}
                        />
                      </div>
                    </div>
                    <button
                      style={{
                        width: '60px',
                        borderRadius: '10px',
                        color: '#ffffff',
                        background: '#FFA800',
                        border: 'none',
                        margin: '0px 15px 0px 15px',
                      }}
                      onClick={huy}
                    >
                      Hủy
                    </button>
                    <button
                      style={{
                        width: '60px',
                        borderRadius: '10px',
                        color: '#ffffff',
                        background: '#4c5bd4',
                        border: 'none',
                        margin: '0px 15px 0px 15px',
                      }}
                      onClick={handleSaveCvcon}
                    >
                      Lưu
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* ========================================================================== */}
            <div className={styles.danh_gia}>
              {/* ===================================================================== */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div
                  className={styles.nhanvien}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <p style={{ marginBottom: '0rem' }}>NHÂN VIÊN ĐÁNH GIÁ:</p>
                  <select
                    value={data?.nhanvien_danhgia}
                    style={{
                      width: '145px',
                      height: 34,
                      marginLeft: '10px',
                      color:
                        data?.nhanvien_danhgia === 1
                          ? 'blue'
                          : data?.nhanvien_danhgia === 2
                          ? 'green'
                          : data?.nhanvien_danhgia === 3
                          ? '#32CD32'
                          : data?.nhanvien_danhgia === 4
                          ? 'orange'
                          : 'red',
                      border: `1px solid ${
                        data?.nhanvien_danhgia === 1
                          ? 'blue'
                          : data?.nhanvien_danhgia === 2
                          ? 'green'
                          : data?.nhanvien_danhgia === 3
                          ? '#32CD32'
                          : data?.nhanvien_danhgia === 4
                          ? 'orange'
                          : 'red'
                      }`,
                    }}
                    onChange={handleDanhGia}
                  >
                    <option value={1} style={{ color: 'blue' }}>
                      Chờ đánh giá
                    </option>
                    <option value={2} style={{ color: 'green' }}>
                      Vượt KPI
                    </option>
                    <option value={3} style={{ color: '#32CD32' }}>
                      Đạt yêu cầu
                    </option>
                    <option value={4} style={{ color: 'orange' }}>
                      Chưa đạt yêu cầu
                    </option>
                    <option value={5} style={{ color: 'red' }}>
                      Thất bại
                    </option>
                  </select>
                </div>
                <div
                  className={styles.quan_ly}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <p style={{ marginBottom: '0rem' }}>QUẢN LÝ ĐÁNH GIÁ:</p>
                  <button
                    style={{
                      width: '145px',
                      height: 34,
                      marginLeft: '10px',
                      color:
                        data?.quanli_danhgia === 1
                          ? 'blue'
                          : data?.quanli_danhgia === 2
                          ? 'green'
                          : data?.quanli_danhgia === 3
                          ? '#32CD32'
                          : data?.quanli_danhgia === 4
                          ? 'orange'
                          : 'red',
                      border: `1px solid ${
                        data?.quanli_danhgia === 1
                          ? 'blue'
                          : data?.quanli_danhgia === 2
                          ? 'green'
                          : data?.quanli_danhgia === 3
                          ? '#32CD32'
                          : data?.quanli_danhgia === 4
                          ? 'orange'
                          : 'red'
                      }`,
                    }}
                  >
                    {data?.quanli_danhgia === 1
                      ? 'Chờ đánh giá'
                      : data?.quanli_danhgia === 2
                      ? 'Vượt KPI'
                      : data?.quanli_danhgia === 3
                      ? 'Đạt yêu cầu'
                      : data?.quanli_danhgia === 4
                      ? 'Chưa đạt yêu cầu'
                      : 'Thất bại'}
                  </button>
                </div>
              </div>
            </div>

            {/* ========================================================== */}

            {isCommentVisible && (
              <div style={{ padding: '10px' }}>
                <label className={styles.comment}>Bình luận</label>
                <div
                  className={`all_cmt ${styles.dashed}`}
                  style={{ margin: '10px' }}
                >
                  {comments?.map((comment: any, index: number) => (
                    <div
                      key={index}
                      className={`ach_cmt ${styles.cmt}`}
                      style={{ display: 'flex', marginTop: '10px' }}
                    >
                      <div className="tnbl_cmt" style={{ display: 'flex' }}>
                        <div className="avt_nbl">
                          <Image
                            unoptimized
                            width={33}
                            height={33}
                            src={'/app1673583842_e168.jpg'}
                            alt=""
                            style={{ borderRadius: '50%' }}
                          />
                        </div>
                        <div
                          className="name_nbl"
                          style={{ paddingLeft: '10px' }}
                        >
                          <h4
                            style={{
                              fontSize: '14px',
                              fontWeight: 'bold',
                              color: '#4c5bd4',
                              margin: '0 0 4px',
                              width: 'auto',
                            }}
                          >
                            {comment?.staff_name}
                          </h4>
                          <p style={{ margin: '0' }}>{comment?.position}</p>
                        </div>
                      </div>

                      <div
                        className="vt_cmt"
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          width: '100%',
                          float: 'right',
                        }}
                      >
                        <p
                          className="vt_cmt_nd"
                          style={{
                            paddingLeft: '10px',
                            margin: '0',
                            color: '#4c5bd4',
                            fontSize: 15,
                          }}
                        >
                          {type === '1' ? comment?.conent : comment?.content}
                        </p>
                        {checkManagement() ? (
                          <div>
                            <DelCMT
                              type={type}
                              id={`${jobId}`}
                              commentId={comment?.id}
                              reload={reload}
                              setReload={setReload}
                            />
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <input
                  style={{ width: '100%', height: 40 }}
                  type="text"
                  placeholder="Nhập bình luận và nhấn Enter để đăng"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addComment(commentInput);
                    }
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
