import React, { useState } from 'react';
import { Modal } from 'antd';
import Image from 'next/image';
import styles from './thêm trường tùy chỉnh/truong.module.css';
import { useDispatch } from 'react-redux';
import { delProcess } from '@/store/actions/processesActions';

const Xoa: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const processName = localStorage.getItem('process_name');
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

  const handleDelProcess = () => {
    const processId = localStorage.getItem('process_id');

    dispatch(delProcess(processId as any) as any);
    setIsModalOpen(false);
  };
  return (
    <>
      <p onClick={showModal} style={{ margin: 0 }}>
        <Image
          unoptimized
          width={18}
          height={18}
          alt=""
          src="https://hungha365.com/storageimage/GV/xoa_cvc.png"
          style={{ marginRight: 10 }}
        />
        Xóa quy trình
      </p>
      <Modal
        title="Xác nhận xóa quy trình"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ padding: '20px', fontSize: '16px' }}>
          Bạn có chắc muốn xóa quy trình{' '}
          <span style={{ fontWeight: 'bold' }}>{processName}</span> ?
        </div>
        <div className={styles.button}>
          <button className={styles.huy} onClick={handleCancel}>
            Hủy
          </button>
          <button className={styles.ok} onClick={handleDelProcess}>
            Xác nhận
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Xoa;
