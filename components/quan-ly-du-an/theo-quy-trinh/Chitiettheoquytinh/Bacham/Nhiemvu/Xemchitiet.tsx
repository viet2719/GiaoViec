import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import { Col, Dropdown, InputNumber, Row, Slider, Space, message } from 'antd';

import { Button, Input, Upload } from 'antd';
import styles from './Xemchitiet.module.css';
import styless from './nhiemvu.module.scss';

import Btn_chuyenve from './Btn_chuyenve';
import Btn_thatbai from './Btn_thatbai';
import Chamchitiet from './Chamchitiet';
import Btn_chuyentiep from './Btn_chuyentiep';
import NgThuchien from './NgThuchien';
import NgGiaoViec from './NgGiaoViec';
import NgTheoDoi from './NgTheoDoi';
import DelCMT from './DelCMT';
import Link from 'next/link';
import Children1 from './componentchitiet/Children1';
import ChildrenMota from './componentchitiet/ChildrenMota';
import { POST } from '@/pages/api/auth';
import dayjs from 'dayjs';
import DropDot from './modal/DropDot';

interface Comment {
  id: number;
  user: string;
  avatar: string;
  content: string;
  chucvu: string;
}
interface Props {
  startDate: Date;
  endDate: Date;
}

export default function Chitietcv({
  setActiveKey,
}: {
  setActiveKey: Function;
}) {
  const renderApplyKey = () => {
    setActiveKey('chi-tiet-theo-quy-trinh');
  };

  //--------------------- -------CHỈNH SỬA MÔ TẢ-----------------------------------------------//

  const [isElipVisible, setIsElipVisible] = useState(true);
  const [elipContent, setElipContent] = useState(''); // Nội dung mặc định cho .elip
  const [editedElipContent, setEditedElipContent] = useState(''); // Lưu trữ nội dung được chỉnh sửa
  const [detailTask, setDetailTask] = useState<any>([]);
  const [userInfo, setUserInfo] = useState<any>([]);
  const [listSubWork, setListSubWork] = useState<any[]>([]);
  const [subWorkName, setSubWorkName] = useState('');
  const [subWorkDate, setSubWorkDate] = useState('');
  const [subWorkTime, setSubWorkTime] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [rangeValue, setRangeValue] = useState<number>(0);
  const [idTask, setIdTask] = useState<string | null>(
    localStorage.getItem('task_id')
  );
  const [reload, setReload] = useState<boolean>(true);
  //useEffect
  useEffect(() => {
    try {
      POST(`projects/chi-tiet-nhiem-vu/${idTask}`).then((res) => {
        setDetailTask(res?.data);
        setUserInfo(res?.listRole);
        setListSubWork(res?.data?.listSubJob);
        setRangeValue(res?.data?.mission?.result_job);
        const tempComments = res?.data.listComment?.map((ct: any) => {
          const newComment: Comment = {
            id: ct.id,
            user: userInfo?.name,
            avatar: '/app1673583842_e168.jpg',
            content: ct.content,
            chucvu: 'nhanvien',
          };
          return newComment;
        });
        if (tempComments) {
          setComments(tempComments.reverse());
        }
        setReload(false);
        //set mô tả
      });
    } catch (error) {
      console.log(error);
    }
  }, [userInfo?.name, reload]);
  const handleEditClick = () => {
    setIsElipVisible(!isElipVisible);
    setEditedElipContent(elipContent); // Lưu nội dung hiện tại của .elip vào biến editedElipContent
  };

  const handleSaveClick = () => {
    setIsElipVisible(true); // Hiện lại .elip sau khi ấn nút Lưu
    setElipContent(editedElipContent); // Cập nhật nội dung của .elip với nội dung được chỉnh sửa
    alert('Lưu thành công !');
  };

  const handleCancelClick = () => {
    setIsElipVisible(true); // Hiện lại .elip sau khi hủy chỉnh sửa
    setEditedElipContent(''); // Xóa nội dung chỉnh sửa
  };
  // ------------------------------------------------------------------------------------------//

  const handleNameSubWork = (e: any) => {
    setSubWorkName(e.target.value);
  };

  const handleDateSubWork = (e: any) => {
    setSubWorkDate(e.target.value);
  };

  const handleTimeSubWork = (e: any) => {
    setSubWorkTime(e.target.value);
  };

  const handleSaveCvcon = () => {
    if (subWorkName && subWorkDate && subWorkTime) {
      if (
        dayjs.unix(detailTask?.mission?.hour_complete) >
        dayjs(`${subWorkDate} ${subWorkTime}`)
      ) {
        POST(
          `projects/chi-tiet-nhiem-vu/
          ${idTask}/add-mission-job`,
          {
            job_name: subWorkName,
            date_limit: subWorkDate,
            hour_limit: subWorkTime,
          }
        ).then((res) => {
          if (res) {
            setIsCvconVisible(false);
            message.success('Lưu thành công !');
            setSubWorkName('');
            setSubWorkDate('');
            setSubWorkTime('');
            setReload(!reload);
          } else {
            message.error(
              `Vui lòng nhập ngày giờ trước thời gian hoàn thành ${dayjs
                .unix(detailTask?.mission?.hour_complete)
                .format('DD/MM/YYYY HH:mm')}`
            );
          }
        });
      }
    }
  };

  const handleShowCvcon = () => {
    setIsCvconVisible(true);
  };

  const handleCancelCvcon = () => {
    setSubWorkName('');
    setSubWorkDate('');
    setSubWorkTime('');
    setIsCvconVisible(false);
  };
  const handleRangeChange = (event: any) => {
    const newValue = Math.min(100, event.target.value);
    setRangeValue(newValue);
    setShowResult(true);
  };

  const handleCancelCvmy = () => {
    setShowResult(false);
  };

  const handleSaveCvmy = () => {
    POST(`projects/chi-tiet-nhiem-vu/${idTask}/chinh-sua-ket-qua`, {
      percentComplete: rangeValue,
    }).then((res) => {
      if (res) {
        setReload(!reload);
        message.success('Cập nhật kết quả công việc thành công !');
        setShowResult(false);
      }
    });
  };

  const handleDanhGia = (e: any) => {
    POST(`projects/chi-tiet-nhiem-vu/${idTask}/cap-nhap-danh-gia`, {
      managerEvaluate: e.target.value,
      employeeEvaluate: detailTask?.mission?.nhanvien_danhgia,
    }).then((res) => {
      if (res) {
        message.success('Đánh giá công việc thành công');
        setReload(!reload);
      }
    });
  };

  const handleCheckboxChange = (id: number) => {
    POST(
      `projects/chi-tiet-nhiem-vu/${id}/switch-mission-job/${idTask}`,
      {}
    ).then((res) => {
      if (res) {
        setReload(!reload);
      }
    });
  };
  const [isCommentVisible, setIsCommentVisible] = useState(true); // Thêm trạng thái
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState('');
  const addComment = (content: string) => {
    if (content.trim() !== '') {
      POST(
        `projects/chi-tiet-nhiem-vu/${detailTask?.mission.id}/them-comment`,
        {
          commentMessage: content,
        }
      )
        .then(() => {
          POST(`projects/chi-tiet-nhiem-vu/${idTask}`).then((res) => {
            const tempComments = res?.data.listComment?.map((ct: any) => {
              const newComment: Comment = {
                id: ct.id,
                user: userInfo.name,
                avatar: '/app1673583842_e168.jpg',
                content: ct.content,
                chucvu: 'nhanvien',
              };
              return newComment;
            });
            if (tempComments) {
              setComments(tempComments.reverse());
            }
          });
        })
        .catch((error) => {
          console.log(error);
          alert('Thêm comment thất bại');
        });
      setCommentInput('');
    }
  };

  //xóa comment
  const deleteComment = (commentId: any) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );

    POST(
      `projects/chi-tiet-nhiem-vu/${detailTask.mission.id}/xoa-comment/${commentId}`
    )
      .then((res) => {
        if (res.result) {
          setComments(updatedComments);
        } else {
          alert('Xóa comment thất bại');
        }
      })
      .catch((error) => {
        console.log(error);
        alert('Xóa comment thất bại');
      });
  };
  const [isCvconVisible, setIsCvconVisible] = useState(false);

  // useEffect()
  const handleUpload = (file: File) => {
    // Gọi API để tải tệp lên
    // Ví dụ: sử dụng POST để gửi yêu cầu đến URL action
    const formData = new FormData();
    formData.append('files', file);
    POST(`projects/chi-tiet-nhiem-vu/${idTask}/add-file`, formData)
      .then((response: any) => {
        if (response.result) {
          alert(`${file.name} đã được tải lên thành công`);
        } else {
          alert(`${file.name} tải lên thất bại.`);
        }
      })
      .catch((error) => {
        console.log(error);
        alert(`${file.name} tải lên thất bại.`);
      });
  };

  const uploadProps: any = {
    customRequest: ({ file }: { file: File }) => {
      handleUpload(file);
    },
    showUploadList: false,
    onChange(info: any) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} đã được tải lên thành công`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} tải lên thất bại.`);
      }
    },
  };

  const items = [
    {
      label: (
        <Upload {...uploadProps}>
          <Button>Tải tài liệu từ máy tính</Button>
        </Upload>
      ),
      key: '0',
    },
  ];
  const item = [
    {
      label: <p>Chờ đánh giá</p>,
      key: '0',
    },
  ];

  return (
    <div>
      <div className="margin_20px">
        <div className={styles.box_cv}>
          <div className={styles.chi_tiet}>
            <div
              className={styles.text_name}
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <div className={styles.name} onClick={renderApplyKey}>
                <Image
                  unoptimized
                  width={7}
                  height={13}
                  alt=""
                  src="https://hungha365.com/storageimage/GV/img15.png"
                />
                <h4 style={{ margin: '0 0 0 10px', fontSize: '16px' }}>
                  {detailTask?.mission?.name_misssion}
                </h4>
              </div>
              <Chamchitiet />
            </div>

            <div className={styles.chitiet_content}>
              <Children1 data={detailTask?.mission} />
              {/*---------------------- Mô tả giai đoạn------------------------- */}
              <ChildrenMota data={detailTask?.stageByMission} />

              {/*--------------------- Mô tả công việc -------------------------*/}
              <div className={styles.mota}>
                <div className={styles.mota_edit}>
                  <p
                    className={styles.text_title}
                    style={{ fontWeight: 'bold', marginBottom: '0rem' }}
                  >
                    MÔ TẢ CÔNG VIỆC
                  </p>
                  <p
                    className={styles.btn_edit}
                    style={{
                      color: '#4c5bd4',
                      cursor: 'pointer',
                      marginBottom: '0rem',
                    }}
                    onClick={handleEditClick}
                  >
                    Chỉnh sửa
                  </p>
                </div>
                <div className={styles.text_gray}>
                  {isElipVisible && (
                    <p
                      className={styles.click_none}
                      style={{ marginBottom: '0rem' }}
                    >
                      <Image
                        unoptimized
                        width={22}
                        height={22}
                        alt=""
                        className={styles.img_mota}
                        src="https://hungha365.com/storageimage/GV/Group 626978.png"
                      />
                      <span className={styles.elip}>
                        {elipContent ||
                          detailTask.mission?.misssion_description}
                      </span>
                    </p>
                  )}
                </div>
                <div className={styles.form_add_desc}>
                  {!isElipVisible && (
                    <form action="" method="post">
                      <textarea
                        style={{ width: '100%' }}
                        value={
                          editedElipContent ||
                          detailTask.mission.misssion_description
                        }
                        onChange={(e) => setEditedElipContent(e.target.value)}
                        name="add_desc_work"
                        id="add_desc_work"
                      ></textarea>
                      <br />
                      <button
                        type="button"
                        onClick={handleCancelClick}
                        className={styles.close_work}
                      >
                        Hủy
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveClick}
                        className={styles.save_work}
                      >
                        Lưu
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/*------------------------- Tài liệu đính kèm----------------------- */}
              <div className={styles.doc}>
                <div className={styles.document}>
                  <span style={{ fontWeight: 'bold' }}>TÀI LIỆU ĐÍNH KÈM</span>
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
              </div>

              {/*--------------------------------------------------------------------------  */}
              <div className={styles.add_people}>
                <div className={styles.text_btn_edit}>
                  <span style={{ fontWeight: 'bold' }}>
                    NGƯỜI GIAO VIỆC CỦA QUY TRÌNH
                  </span>

                  <NgGiaoViec />
                </div>
                <div className={styles.people}>
                  <Image
                    unoptimized
                    alt=""
                    width={22}
                    height={22}
                    className={styles.icon_people}
                    src="https://hungha365.com/storageimage/GV/favico.png"
                  />
                  <div className={styles.name_chuvu}>
                    <p style={{ marginBottom: '0rem' }}>kien</p>
                    <p>nhan vien</p>
                  </div>
                </div>
                <p
                  className={styles.chucvu}
                  style={{ marginBottom: '0rem', color: '#474747' }}
                >
                  Chức vụ khác
                </p>
              </div>

              {/* -----------============================================================ */}
              <div className={styles.peo_thuchien}>
                <div className={styles.texxt_btn_edit}>
                  <span style={{ fontWeight: 'bold' }}>NGƯỜI THỰC HIỆN</span>
                  {/*  */}
                  <NgThuchien />
                </div>
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
                    <p style={{ marginBottom: '0rem' }}>kien</p>
                    <p>nhan vien</p>
                  </div>
                </div>
                <p
                  className={styles.chucvukhac}
                  style={{ marginBottom: '0rem', color: '#474747' }}
                >
                  Chức vụ khác
                </p>
              </div>
              {/* ==================================================================== */}
              <div className={styles.theo_doi}>
                <div
                  className={styles.peo_theodoi}
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <span style={{ fontWeight: 'bold' }}>NGƯỜI THEO DÕI</span>
                  {/* ----------------- */}
                  <NgTheoDoi />
                </div>
                <p
                  className={styles.data_theo_doi}
                  style={{
                    marginBottom: '0rem',
                    color: '#474747',
                    fontSize: '16px',
                  }}
                >
                  không có dữ liệu người theo dõi
                </p>
              </div>
              <div className={styless.ket_qua_cv}>
                <div>
                  <div className={styless.capnhat}>
                    <p
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
                  <div className={styless.inp__nhapketqua}>
                    <div>
                      {showResult && (
                        <div>
                          <div className={styless.kqcongviec}>
                            <div
                              style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                gap: '5px',
                              }}
                            >
                              <textarea
                                value={detailTask?.mission?.name_misssion}
                                style={{ width: '100%', paddingLeft: '20px' }}
                                disabled
                              />
                              <div className={styless.persen}>
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
                                    value={rangeValue}
                                    onChange={handleRangeChange}
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
                                margin: '15px',
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
                                margin: '15px',
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
              {/* -------------------------công việc con--- --------------------------*/}
              <div className={styles.sub_work}>
                <div className={styles.text_sub_work}>
                  <span style={{ fontWeight: 'bold' }}>CÔNG VIỆC CON </span>
                  {listSubWork?.map((item: any, index: number) => (
                    <div key={index} className={styless.showcvcon}>
                      <label htmlFor="check" className={styless.checked}>
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
                              ? styless.completedName
                              : styless.uncompletedName
                          }
                        >
                          {item?.job_name}
                        </span>
                      </label>
                      <div className={styless.status}>
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
                      <p className={styless.peodo}>
                        <Image
                          unoptimized
                          width={20}
                          height={20}
                          alt=""
                          src={'/anh100.png'}
                        />
                        <span>{`Giao cho: ${item?.staff_id}`}</span>
                      </p>
                      <p className={styless.thoigian}>
                        {dayjs(
                          `${item?.date_limit} ${item?.hour_limit}`
                        ).format('HH:mm - DD/MM/YYYY')}
                      </p>
                      <DropDot
                        id={idTask}
                        data={item}
                        reload={reload}
                        setReload={setReload}
                        message={'Vui lòng nhập ngày giờ đúng'}
                        //message = {`Vui lòng nhập ngày giờ trong khoảng từ ${dayjs(`${data?.date_start} ${data?.time_in}`).format('DD/MM/YYYY HH:mm')} đến ${dayjs(`${data?.date_end} ${data?.time_out}`).format('DD/MM/YYYY HH:mm')}`}
                      />
                    </div>
                  ))}
                  <div style={{ marginTop: '10px' }}>
                    <div>
                      <input
                        style={{ paddingLeft: '18px', width: '50%' }}
                        className={styles.ip_sub_work}
                        placeholder="Nhập tên công việc con"
                        value={subWorkName}
                        onClick={handleShowCvcon}
                        onChange={handleNameSubWork}
                      />
                    </div>
                  </div>
                  {isCvconVisible && (
                    <div>
                      <div className={styles.cvcon}>
                        <div style={{ display: 'flex' }}>
                          <Image
                            unoptimized
                            alt=""
                            width={24}
                            height={20}
                            src="https://hungha365.com/storageimage/GV/Group 626671 (1).png"
                            style={{ paddingRight: '10px' }}
                          />
                          <input
                            type="text"
                            style={{ width: '100%' }}
                            value={detailTask?.mission?.misssion_staff_id}
                            readOnly
                          />
                        </div>
                        <div className={styles.thoigian}>
                          <input
                            type="date"
                            style={{
                              width: '50%',
                              border: 'none',
                              paddingRight: '40px',
                            }}
                            onChange={handleDateSubWork}
                          />
                          <input
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
                        onClick={handleCancelCvcon}
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
                <div className={styles.trangthai}>
                  <p style={{ marginBottom: '0rem' }}>TRẠNG THÁI NHIỆM VỤ: </p>
                  <div className={styles.trangthaicon}>
                    <span>Đang thực hiện</span>
                    <span>
                      <Image
                        unoptimized
                        width={13}
                        height={13}
                        alt=""
                        src="https://hungha365.com/storageimage/GV/clock.png"
                      />{' '}
                      Thời hạn 11:11 18/08/2023
                    </span>
                  </div>
                </div>

                {/* ===================================================================== */}
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div
                    className={styles.nhanvien}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <p style={{ marginBottom: '0rem' }}>NHÂN VIÊN ĐÁNH GIÁ:</p>
                    <button
                      style={{
                        width: '145px',
                        height: 34,
                        marginLeft: '10px',
                        color:
                          detailTask?.mission?.nhanvien_danhgia === 1
                            ? 'blue'
                            : detailTask?.mission?.nhanvien_danhgia === 2
                            ? 'green'
                            : detailTask?.mission?.nhanvien_danhgia === 3
                            ? '#32CD32'
                            : detailTask?.mission?.nhanvien_danhgia === 4
                            ? 'orange'
                            : 'red',
                        border: `1px solid ${
                          detailTask?.mission?.nhanvien_danhgia === 1
                            ? 'blue'
                            : detailTask?.mission?.nhanvien_danhgia === 2
                            ? 'green'
                            : detailTask?.mission?.nhanvien_danhgia === 3
                            ? '#32CD32'
                            : detailTask?.mission?.nhanvien_danhgia === 4
                            ? 'orange'
                            : 'red'
                        }`,
                      }}
                    >
                      {detailTask?.mission?.nhanvien_danhgia === 1
                        ? 'Chờ đánh giá'
                        : detailTask?.mission?.nhanvien_danhgia === 2
                        ? 'Vượt KPI'
                        : detailTask?.mission?.nhanvien_danhgia === 3
                        ? 'Đạt yêu cầu'
                        : detailTask?.mission?.nhanvien_danhgia === 4
                        ? 'Chưa đạt yêu cầu'
                        : 'Thất bại'}
                    </button>
                  </div>

                  {/* ====================================================== */}
                  <div
                    className={styles.quan_ly}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <p
                      style={{
                        marginBottom: '0rem',
                      }}
                    >
                      QUẢN LÝ ĐÁNH GIÁ:
                    </p>
                    <select
                      value={detailTask?.mission?.quanli_danhgia}
                      style={{
                        width: '145px',
                        height: 34,
                        marginLeft: '10px',
                        color:
                          detailTask?.mission?.quanli_danhgia === 1
                            ? 'blue'
                            : detailTask?.mission?.quanli_danhgia === 2
                            ? 'green'
                            : detailTask?.mission?.quanli_danhgia === 3
                            ? '#32CD32'
                            : detailTask?.mission?.quanli_danhgia === 4
                            ? 'orange'
                            : 'red',
                        border: `1px solid ${
                          detailTask?.mission?.quanli_danhgia === 1
                            ? 'blue'
                            : detailTask?.mission?.quanli_danhgia === 2
                            ? 'green'
                            : detailTask?.mission?.quanli_danhgia === 3
                            ? '#32CD32'
                            : detailTask?.mission?.quanli_danhgia === 4
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
                </div>
              </div>

              {/* ========================================================== */}

              {isCommentVisible && (
                <div>
                  <label className={styles.comment}>Bình luận</label>
                  <div className="all_cmt" style={{ margin: '10px' }}>
                    {comments.map((comment) => (
                      <div
                        key={comment.id}
                        className={`ach_cmt ${styles.cmt}`}
                        style={{ display: 'flex' }}
                      >
                        <div className="tnbl_cmt" style={{ display: 'flex' }}>
                          <div className="avt_nbl">
                            <Image
                              unoptimized
                              width={33}
                              height={33}
                              src={comment.avatar}
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
                              }}
                            >
                              {comment.user}
                            </h4>
                            <p style={{ margin: '0' }}>{comment.chucvu}</p>
                          </div>
                        </div>

                        <div
                          className="vt_cmt"
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
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
                            {comment.content}
                          </p>
                          <p
                            className={styles.delete_comment_button}
                            onClick={() => deleteComment(comment.id)}
                          >
                            Xóa
                          </p>
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
    </div>
  );
}
