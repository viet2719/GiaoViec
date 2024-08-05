'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import styles from './nhiemvu.module.scss';
import { Select, Modal, Checkbox } from 'antd';
import type { SelectProps } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';

const onChange = (checkedValues: CheckboxValueType[]) => {
  console.log('checked = ', checkedValues);
};

const plainOptions = ['Quan trọng', 'Khẩn cấp'];

const options: SelectProps['options'] = [];

for (let i = 1; i < 10; i++) {
  options.push({
    label: 'Nguyễn Hoàng' + i,
    value: 'Nguyễn Hoàng' + i,
  });
}
const handleChange = (value: string | string[]) => {
  console.log(`Selected: ${value}`);
};

const Xoanhiemvu: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    alert('Sửa nhiệm vụ thành công');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <p onClick={showModal} style={{ margin: '0' }}>
        <Image
          unoptimized
          width={18}
          height={18}
          src="https://hungha365.com/storageimage/GV/editch.png"
          alt=""
          style={{ marginRight: 10 }}
        />
        Sửa nhiệm vụ
      </p>
      <Modal
        title="Sửa nhiệm vụ"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className={styles.title}>
          <p className={styles.name}>
            Tên nhiệm vụ <span>*</span>
          </p>
          <input type="text" placeholder="Nhập tên nhiệm vụ" />
        </div>
        <div className={styles.title}>
          <p className={styles.name}>
            Thêm thẻ nhiệm vụ <span>*</span>
          </p>
          <Checkbox.Group
            options={plainOptions}
            defaultValue={[]}
            onChange={onChange}
          />
        </div>

        <div className={styles.title}>
          <p className={styles.name}>Mô tả nhiệm vụ</p>
          <textarea name="" id="" placeholder="Nhập mô tả nhiệm vụ" />
        </div>
        <div className={styles.title}>
          <p className={styles.name}>
            Thêm thành viên thực hiện <span>*</span>
          </p>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Thêm thành viên thực hiện"
            defaultValue={[]}
            onChange={handleChange}
            options={options}
          />
        </div>
        <div className={styles.button}>
          <button className={styles.huy} onClick={handleCancel}>
            Hủy
          </button>
          <button className={styles.ok} onClick={handleOk}>
            Đồng ý
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default Xoanhiemvu;
