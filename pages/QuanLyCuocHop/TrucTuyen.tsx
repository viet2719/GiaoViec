import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Modal, Select, Form } from 'antd';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { POST, POST_QLC_NoCom } from '../api/auth';
import styles from '@/pages/components/MeetingManagement/Detail/Modal/Editmeeting.module.css';
import _, { values } from 'lodash';
import dayjs from 'dayjs';

export default function TrucTuyen({
  listDep,
  listEmp,
  setReload,
}: {
  listDep: any[];
  listEmp: any[];
  setReload: Function;
}) {
  const { Option } = Select;
  const [form] = Form.useForm();
  const formRef: any = useRef();
  const inputRef: any = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [validateOnChange, setValidateOnChange] = useState(false);
  const [listParticipant, setListParticipant]: any = useState([]);
  const [listParticipantNoDep, setListParticipantNoDep]: any = useState([]);
  const validationSchema = yup.object().shape({
    name_meeting: yup.string().required('Không thể bỏ trống'),
    content: yup.string().required('Không thể bỏ trống'),
    date_start: yup
      .string()
      .required('Không thể bỏ trống')
      .test(
        'is-greater-than-current-date',
        'Phải lớn hơn hiện tại',
        function (value) {
          const currentTime = dayjs().format('DD/MM/YYYY');
          const selectedTime = dayjs(`${value}`).format('DD/MM/YYYY');
          return selectedTime >= currentTime;
        }
      ),
    time_start: yup
      .string()
      .required('Không thể bỏ trống')
      .test(
        'is-greater-than-current-time',
        'Phải lớn hơn hiện tại',
        function (value) {
          const currentTime = dayjs().format('DD/MM/YYYY HH:mm');
          const date_start = this.parent.date_start;
          const selectedTime = dayjs(`${date_start} ${value}`).format(
            'DD/MM/YYYY HH:mm'
          );
          return selectedTime > currentTime;
        }
      ),
    time_estimated: yup.string().required('Không thể bỏ trống'),
    staff_owner: yup.string().required('Không thể bỏ trống'),
    staff_take_in: yup.string().required('Không thể bỏ trống'),
    address_links: yup
      .string()
      .required('Không thể bỏ trống')
      .url('Link không hợp lệ'),
  });
  const formik = useFormik({
    initialValues: {
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
    },
    validationSchema,
    validateOnChange,
    validateOnBlur: false,
    onSubmit: (values) => {
      //console.log('Form values:', values);
      POST('meetings/quan-ly-cuoc-hop/them-cuoc-hop-truc-tuyen', values).then(
        (res) => {
          if (res) {
            setReload(true);
            setIsModalOpen(false);
            setListParticipant([]);
            setListParticipantNoDep([]);
          }
        }
      );
    },
  });

  useEffect(() => {
    formik.setFieldValue(
      'staff_take_in',
      Array.from(new Set([...listParticipant, ...listParticipantNoDep])).join(
        ','
      )
    );
    form.setFieldsValue({
      staff_take_in: Array.from(
        new Set([...listParticipant, ...listParticipantNoDep])
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listParticipant, listParticipantNoDep]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: any) => {
    console.log(formik.values);
  };

  const handleChange = (value: any, name: string) => {
    formik.setFieldValue(name, value?.join(','));
  };

  const handleButtonSubmit = () => {
    setValidateOnChange(true);
  };

  const handleExit = () => {
    setValidateOnChange(false);
    formik.setErrors({});
    formik.resetForm();
    form.resetFields();
  };

  const handleSelectParticipant = (value: any) => {
    setListParticipantNoDep([...listParticipantNoDep, value]);
  };

  const handleRemoveParticipant = (value: any) => {
    const updatedItems = listParticipantNoDep?.filter(
      (item: any) => item !== value
    );
    setListParticipantNoDep(updatedItems);
  };

  const handleChangeDep = async (
    value: any | any[],
    this_name: string,
    emp_name: string
  ) => {
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
    formik.setFieldValue(this_name, string);
  };

  const handleSendMail = (e: any, name: string) => {
    //console.log(e.target.checked);
    formik.setFieldValue(name, e.target.checked ? 1 : 0);
  };

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
    <div>
      <p className="cv_dot" onClick={showModal} style={{ margin: '0' }}>
        <Image
          unoptimized
          width={20}
          height={18}
          alt=""
          src="https://hungha365.com/storageimage/GV/wif_meet.png"
          style={{ marginRight: 10 }}
        />
        Thêm cuộc họp trực tuyến
      </p>
      <Modal
        title=" Thêm cuộc họp trực tuyến"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
        afterClose={handleExit}
      >
        <Form form={form} ref={formRef} onFinish={formik.handleSubmit}>
          <div className={styles.name_meeting}>
            <div className={styles.form_gr}>
              <p>
                Tên cuộc họp <span style={{ color: 'red' }}>*</span>
              </p>
              <Form.Item
                name={'name_meeting'}
                help={formik.errors.name_meeting}
                validateStatus={formik.errors.name_meeting ? 'error' : ''}
              >
                <input
                  style={{ width: '100%' }}
                  type="text"
                  placeholder="Nhập tên cuộc họp"
                  //onChange={handleName}
                  value={formik.values.name_meeting}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>
            </div>
            <div className={styles.form_gr}>
              <p>
                Nội dung cuộc họp cuộc họp{' '}
                <span style={{ color: 'red' }}>*</span>
              </p>
              <Form.Item
                name={'content'}
                help={formik.errors.content}
                validateStatus={formik.errors.content ? 'error' : ''}
              >
                <textarea
                  style={{ width: '100%' }}
                  placeholder="Nhập nội dung cuộc họp"
                  value={formik.values.content}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>
            </div>

            <div className={styles.form_gr}>
              <div className={styles.gr}>
                <div className={styles.date_start}>
                  <p>
                    Thời gian bắt đầu <span style={{ color: 'red' }}>*</span>
                  </p>
                  <Form.Item
                    name={'date_start'}
                    help={formik.errors.date_start}
                    validateStatus={formik.errors.date_start ? 'error' : ''}
                  >
                    <input
                      placeholder="date"
                      type="date"
                      style={{
                        width: '132px',
                        padding: '7px 10px',
                        borderRadius: '5px',
                        border: '1px solid black',
                        marginTop: '0',
                      }}
                      value={formik.values.date_start}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Form.Item>
                </div>
                <div className={styles.time_start}>
                  <Form.Item
                    name={'time_start'}
                    help={formik.errors.time_start}
                    validateStatus={formik.errors.time_start ? 'error' : ''}
                  >
                    <input
                      type="time"
                      placeholder="time"
                      value={formik.values.time_start}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Form.Item>
                </div>
                <div className={styles.time}>
                  <p>
                    Thời lượng dự kiến
                    <span style={{ color: 'red' }}>*</span>
                  </p>
                  <Form.Item
                    name={'time_estimated'}
                    help={formik.errors.time_estimated}
                    validateStatus={formik.errors.time_estimated ? 'error' : ''}
                  >
                    <input
                      type="text"
                      placeholder="Nhập số phút"
                      style={{
                        width: '132px',
                        padding: '7px 10px',
                        borderRadius: '5px',
                        border: '1px solid black',
                      }}
                      value={formik.values.time_estimated}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div className={styles.form_gr}>
              <p>Bộ phận</p>
              <Select
                mode="multiple"
                placeholder="Chọn bộ phận hoặc phòng ban"
                onChange={(value) =>
                  handleChangeDep(value, 'department_id', 'staff_take_in')
                }
                style={{ width: '100%', color: 'black' }}
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
              <Form.Item
                name={'staff_owner'}
                help={formik.errors.staff_owner}
                validateStatus={formik.errors.staff_owner ? 'error' : ''}
              >
                <Select
                  mode="multiple"
                  placeholder="Chọn người chủ trì cuộc họp"
                  onChange={(value) => handleChange(value, 'staff_owner')}
                  value={formik.values.staff_owner}
                  onBlur={formik.handleBlur}
                  style={{ width: '1005' }}
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
              </Form.Item>
            </div>
            <div className={styles.form_gr}>
              <p>
                Thêm thư ký cuộc họp <span style={{ color: 'red' }}>*</span>
              </p>
              <Select
                mode="multiple"
                placeholder="Chọn thư ký cuộc họp"
                onChange={(value) => handleChange(value, 'staff_ecretary')}
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
                onChange={(value) => handleChange(value, 'staff_preparation')}
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
              <Form.Item
                name={'staff_take_in'}
                help={formik.errors.staff_take_in}
                validateStatus={formik.errors.staff_take_in ? 'error' : ''}
              >
                <Select
                  mode="multiple"
                  placeholder="Chọn người tham gia"
                  onChange={(value) => handleChange(value, 'staff_take_in')}
                  onBlur={formik.handleBlur}
                  onSelect={handleSelectParticipant}
                  onDeselect={handleRemoveParticipant}
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
              </Form.Item>
            </div>
            {/* <div className={styles.form_gr}>
                        <p>Phòng họp</p>
                        <select name="aaa" id="" style={{ width: "100%" }}>
                            <option value="0">Họp mỗi ngày</option>
                            <option value="1">Phòng họp kiểm thử</option>
                            <option value="1">Phòng họp 11</option>
                        </select>
                    </div> */}
            <div className={styles.form_gr}>
              <div
                className={styles.link}
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <p style={{ fontWeight: 'bold' }}>Đường dẫn đi đến phòng họp</p>
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
              <Form.Item
                name={'address_links'}
                help={formik.errors.address_links}
                validateStatus={formik.errors.address_links ? 'error' : ''}
              >
                <input
                  ref={inputRef}
                  style={{
                    width: '100%',
                    height: '36px',
                    border: '1px solid black',
                  }}
                  type="text"
                  placeholder="Nhập đường dẫn cuộc họp"
                  value={formik.values.address_links}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>
            </div>
            <div>
              <p style={{ textAlign: 'center' }}>
                <input
                  placeholder="thongbao"
                  type="checkbox"
                  style={{ width: '15px' }}
                  onChange={(e) => handleSendMail(e, 'is_send_mail')}
                />
                Gửi tin nhắn thông báo
              </p>
            </div>
            <div className={styles.cancel_ok}>
              <button
                type="button"
                onClick={handleCancel}
                className={styles.huy}
              >
                Hủy
              </button>
              <button
                type="submit"
                onClick={handleButtonSubmit}
                className={styles.ok}
              >
                Tạo cuộc họp
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
}
