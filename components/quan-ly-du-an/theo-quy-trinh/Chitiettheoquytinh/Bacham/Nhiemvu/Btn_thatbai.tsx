import React, { useState } from 'react';
import { Modal } from 'antd';
import Image from 'next/image';

import styles from './nhiemvu.module.scss';

import { POST } from '@/pages/api/auth';

const Thatbai: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState('');
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    alert('Đã chuyển nhiệm vụ tới giai đoạn thất bại');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSetFail = () => {
    const idTask = localStorage.getItem('task_id');
    POST(`projects/chi-tiet-nhiem-vu/${idTask}/cap-nhap-ly-do-that-bai`, {
      textReason: reason,
    }).then((res) => {
      alert('Đã chuyển nhiệm vụ tới giai đoạn thất bại');
      setIsModalOpen(false);
    });
  };
  return (
    <>
      <p
        onClick={showModal}
        style={{
          margin: 0,
          color: '#ffffff',
          fontWeight: 'bold',
          width: '150px',
          height: '30px',
          background: '#ed5b5b',
          textAlign: 'center',
          borderRadius: '5px',
        }}
      >
        Đánh dấu thất bại
      </p>
      <Modal
        title="Chuyển sang giai đoạn thất bại"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ fontSize: '16px' }}>
          <p style={{ fontWeight: 'bold' }}>Lý do thất bại</p>
          <textarea
            name=""
            id=""
            placeholder="Nhập lý do thất bại"
            style={{ width: '100%', paddingLeft: '10px' }}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>
        <div className={styles.button}>
          <button className={styles.huy} onClick={handleCancel}>
            Hủy
          </button>
          <button className={styles.ok} onClick={handleSetFail}>
            Đồng ý
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Thatbai;
