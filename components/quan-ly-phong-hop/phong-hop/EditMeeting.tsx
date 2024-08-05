import React, { useEffect, useState } from 'react';
import {
  Button,
  Input,
  Modal,
  Select,
  Typography,
  message,
  notification,
} from 'antd';
import Image from 'next/image';
import styles from './Diadiem.module.css';
import { POST } from '@/pages/api/auth';

interface Props {
  data: any;
  listPlace: any[];
  setReload: Function;
}

const Btn_Address: React.FC<Props> = ({ data, listPlace, setReload }) => {
  //antd
  const { Option } = Select;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: data?.name,
    diadiem: data?.diadiem,
    succhua: data?.succhua,
    trangthai: data?.trangthai,
  });
  useEffect(() => {
    setFormData({
      name: data?.name,
      diadiem: data?.diadiem,
      succhua: data?.succhua,
      trangthai: data?.trangthai,
    });
  }, [data]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    if (formData?.name !== '' && formData?.succhua !== 0) {
      POST(`meeting-rooms/quan-ly-phong-hop/update/${data?.id}`, formData).then(
        (res) => {
          if (res) {
            setReload(true);
            setIsModalOpen(false);
            message.success('Sửa phòng họp thành công');
          }
        }
      );
    } else {
      notification.error({
        message: 'Lỗi',
        description: 'Vui lòng điền đầy đủ thông tin!',
      });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData({
      name: data?.name,
      diadiem: data?.diadiem,
      succhua: data?.succhua,
      trangthai: data?.trangthai,
    });
  };

  const onChange = (value: number) => {
    //console.log(`selected ${value}`);
    setFormData({ ...formData, diadiem: value });
  };
  const onSearch = (value: string) => {
    //console.log('search:', value);
  };
  const handleName = (value: any) => {
    setFormData({ ...formData, name: value.target.value });
  };
  const handleSucChua = (value: any) => {
    setFormData({ ...formData, succhua: Number(value.target.value) });
  };
  const handleStatus = (value: any) => {
    setFormData({ ...formData, trangthai: Number(value) });
  };
  return (
    <>
      <a type="primary" onClick={showModal} style={{ width: '136px' }}>
        <Image
          unoptimized
          width={18}
          height={16}
          alt=""
          src="https://hungha365.com/storageimage/GV/edit_ql_blue.png"
        />
        Sửa
      </a>

      <Modal
        title="Chỉnh sửa phòng họp"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <label
          className={styles.name}
          style={{ paddingBottom: '15px', width: '100%' }}
        >
          <p style={{ margin: '0' }}>
            Tên phòng họp <span style={{ color: 'red' }}>*</span>
          </p>
          <Input
            style={{ width: '100%', border: '1px solid #cccccc' }}
            type="text"
            placeholder="Nhập tên địa điểm"
            value={formData?.name}
            onChange={handleName}
          />
        </label>
        <label
          className={styles.select}
          style={{ paddingBottom: '15px', width: '100%' }}
        >
          <p style={{ margin: '0' }}>
            Chọn địa điểm <span style={{ color: 'red' }}>*</span>
          </p>
          <Select
            style={{ width: '100%' }}
            showSearch
            placeholder="Chọn địa điểm"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(Input, option) =>
              (option?.label ?? '').toLowerCase().includes(Input.toLowerCase())
            }
            value={formData?.diadiem}
            options={listPlace?.map((data: any) => ({
              value: data?.id,
              label: data?.name,
            }))}
          />
        </label>
        <label
          className={styles.name}
          style={{ paddingBottom: '15px', width: '100%' }}
        >
          <p style={{ margin: '0' }}>
            Sức chứa (số người)<span style={{ color: 'red' }}>*</span>
          </p>
          <Input
            style={{ width: '100%', border: '1px solid #cccccc' }}
            type="text"
            status={
              formData?.succhua !== null &&
              (formData?.succhua <= 0 || !Number.isInteger(formData?.succhua))
                ? 'error'
                : undefined
            }
            placeholder="Nhập tên địa chỉ"
            value={formData?.succhua || ''}
            onChange={handleSucChua}
          />
          {formData?.succhua !== null &&
            (formData?.succhua <= 0 ||
              !Number.isInteger(formData?.succhua)) && (
              <Typography.Text type="danger">
                Vui lòng nhập số nguyên lớn hơn 0
              </Typography.Text>
            )}
        </label>
        <label
          className={styles.select}
          style={{ paddingBottom: '15px', width: '100%' }}
        >
          <p style={{ margin: '0' }}>
            Trạng thái <span style={{ color: 'red' }}>*</span>
          </p>
          <Select value={formData?.trangthai} onChange={handleStatus}>
            <Option value={1}>Đang hoạt động</Option>
            <Option value={2}>Ngưng hoạt động</Option>
          </Select>
        </label>
        <div className={styles.btn}>
          <button className={styles.btn_huy} onClick={handleCancel}>
            Hủy
          </button>
          <button className={styles.btn_ok} onClick={handleOk}>
            Lưu
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Btn_Address;
