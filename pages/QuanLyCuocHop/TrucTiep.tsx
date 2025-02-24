import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Modal, Select } from 'antd';
import styles from '@/pages/components/MeetingManagement/Detail/Modal/Editmeeting.module.css';
import { POST, POST_QLC_NoCom } from '../api/auth';
import _ from 'lodash';

export default function Tructiep({
  listDep,
  listEmp,
  listRoom,
  setReload,
}: {
  listDep: any[];
  listEmp: any[];
  listRoom: any[];
  setReload: Function;
}) {
  const base = {
    name_meeting: '',
    content: '',
    date_start: '',
    time_start: '',
    time_estimated: '',
    department_id: '',
    staff_owner: '',
    staff_ecretary: '',
    staff_preparation: '',
    staff_take_in: '',
    address_links: '',
    is_send_mail: 0,
  };
  const { Option } = Select;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData]: any = useState(base);
  const [listParticipant, setListParticipant]: any = useState([]);
  const [listParticipantNoDep, setListParticipantNoDep]: any = useState([]);
  const [validate, setValidate] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setFormData(base);
    setIsModalOpen(false);
    setValidate(false);
  };

  const handleName = (e: any) => {
    setFormData({ ...formData, name_meeting: e.target.value });
  };
  const handleContent = (e: any) => {
    setFormData({ ...formData, content: e.target.value });
  };

  const handleDateStart = (e: any) => {
    setFormData({ ...formData, date_start: e.target.value });
  };

  const handleTimeStart = (e: any) => {
    setFormData({ ...formData, time_start: e.target.value });
  };

  const handleDuration = (e: any) => {
    setFormData({ ...formData, time_estimated: e.target.value });
  };
  // const handleChange = (value: any | any[]) => {
  //     console.log(`Selected: ${value}`);
  // };
  const handleChangeDep = async (value: any | any[], option: any) => {
    let listTemp: any = [];
    // console.log(value);
    if (value && !_.isEmpty(value)) {
      const promises = value.map((data: any) => {
        return POST_QLC_NoCom('managerUser/list', { dep_id: data }).then(
          (res) => {
            if (res) {
              res.items.forEach((dt: any) => {
                listTemp.push(Number(dt._id));
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
    const updatedItems = listParticipantNoDep?.filter(
      (item: any) => item !== value
    );
    const updatedItems2 = listParticipant?.filter(
      (item: any) => item !== value
    );
    setListParticipantNoDep(updatedItems);
    setListParticipant(updatedItems2);
  };

  const handleChangeLeader = (value: any | any[]) => {
    const string = value?.join(',');
    setFormData({ ...formData, staff_owner: string });
  };

  const handleChangeSecretary = (value: any | any[], option: any) => {
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
  // useEffect(()=>{
  //     console.log(formData);
  // },[formData])
  useEffect(() => {
    //console.log('list ng tham gia',listParticipant);
    const string = Array.from(
      new Set([...listParticipant, ...listParticipantNoDep])
    )?.join(',');
    setFormData({ ...formData, staff_take_in: string });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listParticipant, listParticipantNoDep]);

  const handleSubmit = () => {
    if (
      formData?.name_meeting !== '' &&
      formData?.content !== '' &&
      formData?.date_start !== '' &&
      formData?.time_start !== '' &&
      formData?.time_estimated !== '' &&
      formData?.staff_owner !== '' &&
      formData?.staff_preparation !== '' &&
      formData?.staff_take_in !== ''
    ) {
      POST('meetings/quan-ly-cuoc-hop/them-cuoc-hop-truc-tiep', formData).then(
        (res) => {
          if (res) {
            setFormData(base);
            setListParticipant([]);
            setListParticipantNoDep([]);
            setReload(true);
            setIsModalOpen(false);
            setValidate(false);
          }
        }
      );
    } else {
      setValidate(true);
    }
  };
  return (
    <div>
      <p className="cv_dot" onClick={showModal} style={{ margin: '0' }}>
        <Image
          unoptimized
          width={20}
          height={18}
          alt=""
          src="https://hungha365.com/storageimage/GV/vitri.png"
          style={{ marginRight: '10px' }}
        />
        Thêm cuộc họp trực tiếp
      </p>
      <Modal
        title=" Thêm cuộc họp trực tiếp"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <div className={styles.content}>
          <div className={styles.form_gr}>
            <p>
              Tên cuộc họp <span style={{ color: 'red' }}>*</span>
            </p>
            <input
              style={{ width: '100%' }}
              type="text"
              placeholder="Nhập tên cuộc họp"
              onChange={handleName}
            />
            {validate && formData?.name_meeting === '' && (
              <p style={{ color: 'red', textAlign: 'end' }}>
                Không được bỏ trống
              </p>
            )}
          </div>

          <div className={styles.form_gr}>
            <p>
              Nội dung cuộc họp cuộc họp <span style={{ color: 'red' }}>*</span>
            </p>
            <textarea
              style={{ width: '100%' }}
              placeholder="Nhập nội dung cuộc họp"
              onChange={handleContent}
            />
            {validate && formData?.content === '' && (
              <p style={{ color: 'red', textAlign: 'end' }}>
                Không được bỏ trống
              </p>
            )}
          </div>

          <div className={styles.form_gr}>
            <div className={styles.gr}>
              <div className={styles.date_start}>
                <p>
                  Thời gian bắt đầu <span style={{ color: 'red' }}>*</span>
                </p>
                <input
                  placeholder="date"
                  type="date"
                  style={{
                    width: '132px',
                    padding: '7px 10px',
                    borderRadius: '5px',
                    border: '1px solid black',
                  }}
                  onChange={handleDateStart}
                />
              </div>
              <div className={styles.time_start}>
                <input
                  type="time"
                  placeholder="time"
                  onChange={handleTimeStart}
                />
              </div>
              <div className={styles.time}>
                <p>
                  Thời lượng dự kiến
                  <span style={{ color: 'red' }}>*</span>
                </p>
                <input
                  type="text"
                  placeholder="Nhập số phút"
                  style={{
                    width: '132px',
                    padding: '7px 10px',
                    borderRadius: '5px',
                    border: '1px solid black',
                  }}
                  onChange={handleDuration}
                />
              </div>
            </div>
            {validate &&
              (formData?.date_start === '' ||
                formData?.time_start === '' ||
                formData?.time_estimated === '') && (
                <p style={{ color: 'red', textAlign: 'end' }}>
                  Không được bỏ trống
                </p>
              )}
          </div>
          <div className={styles.form_gr}>
            <p>Bộ phận</p>
            <Select
              mode="multiple"
              placeholder="Chọn bộ phận hoặc phòng ban"
              onChange={handleChangeDep}
              style={{ width: '100%', color: 'black' }}
              size="middle"
              filterOption={(input, option: any) =>
                (option?.children ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {listDep?.map((option: any) => (
                <Option key={option.dep_id} value={option.dep_id}>
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
              defaultValue={[]}
              onChange={handleChangeLeader}
              style={{ width: '100%' }}
              filterOption={(input, option: any) =>
                (option?.children ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {listEmp?.map((option: any) => (
                <Option key={option._id} value={option._id}>
                  {option._id + ' - ' + option.ep_name}
                </Option>
              ))}
            </Select>
            {validate && formData?.staff_owner === '' && (
              <p style={{ color: 'red', textAlign: 'end' }}>
                Không được bỏ trống
              </p>
            )}
          </div>
          <div className={styles.form_gr}>
            <p>
              Thêm thư ký cuộc họp <span style={{ color: 'red' }}>*</span>
            </p>
            <Select
              mode="multiple"
              placeholder="Chọn thư ký cuộc họp"
              defaultValue={[]}
              onChange={handleChangeSecretary}
              style={{ width: '100%' }}
              filterOption={(input, option: any) =>
                (option?.children ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {listEmp?.map((option: any) => (
                <Option key={option._id} value={option._id}>
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
              defaultValue={[]}
              onChange={handleChangeRepairer}
              style={{ width: '100%' }}
              filterOption={(input, option: any) =>
                (option?.children ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {listEmp?.map((option: any) => (
                <Option key={option._id} value={option._id}>
                  {option._id + ' - ' + option.ep_name}
                </Option>
              ))}
            </Select>
          </div>
          <div className={styles.form_gr}>
            <p>Thêm người tham gia cuộc họp</p>
            <Select
              mode="multiple"
              placeholder="Chọn người tham gia"
              value={Array.from(
                new Set([...listParticipant, ...listParticipantNoDep])
              )}
              onSelect={handleSelectParticipant}
              onDeselect={handleRemoveParticipant}
              // onChange={handChangeParticipant}
              style={{ width: '100%', color: 'black' }}
              filterOption={(input, option: any) =>
                (option?.children ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              {listEmp?.map((option: any) => (
                <Option key={option._id} value={option._id}>
                  {option._id + ' - ' + option.ep_name}
                </Option>
              ))}
            </Select>
            {validate && formData?.staff_take_in === '' && (
              <p style={{ color: 'red', textAlign: 'end' }}>
                Không được bỏ trống
              </p>
            )}
          </div>
          <div className={styles.form_gr}>
            <p>Phòng họp</p>
            <select
              name="aaa"
              id=""
              style={{ width: '100%' }}
              onChange={handleRoom}
            >
              {listRoom?.map((dt: any, index: number) => (
                <option key={index} value={dt?.id}>
                  {dt?.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p style={{ textAlign: 'center' }}>
              <input
                placeholder="thongbao"
                type="checkbox"
                style={{ width: '15px' }}
                onChange={handleSendMail}
              />
              Gửi tin nhắn thông báo
            </p>
          </div>
          <div className={styles.cancel_ok}>
            <button onClick={handleCancel} className={styles.huy}>
              Hủy
            </button>
            <button onClick={handleSubmit} className={styles.ok}>
              Tạo cuộc họp
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
