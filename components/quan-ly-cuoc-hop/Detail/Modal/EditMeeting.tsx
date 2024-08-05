import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button, Input, Modal, Select } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import styles from './edm.module.scss';
import _ from 'lodash';
import { POST, POST_QLC_NoCom } from '@/pages/api/auth';
import dayjs from 'dayjs';
const handleChange = (value: string | string[]) => {
  console.log(`Selected: ${value}`);
};

const EditMeeting = ({
  data,
  listDep,
  listEmp,
  listRoom,
  setReload,
}: {
  data: any;
  listDep: any[];
  listEmp: any[];
  listRoom: any[];
  setReload: Function;
}) => {
  const { Option } = Select;
  const { TextArea } = Input;
  const inputRef: any = useRef(null);
  const [tenCuocHop, setTenCuocHop] = useState('');
  const [noiDungCuocHop, setNoiDungCuocHop] = useState('');
  const [ngayBatDau, setNgayBatDau] = useState('');
  const [thoiGianBatDau, setThoiGianBatDau] = useState('');
  const [thoiLuongDuKien, setThoiLuongDuKien] = useState('');
  const [isSaveClicked, setIsSaveClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData]: any = useState({});
  const [listParticipant, setListParticipant]: any = useState([]);
  const [listParticipantNoDep, setListParticipantNoDep]: any = useState([]);

  useEffect(() => {
    if (data) {
      setFormData({
        name_meeting: data?.name_meeting,
        content: data?.content,
        date_start: data?.date_start,
        time_start: data?.time_start,
        time_estimated: data?.time_estimated,
        department_id: data?.department_id,
        staff_owner: data?.staff_owner,
        staff_ecretary: data?.staff_ecretary,
        staff_preparation: data?.staff_preparation,
        staff_take_in: data?.staff_take_in,
        address_links: data?.address_links,
        is_send_mail: data?.is_send_mail || 0,
      });
      setTenCuocHop(data?.name_meeting);
      setNoiDungCuocHop(data?.content);
      setNgayBatDau(data?.date_start);
      setThoiGianBatDau(data?.time_start);
      setThoiLuongDuKien(data?.time_estimated);
      setListParticipantNoDep(data?.staff_take_in?.split(','));
    }
  }, [data]);
  // useEffect(()=>{
  //     console.log(formData);
  // },[formData])
  const handleSaveClick = () => {
    setIsSaveClicked(true);
    if (!tenCuocHop || !thoiGianBatDau || !thoiLuongDuKien) {
      return;
    }
    // Xử lý logic lưu dữ liệu ở đây
    if (dayjs(`${formData?.date_start} ${formData?.time_start}`) > dayjs()) {
      POST(
        `meetings/chi-tiet-cuoc-hop/${window.sessionStorage.getItem(
          'id_chi_tiet_cuoc_hop'
        )}/edit`,
        formData
      ).then((res) => {
        if (res) {
          setIsModalOpen(false);
          setReload(true);
        }
      });
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setFormData({
      name_meeting: data?.name_meeting,
      content: data?.content,
      date_start: data?.date_start,
      time_start: data?.time_start,
      time_estimated: data?.time_estimated,
      department_id: data?.department_id,
      staff_owner: data?.staff_owner,
      staff_ecretary: data?.staff_ecretary,
      staff_preparation: data?.staff_preparation,
      staff_take_in: data?.staff_take_in,
      address_links: data?.address_links,
      is_send_mail: data?.is_send_mail || 0,
    });
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (!_.isEmpty(formData)) {
      setFormData({ ...formData, name_meeting: tenCuocHop });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tenCuocHop]);

  useEffect(() => {
    if (!_.isEmpty(formData)) {
      setFormData({ ...formData, name_meeting: noiDungCuocHop });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noiDungCuocHop]);

  useEffect(() => {
    if (!_.isEmpty(formData)) {
      setFormData({ ...formData, date_start: ngayBatDau });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ngayBatDau]);

  useEffect(() => {
    if (!_.isEmpty(formData)) {
      setFormData({ ...formData, time_start: thoiGianBatDau });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thoiGianBatDau]);

  useEffect(() => {
    if (!_.isEmpty(formData)) {
      setFormData({ ...formData, time_estimated: thoiLuongDuKien });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thoiLuongDuKien]);

  const handleChangeDep = async (value: any | any[], option: any) => {
    let listTemp: any = [];
    // console.log(value);
    if (value && !_.isEmpty(value)) {
      const promises = value.map((data: any) => {
        return POST_QLC_NoCom('managerUser/list', { dep_id: data }).then(
          (res) => {
            if (res) {
              res.items.forEach((dt: any) => {
                listTemp.push(dt._id.toString());
              });
            }
          }
        );
      });
      await Promise.all(promises);
      setListParticipant(listTemp);
    } else {
      setListParticipant([]);
    }
    const string = value?.join(',');
    setFormData({ ...formData, department_id: string });
  };

  const handleSelectParticipant = (value: any) => {
    setListParticipantNoDep([...listParticipantNoDep, value]);
  };

  const handleRemoveParticipant = (value: any) => {
    const updatedItemsNoDep = listParticipantNoDep?.filter(
      (item: any) => item !== value
    );
    const updatedItems = listParticipant?.filter((item: any) => item !== value);
    setListParticipantNoDep(updatedItemsNoDep);
    setListParticipant(updatedItems);
  };

  const handleChangeLeader = (value: any | any[]) => {
    const string = value?.join(',');
    setFormData({ ...formData, staff_owner: string });
  };

  const handleChangeSecretary = (value: any | any[]) => {
    const string = value?.join(',');
    setFormData({ ...formData, staff_ecretary: string });
  };

  const handleChangeRepairer = (value: any | any[]) => {
    const string = value?.join(',');
    setFormData({ ...formData, staff_preparation: string });
  };

  const handleRoom = (e: any) => {
    //console.log(Number(e.target.value));
    setFormData({ ...formData, address_links: e.target.value });
  };

  const handleSendMail = (e: any) => {
    //console.log(e.target.checked);
    setFormData({ ...formData, is_send_mail: e.target.checked ? 1 : 0 });
  };
  useEffect(() => {
    //console.log('list ng tham gia',listParticipant);
    if (!_.isEmpty(formData)) {
      const string = Array.from(
        new Set([...listParticipant, ...listParticipantNoDep])
      )?.join(',');
      setFormData({ ...formData, staff_take_in: string });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listParticipant, listParticipantNoDep]);
  // useEffect(()=>{
  //     console.log(formData);
  // },[{...formData}])
  const copyToClipboard = () => {
    const input = inputRef.current;
    if (input) {
      input.select();
      navigator.clipboard.writeText(input.value).then((res) => {
        if (input.value) {
          alert('copied!!!');
        }
      });
    }
  };
  return (
    <>
      <p className="cv_dot" onClick={showModal} style={{ margin: '0' }}>
        <Image
          unoptimized
          width={18}
          height={16}
          alt="met"
          src="https://hungha365.com/storageimage/GV/editch.png"
          style={{ marginRight: '10px' }}
        />
        Chỉnh sửa cuộc họp
      </p>
      <Modal
        title={
          data?.type === '1'
            ? 'Sửa cuộc họp trực tiếp'
            : 'Sửa cuộc họp trực tuyến'
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className={styles.offline}>
          <div className={styles.off_content}>
            <div className={styles.content}>
              <div className={styles.form_gr}>
                <p>
                  Tên cuộc họp <span style={{ color: 'red' }}>*</span>
                </p>
                <Input
                  style={{ width: '100%' }}
                  type="text"
                  placeholder="Nhập tên cuộc họp"
                  onChange={(value) => setTenCuocHop(value.target.value)}
                  value={tenCuocHop}
                  required
                />
                {isSaveClicked && tenCuocHop === '' && (
                  <p
                    style={{
                      color: 'red',
                      fontSize: '11px',
                      marginTop: '5px',
                    }}
                  >
                    Không được bỏ trống phần này!!
                  </p>
                )}
              </div>

              <div className={styles.form_gr}>
                <p>Nội dung cuộc họp cuộc họp</p>
                <TextArea
                  style={{ width: '100%' }}
                  placeholder="Nhập nội dung cuộc họp"
                  onChange={(e) => setNoiDungCuocHop(e.target.value)}
                  value={noiDungCuocHop}
                  required
                />
              </div>
              <div className={styles.form_gr}>
                <div className={`${styles.timegr} ${styles.gr}`}>
                  <div className={styles.date_start}>
                    <p>
                      Thời gian bắt đầu <span style={{ color: 'red' }}>*</span>
                    </p>
                    <Input
                      type="date"
                      onChange={(e) => setNgayBatDau(e.target.value)}
                      required
                      value={ngayBatDau}
                    />
                    {isSaveClicked && thoiGianBatDau === '' && (
                      <p
                        style={{
                          color: 'red',
                          fontSize: '11px',
                          marginTop: '5px',
                        }}
                      >
                        Không được để trống!!
                      </p>
                    )}
                  </div>
                  <div className={styles.time_start}>
                    <Input
                      type="time"
                      onChange={(e) => setThoiGianBatDau(e.target.value)}
                      value={thoiGianBatDau}
                    />
                    {dayjs(`${formData?.date_start} ${formData?.time_start}`) <
                      dayjs() && (
                      <p
                        style={{
                          color: 'red',
                          fontSize: '11px',
                          marginTop: '5px',
                        }}
                      >
                        Thời gian không hợp lệ
                      </p>
                    )}
                  </div>

                  <div className={styles.time}>
                    <p>
                      Thời lượng dự kiến<span style={{ color: 'red' }}>*</span>
                    </p>
                    <Input
                      type="text"
                      placeholder="Nhập số phút"
                      onChange={(e) => setThoiLuongDuKien(e.target.value)}
                      value={thoiLuongDuKien}
                      required
                    />
                    {isSaveClicked && thoiLuongDuKien === '' && (
                      <p
                        style={{
                          color: 'red',
                          fontSize: '11px',
                          marginTop: '5px',
                        }}
                      >
                        Không được để trống!!
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.form_gr}>
                <p>Bộ phận</p>
                <Select
                  mode="multiple"
                  placeholder="Chọn bộ phận hoặc phòng ban"
                  value={
                    formData?.department_id === ''
                      ? []
                      : formData?.department_id?.split(',')
                  }
                  onChange={handleChangeDep}
                  style={{ width: '100%', color: 'black' }}
                  filterOption={(input, option: any) =>
                    (option?.children ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  {listDep?.map((option: any) => (
                    <Option
                      key={option.dep_id}
                      value={option.dep_id.toString()}
                    >
                      {option.dep_id + ' - ' + option.dep_name}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className={styles.form_gr}>
                <p>
                  Thêm chủ trì cuộc họp <span style={{ color: 'red' }}>*</span>
                </p>
                <Select
                  mode="multiple"
                  placeholder="Chọn người chủ trì cuộc họp"
                  value={
                    formData?.staff_owner === ''
                      ? []
                      : formData?.staff_owner?.split(',')
                  }
                  onChange={handleChangeLeader}
                  style={{ width: '100%' }}
                  filterOption={(input, option: any) =>
                    (option?.children ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  {listEmp?.map((option: any) => (
                    <Option key={option._id} value={option._id.toString()}>
                      {option._id + ' - ' + option.ep_name}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className={styles.form_gr}>
                <p>Thêm thư ký cuộc họp</p>
                <Select
                  mode="multiple"
                  placeholder="Chọn thư ký cuộc họp"
                  value={
                    formData?.staff_ecretary === ''
                      ? []
                      : formData?.staff_ecretary?.split(',')
                  }
                  onChange={handleChangeSecretary}
                  style={{ width: '100%' }}
                  filterOption={(input, option: any) =>
                    (option?.children ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  {listEmp?.map((option: any) => (
                    <Option key={option._id} value={option._id.toString()}>
                      {option._id + ' - ' + option.ep_name}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className={styles.form_gr}>
                <p>Thêm người chuẩn bị cuộc họp</p>
                <Select
                  mode="multiple"
                  placeholder="Chọn người chuẩn bị"
                  value={
                    formData?.staff_preparation === ''
                      ? []
                      : formData?.staff_preparation?.split(',')
                  }
                  onChange={handleChangeRepairer}
                  style={{ width: '100%' }}
                  filterOption={(input, option: any) =>
                    (option?.children ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  {listEmp?.map((option: any) => (
                    <Option key={option._id} value={option._id.toString()}>
                      {option._id + ' - ' + option.ep_name}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className={styles.form_gr}>
                <p>
                  Thêm người tham gia cuộc họp{' '}
                  <span style={{ color: 'red' }}>*</span>
                </p>
                <Select
                  mode="multiple"
                  placeholder="Chọn người tham gia"
                  value={
                    formData?.staff_take_in === ''
                      ? []
                      : formData?.staff_take_in?.split(',')
                  }
                  onSelect={handleSelectParticipant}
                  onDeselect={handleRemoveParticipant}
                  style={{ width: '100%', height: '38px', color: 'black' }}
                  filterOption={(input, option: any) =>
                    (option?.children ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  {listEmp?.map((option: any) => (
                    <Option key={option._id} value={option._id.toString()}>
                      {option._id + ' - ' + option.ep_name}
                    </Option>
                  ))}
                </Select>
              </div>
              {data?.type === '1' ? (
                <div className={styles.form_gr}>
                  <p>Phòng họp</p>
                  <select
                    name=""
                    id=""
                    style={{ width: '100%' }}
                    value={formData?.address_links}
                    onChange={handleRoom}
                  >
                    {listRoom?.map((dt: any, index: number) => (
                      <option key={index} value={dt?.id}>
                        {dt?.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className={styles.form_gr}>
                  <div
                    className={styles.link}
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <p style={{ fontWeight: 'bold' }}>
                      Đường dẫn đi đến phòng họp
                    </p>
                    <div
                      className="copy-button"
                      onClick={copyToClipboard}
                      style={{
                        border: 'none',
                        background: 'none',
                        color: 'red',
                        cursor: 'pointer',
                      }}
                    >
                      Sao chép đường dẫn
                    </div>
                  </div>
                  <input
                    ref={inputRef}
                    style={{
                      width: '100%',
                      height: '36px',
                      border: '1px solid black',
                    }}
                    type="text"
                    placeholder="Nhập đường dẫn cuộc họp"
                    value={formData?.address_links}
                    onChange={handleRoom}
                  />
                </div>
              )}
              <div>
                <p style={{ textAlign: 'center' }}>
                  <input
                    type="checkbox"
                    style={{ width: '15px' }}
                    onChange={handleSendMail}
                    checked={formData?.is_send_mail}
                  />
                  Gửi tin nhắn thông báo
                </p>
              </div>
              <div className={styles.cancel_ok}>
                <button onClick={handleCancel} className={styles.huy}>
                  Hủy
                </button>
                <button onClick={handleSaveClick} className={styles.ok}>
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditMeeting;
