import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Input, Modal, Select, Typography, message } from 'antd';
import styles from './qlch.module.scss';
import { POST, POST_QLC_NoCom } from '@/pages/api/auth';
import _ from 'lodash';
import moment from 'moment';
// import TextArea from 'antd/es/input/TextArea';

export default function TrucTiep({
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
  //set Default
  const currentDate = moment();
  const formattedDateTime = currentDate.format('YYYY-MM-DD HH:mm');
  const formattedDate = currentDate.format('YYYY-MM-DD');
  const formattedTime = currentDate.format('HH:mm');
  //
  const { TextArea } = Input;

  const base = {
    name_meeting: '',
    content: '',
    date_start: formattedDate,
    time_start: formattedTime,
    time_estimated: '',
    department_id: '',
    staff_owner: '',
    staff_ecretary: '',
    staff_preparation: '',
    staff_take_in: '',
    address_links: listRoom[0]?.id,
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
    setListParticipant([]);
    setIsModalOpen(false);
    setValidate(false);
  };

  const handleName = (value: any) => {
    setFormData({ ...formData, name_meeting: value.target.value });
  };
  const handleContent = (value: any) => {
    setFormData({ ...formData, content: value.target.value });
  };

  const handleDateStart = (value: any) => {
    setFormData({ ...formData, date_start: value.target.value });
  };

  const handleTimeStart = (value: any) => {
    setFormData({ ...formData, time_start: value.target.value });
  };

  const handleDuration = (value: any) => {
    setFormData({ ...formData, time_estimated: Number(value.target.value) });
  };
  // const handleChange = (value: any | any[]) => {
  //     console.log(`Selected: ${value}`);
  // };
  const handleChangeDep = async (value: any | any[], option: any) => {
    let listTemp: any = [];
    // console.log(value);
    if (value && !_.isEmpty(value)) {
      const promises = value.map(async (data: any) => {
        const res = await POST_QLC_NoCom('managerUser/list', { dep_id: data });
        if (res) {
          res.items.forEach((dt: any) => {
            listTemp.push(Number(dt._id));
          });
        }
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

  const handleRoom = (value: any) => {
    //console.log(Number(e.target.value));
    setFormData({ ...formData, address_links: value });
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
      formData?.time_estimated !== '' &&
      formData?.staff_owner !== '' &&
      formData?.staff_take_in !== ''
    ) {
      if (
        moment(formData.date_start + ' ' + formData.time_start).isBefore(
          formattedDateTime
        )
      ) {
        message.error('Thời gian bắt đầu không hợp lệ');
      } else {
        POST(
          'meetings/quan-ly-cuoc-hop/them-cuoc-hop-truc-tiep',
          formData
        ).then((res) => {
          if (res) {
            message.success('Thêm cuộc họp trực tiếp thành công');
            setFormData(base);
            setListParticipant([]);
            setListParticipantNoDep([]);
            setReload(true);
            setIsModalOpen(false);
            setValidate(false);
          }
        });
      }
    } else {
      setValidate(true);
    }
  };
  return (
    <div>
      <p className="cv_dot" onClick={showModal} style={{ margin: '0' }}>
        <Image
          unoptimized
          width={15}
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
            <Input
              // style={{ width: '100%' }}
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
            <p>Nội dung cuộc họp cuộc họp</p>
            <TextArea
              style={{ width: '100%' }}
              placeholder="Nhập nội dung cuộc họp"
              onChange={handleContent}
            />
          </div>

          <div className={styles.form_gr}>
            <div className={styles.gr}>
              <div className={styles.date_start}>
                <p>
                  Thời gian bắt đầu <span style={{ color: 'red' }}>*</span>
                </p>
                <Input
                  placeholder="date"
                  defaultValue={formattedDate}
                  type="date"
                  style={{
                    padding: '7px 10px',
                    height: '37px',
                    minWidth: '100px',
                  }}
                  onChange={handleDateStart}
                />
              </div>
              <div className={styles.time_start}>
                <Input
                  type="time"
                  defaultValue={formattedTime}
                  style={{
                    padding: '7px 10px',
                    height: '37px',
                    minWidth: '100px',
                  }}
                  placeholder="time"
                  onChange={handleTimeStart}
                />
              </div>
              <div className={styles.time}>
                <p>
                  Thời lượng dự kiến
                  <span style={{ color: 'red' }}>*</span>
                </p>
                <Input
                  type="number"
                  value={formData.time_estimated}
                  status={
                    formData.time_estimated !== '' &&
                    (Number(formData.time_estimated) <= 0 ||
                      !Number.isInteger(formData.time_estimated))
                      ? 'error'
                      : undefined
                  }
                  placeholder="Nhập số phút"
                  style={{
                    padding: '7px 10px',
                  }}
                  onChange={handleDuration}
                />
                {formData.time_estimated !== '' &&
                  (Number(formData.time_estimated) <= 0 ||
                    !Number.isInteger(formData.time_estimated)) && (
                    <Typography.Text
                      type="danger"
                      style={{ fontWeight: 'bold' }}
                    >
                      Vui lòng nhập số nguyên lớn hơn 0
                    </Typography.Text>
                  )}
              </div>
            </div>
            {validate && formData?.time_estimated === '' && (
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
            <p>Thêm thư ký cuộc họp</p>
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
            <p>Thêm người chuẩn bị cuộc họp </p>
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
            <p>
              Thêm người tham gia cuộc họp{' '}
              <span style={{ color: 'red' }}>*</span>
            </p>
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
            <p>
              Phòng họp <span style={{ color: 'red' }}>*</span>
            </p>
            <Select
              style={{ width: '100%' }}
              onChange={handleRoom}
              defaultValue={listRoom[0]?.id}
            >
              {listRoom?.map((dt: any, index: number) => (
                <Option key={index} value={dt?.id}>
                  {dt?.name}
                </Option>
              ))}
            </Select>
          </div>
          <div>
            <p style={{ textAlign: 'center', marginTop: '15px' }}>
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
