'use client';
import React, { useState } from 'react';
import styles from './Dongda.module.css';
import Image from 'next/image';
import { Select, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { closeProcess } from '@/store/actions/processesActions';

const Dongda: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCloseProcess = () => {
    const processId = localStorage.getItem('process_id');

    dispatch(closeProcess(processId as any) as any);
    setIsModalOpen(false);
  };
  return (
    <div>
      <p onClick={showModal} style={{ margin: '0' }}>
        <Image
          unoptimized
          width={18}
          height={18}
          src="https://hungha365.com/storageimage/GV/khoa_dsda.png"
          alt=""
          style={{ marginRight: 10 }}
        />
        Đóng dự án
      </p>
      <Modal
        title="Đóng quy trình"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <p>
            Bạn có chắc đóng quy trình <b>làm việc 123</b> không ? Sau khi đóng
            quy trình các thành viên không thể thêm nhiệm vụ mới và các nhiệm vụ
            trước đó vẫn hoạt động bình thường!
          </p>
        </div>

        <div className={styles.title} style={{ display: 'flex' }}>
          <p className={styles.name} style={{ paddingRight: '10px' }}>
            Trạng thái:{' '}
          </p>
          <Select
            showSearch
            style={{ width: 380 }}
            placeholder="Chọn trạng thái"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? '').includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={[
              {
                value: '0',
                label: 'Dự án thất bại ',
              },
              {
                value: '1',
                label: 'Dự án thành công',
              },
            ]}
          />
        </div>

        <div className={styles.button}>
          <button className={styles.huy} onClick={handleCancel}>
            Hủy
          </button>
          <button className={styles.ok} onClick={handleCloseProcess}>
            Đồng ý
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default Dongda;
