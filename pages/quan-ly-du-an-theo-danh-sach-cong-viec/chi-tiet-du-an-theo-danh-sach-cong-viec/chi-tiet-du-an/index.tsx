import React, { useState, useEffect, useContext } from 'react';

import Image from 'next/image';
import { Col, Dropdown, InputNumber, Row, Slider, Space } from 'antd';

import { Button, Input, Upload } from 'antd';
import styles from './ctda.module.scss';
import NgThucHien from '@/components/quan-ly-du-an/theo-quy-trinh/Chitiettheoquytinh/Bacham/Nhiemvu/NgThuchien';
import NgThuchien from '@/components/quan-ly-du-an/theo-quy-trinh/Chitiettheoquytinh/Bacham/Nhiemvu/NgThuchien';
import NgGiaoViec from '@/components/quan-ly-du-an/theo-quy-trinh/Chitiettheoquytinh/Bacham/Nhiemvu/NgGiaoViec';
import NgTheoDoi from '@/components/quan-ly-du-an/theo-quy-trinh/Chitiettheoquytinh/Bacham/Nhiemvu/NgTheoDoi';
import DelCmtDA from '@/components/quan-ly-du-an/theo-quy-trinh/Chitiettheoquytinh/Bacham/Nhiemvu/DelCmtDA';
import Link from 'next/link';
import { POST } from '@/pages/api/auth';
import { ListContext } from 'antd/es/list/context';
import { ListEpContext } from '@/components/context/listEpContext';
import { compareDateJobOfJob } from '@/utils/dataUtils';
import { number } from 'yup';
import dayjs from 'dayjs';
import { chucVu } from '@/utils/dataUtils';

interface Comment {
  id: number;
  user: string;
  avatar: string;
  conent: string;
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
    setActiveKey('chi-tiet-theo-danh-sach');
  };

  //--------------------- -------CHỈNH SỬA MÔ TẢ-----------------------------------------------//

  const detailJob = JSON.parse(String(localStorage.getItem('detailJob')));
  const listEp = useContext(ListEpContext);
  const [reload, setReload] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [rangeValue, setRangeValue] = useState<number>(0);
  const [jobOfJob, setJobOfJob] = useState([]);
  const [member, setMember]: any = useState();
  const [save, setSave]: any = useState(false);
  const [manager, setManager]: any = useState();
  const [isElipVisible, setIsElipVisible] = useState(true);
  const [elipContent, setElipContent] = useState(detailJob.job_description); // Nội dung mặc định cho .elip
  const [editedElipContent, setEditedElipContent] = useState(''); // Lưu trữ nội dung được chỉnh sửa
  const [project, setProject]: any = useState();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filteredManagement, setFilteredManagement]: any = useState([]);
  const [filteredMember, setFilteredMember]: any = useState([]);
  const [filteredFollower, setFilteredFollower]: any = useState([]);

  useEffect(() => {
    POST(
      `projects/chi-tiet-du-an-theo-danh-sach-cong-viec/${detailJob.project_id}`
    ).then((res) => {
      if (res) {
        setProject(res?.data?.project);
        setManager(res?.data?.project?.project_management);
        let listEpManager = listEp?.filter((itm: any) =>
          (res?.data?.project?.project_management).includes(itm?._id.toString())
        );
        setFilteredManagement(listEpManager);
        let listEpFollower = listEp?.filter((itm: any) =>
          (res?.data?.project?.project_follow).includes(itm?._id.toString())
        );
        setFilteredFollower(listEpFollower);
      }
    });

    POST(`projects/chi-tiet-du-an/${detailJob.job_id}`).then((res) => {
      if (res) {
        setJobOfJob(res?.data?.jobDetail?.jobOfJob);
      }
    });
  }, [reload, listEp]);

  useEffect(() => {
    var listMember: any = listEp?.filter((itm: any) =>
      detailJob?.job_member?.includes(itm?._id.toString())
    );
    setMember(listMember[0]);
  }, [listEp]);

  useEffect(() => {
    if (save) {
      POST(
        `projects/chi-tiet-du-an/${detailJob.job_id}/sua-mo-ta-cho-cong-viec`,
        { job_description: elipContent }
      ).then((res) => {
        if (res) {
          alert('Lưu thành công !');
          setSave(false);
        }
      });
    }
  }, [save]);

  const handleEditClick = () => {
    setIsElipVisible(!isElipVisible);
    setEditedElipContent(elipContent); // Lưu nội dung hiện tại của .elip vào biến editedElipContent
  };

  const handleSaveClick = () => {
    setIsElipVisible(true); // Hiện lại .elip sau khi ấn nút Lưu
    setSave(true);
    setElipContent(editedElipContent); // Cập nhật nội dung của .elip với nội dung được chỉnh sửa
  };

  const handleCancelClick = () => {
    setIsElipVisible(true); // Hiện lại .elip sau khi hủy chỉnh sửa
    setEditedElipContent(''); // Xóa nội dung chỉnh sửa
  };
  // ========================================
  const [isCvconVisible, setIsCvconVisible] = useState(false);
  const [subWorkName, setSubWorkName] = useState('');
  const [subWorkDate, setSubWorkDate] = useState('');
  const [subWorkTime, setSubWorkTime] = useState('');
  const handleSaveCvcon = () => {
    if (subWorkName && subWorkDate && subWorkTime) {
      setIsCvconVisible(false);
      if (compareDateJobOfJob(detailJob, subWorkDate, subWorkTime)) {
        return;
      }
      POST(`projects/chi-tiet-du-an/${detailJob.job_id}/add-job-of-job`, {
        job_name_job: subWorkName,
        staff_id: member._id,
        date_limit: subWorkDate,
        hour_limit: subWorkTime,
      }).then((response) => {
        alert('Lưu thành công !');
        setReload(!reload);
      });
      // Thực hiện lưu công việc con
    } else {
      alert('Vui lòng điền đầy đủ thông tin công việc con.');
    }
  };

  // ------------------------------------------------------------------------------------------//

  const [isCommentVisible, setIsCommentVisible] = useState(true); // Thêm trạng thái
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState('');
  const [file, setFile] = useState<any>();

  useEffect(() => {
    POST(`projects/chi-tiet-du-an/${detailJob.job_id}`).then((response) => {
      setComments(response?.data?.jobDetail?.jobComment);
      setFile(response?.data?.jobDetail?.MyJobFileProjects);
    });
  }, [reload]);

  const addComment = (conent: string) => {
    if (conent.trim() !== '') {
      POST(`projects/chi-tiet-du-an/${detailJob.job_id}/add-comment`, {
        content: conent,
      }).then((res) => {
        setReload(!reload);
      });
      const newComment: Comment = {
        id: comments.length + 1,
        user: 'Lại Thị Thu Trang A', // Change to user's name
        avatar: '/user_dsda.png', // Change to user's avatar
        conent: conent,
        chucvu: 'nhanvien',
      };
      setComments([...comments, newComment]);
      setCommentInput('');
    }
  };

  // xóa comment
  const deleteComment = (commentId: any) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );
    setComments(updatedComments);
  };

  const handleRangeChange = (event: any) => {
    const newValue = Math.min(100, event.target.value);
    setRangeValue(newValue);
    setShowResult(true);
  };

  const handleShowCvcon = () => {
    setIsCvconVisible(true);
  };

  const handleCancelCvcon = () => {
    setIsCvconVisible(false);
  };

  const handleFileChange = (e: any) => {
    if (e.file.status === 'done' && e.file.originFileObj !== selectedFile) {
      setSelectedFile(e.file.originFileObj);

      const formData = new FormData();
      formData.append('files', e.file.originFileObj);

      POST(`projects/chi-tiet-du-an/${detailJob.job_id}/add-file`, formData)
        .then((response) => {
          e.fileList.splice(0, e.fileList.length);
          setReload(!reload);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const [inputValue, setInputValue] = useState<number | null>(
    detailJob?.process_percent
  );

  const onChange = (newValue: number | null) => {
    setInputValue(newValue !== null ? newValue : 0);
    POST(`projects/chi-tiet-du-an/${detailJob.job_id}/chinh-sua-ket-qua`, {
      percentComplete: newValue,
    });
  };

  const handleDanhGia = (e: any) => {
    POST(`projects/chi-tiet-du-an/${detailJob.job_id}/cap-nhap-danh-gia`, {
      managerEvaluate: e.target.value,
    }).then((response) => {
      setReload(!reload);
    });
  };
  const items = [
    {
      label: (
        <Upload onChange={(e) => handleFileChange(e)}>
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
                  height={14}
                  alt=""
                  src="https://hungha365.com/storageimage/GV/img15.png"
                />
                <h4 style={{ margin: '0', fontSize: '16px' }}>
                  {detailJob?.job_name}
                </h4>
              </div>
            </div>

            <div className={styles.chitiet_content}>
              <div className={styles.row_work}>
                <div className={styles.row_work_right}>
                  <div>
                    <p style={{ marginBottom: '0rem' }}>
                      Trong hôm nay: <span>{project?.project_name}</span>
                    </p>
                  </div>
                  <p style={{ marginBottom: '0rem' }}>
                    Ngày bắt đầu:{' '}
                    <span className={styles.start_work}>
                      {detailJob.time_in} - {detailJob.date_start}
                    </span>
                  </p>
                </div>
                <div className={styles.row_work_left}>
                  <p style={{ marginBottom: '0rem' }}>
                    Đi tới:{' '}
                    <a style={{ color: 'blue', cursor: 'pointer' }}>
                      {project?.project_name}{' '}
                    </a>
                  </p>
                  <p style={{ marginBottom: '0rem' }}>
                    Ngày kết thúc:{' '}
                    <span className={styles.end_work}>
                      {detailJob.time_out} - {detailJob.date_end}
                    </span>
                  </p>
                </div>
              </div>

              {/*---------------------- Mô tả giai đoạn------------------------- */}

              {/*--------------------- Mô tả công việc -------------------------*/}
              <div className={styles.mota}>
                <div className={styles.mota_edit}>
                  <div>
                    <p
                      className={styles.text_title}
                      style={{ fontWeight: 'bold', marginBottom: '0rem' }}
                    >
                      MÔ TẢ CÔNG VIỆC
                    </p>
                  </div>
                  <div>
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
                      <span className={styles.elip}>{elipContent}</span>
                    </p>
                  )}
                </div>
                <div className={styles.form_add_desc}>
                  {!isElipVisible && (
                    <form action="" method="post">
                      <textarea
                        style={{ width: '100%' }}
                        value={editedElipContent}
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
              {file?.map((item: any, index: any) => {
                <div key={index}>{item?.name_file}</div>;
              })}
              <div className={styles.doc}>
                <div className={styles.document}>
                  <span style={{ fontWeight: 'bold' }}>TÀI LIỆU ĐÍNH KÈM</span>
                  {file?.map((item: any, index: any) => {
                    <div key={index}>
                      <div>{item?.name_file}</div>
                    </div>;
                  })}
                  <div>
                    <Dropdown
                      menu={{
                        items,
                      }}
                      trigger={['click']}
                    >
                      <Upload
                        showUploadList={true}
                        multiple={true}
                        onChange={(e) => handleFileChange(e)}
                      >
                        <Space>Thêm tài liệu</Space>
                      </Upload>
                    </Dropdown>
                  </div>
                </div>
              </div>

              {/*--------------------------------------------------------------------------  */}
              <div className={styles.add_people}>
                <div className={styles.text_btn_edit}>
                  <span style={{ fontWeight: 'bold' }}>
                    NGƯỜI GIAO VIỆC DỰ ÁN
                  </span>

                  <NgGiaoViec
                    listEp={listEp}
                    filteredManagement={filteredManagement}
                  />
                </div>
                {filteredManagement?.map((item: any, index: any) => (
                  <div key={index}>
                    <div className={styles.people}>
                      <Image
                        unoptimized
                        width={22}
                        height={22}
                        alt=""
                        className={styles.icon_people_th}
                        src="https://hungha365.com/storageimage/GV/Group 626671.png"
                      />
                      <div className={styles.name_chuvu}>
                        <div>
                          <p style={{ marginBottom: '0rem' }}>
                            {item?.userName}
                          </p>
                        </div>
                        <div>
                          <p>
                            {chucVu(item?.inForPerson?.employee?.position_id)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* <p
                  className={styles.chucvu}
                  style={{ marginBottom: "0rem", color: "#474747" }}
                >
                  Chức vụ khác
                </p> */}
                  </div>
                ))}
              </div>

              {/* -----------============================================================ */}
              <div className={styles.add_people}>
                <div className={styles.text_btn_edit}>
                  <span style={{ fontWeight: 'bold' }}>NGƯỜI THỰC HIỆN</span>
                  <NgThuchien />
                </div>

                <div>
                  <div className={styles.people}>
                    <Image
                      unoptimized
                      width={22}
                      height={22}
                      alt=""
                      className={styles.icon_people_th}
                      src="https://hungha365.com/storageimage/GV/Group 626671.png"
                    />
                    <div className={styles.name_chuvu}>
                      <div>
                        <p style={{ marginBottom: '0rem' }}>
                          {member?.userName}
                        </p>
                      </div>
                      <div>
                        <p>
                          {chucVu(member?.inForPerson?.employee?.position_id)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* <p
                  className={styles.chucvu}
                  style={{ marginBottom: "0rem", color: "#474747" }}
                >
                  Chức vụ khác
                </p> */}
                </div>
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
                <div className={styles.containerFollower}>
                  {filteredFollower.map((item: any, index: any) => (
                    <div key={index}>
                      <div className={styles.people}>
                        <Image
                          unoptimized
                          width={22}
                          height={22}
                          alt=""
                          className={styles.icon_people_th}
                          src="https://hungha365.com/storageimage/GV/Group 626671.png"
                        />
                        <div className={styles.name_chuvu}>
                          <div>
                            <p style={{ marginBottom: '0rem' }}>
                              {item?.userName}{' '}
                            </p>
                          </div>
                          <div>
                            <p>
                              {chucVu(item?.inForPerson?.employee?.position_id)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* <p
                  className={styles.chucvu}
                  style={{ marginBottom: "0rem", color: "#474747" }}
                >
                  Chức vụ khác
                </p> */}
                    </div>
                  ))}
                </div>
              </div>
              {/* ///////////////////////////////////// */}
              <div className={styles.ket_qua_cv}>
                <div className={styles.kq_edit}>
                  <span style={{ fontWeight: 'bold' }}>KẾT QUẢ CÔNG VIỆC</span>
                  <div>
                    <Row>
                      <Col span={12}>
                        <Slider
                          min={0}
                          max={100}
                          onChange={onChange}
                          value={
                            typeof inputValue === 'number' ? inputValue : 0
                          }
                        />
                      </Col>
                      <Col span={4}>
                        <InputNumber
                          min={1}
                          max={100}
                          style={{ margin: '0 16px' }}
                          value={inputValue}
                          onChange={onChange}
                        />
                      </Col>
                    </Row>
                  </div>
                  {/*------- Cập nhật công việc ------- */}
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
                </div>
              </div>
              {/* -------------------------công việc con--- --------------------------*/}
              <div className={styles.sub_work}>
                <div className={styles.text_sub_work}>
                  <span style={{ fontWeight: 'bold' }}>CÔNG VIỆC CON </span>
                  {jobOfJob?.map((item: any, index) => (
                    <div key={index} className={styles.work_child}>
                      <label htmlFor="check" className={styles.checked}>
                        <input
                          className={styles.check_box}
                          disabled
                          type="radio"
                          name=""
                          id="check"
                          // onChange={()=>handleCheckboxChange(item?.id)}
                          //checked={item?.status === 0}
                        />
                        <span
                          className={
                            item?.status === 0
                              ? styles.completedName
                              : styles.uncompletedName
                          }
                        >
                          {item?.job_name_job}
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
                          src={'/Group 626671.png'}
                        />
                        <span>{`Giao cho: ${item?.staff_name}`}</span>
                      </p>
                      <p className={styles.thoigian}>
                        {dayjs(
                          `${item?.date_limit} ${item?.hour_limit}`
                        ).format('HH:mm - DD/MM/YYYY')}
                      </p>
                    </div>
                  ))}
                  <div>
                    <div>
                      <input
                        style={{ paddingLeft: '18px', width: '50%' }}
                        className={styles.ip_sub_work}
                        placeholder="Nhập tên công việc con"
                        value={subWorkName}
                        onChange={(e) => setSubWorkName(e.target.value)}
                        onClick={handleShowCvcon}
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
                            value={member?.userName}
                            disabled
                            readOnly
                            type="text"
                            style={{ width: '100%' }}
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
                            value={subWorkDate}
                            onChange={(e) => setSubWorkDate(e.target.value)}
                          />
                          <input
                            type="time"
                            style={{
                              width: '50%',
                              border: 'none',
                              paddingRight: '45px',
                            }}
                            value={subWorkTime}
                            onChange={(e) => setSubWorkTime(e.target.value)}
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
                {/* ===================================================================== */}
                <div>
                  <div className={styles.nhanvien}>
                    <p style={{ marginBottom: '0rem' }}>NHÂN VIÊN ĐÁNH GIÁ:</p>
                    <select
                      value={detailJob.nhanvien_danhgia}
                      name=""
                      id=""
                      style={{ width: 200, height: 34 }}
                      disabled
                    >
                      <option value="1">Chờ đánh giá</option>
                      <option value="2">Vượt KPI</option>
                      <option value="3">Đạt yêu cầu</option>
                      <option value="4">Chưa đạt yêu cầu</option>
                      <option value="5">Thất bại</option>
                    </select>
                  </div>

                  {/* ====================================================== */}
                  <div className={styles.quan_ly}>
                    <p
                      style={{
                        marginBottom: '0rem',
                      }}
                    >
                      QUẢN LÝ ĐÁNH GIÁ:
                    </p>
                    <select
                      defaultValue={detailJob.quanli_danhgia}
                      name=""
                      id=""
                      style={{ width: 200, height: 34 }}
                      onChange={handleDanhGia}
                    >
                      <option value="1">Chờ đánh giá</option>
                      <option value="2">Vượt KPI</option>
                      <option value="3">Đạt yêu cầu</option>
                      <option value="4">Chưa đạt yêu cầu</option>
                      <option value="5">Thất bại</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* ========================================================== */}

              {isCommentVisible && (
                <div>
                  <label className={styles.comment}>Bình luận</label>
                  <div
                    className={`all_cmt ${styles.dashed}`}
                    style={{ margin: '10px' }}
                  >
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
                                width: 'auto',
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
                            float: 'right',
                          }}
                        >
                          <div>
                            <p
                              className="vt_cmt_nd"
                              style={{
                                paddingLeft: '10px',
                                margin: '0',
                                color: '#4c5bd4',
                                fontSize: 15,
                              }}
                            >
                              {comment.conent}
                            </p>
                          </div>
                          <div>
                            <p>
                              <DelCmtDA
                                setReload={setReload}
                                reload={reload}
                                detailJob={detailJob}
                                comment={comment}
                              />
                            </p>
                          </div>
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
