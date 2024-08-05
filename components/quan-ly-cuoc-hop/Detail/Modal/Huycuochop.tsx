import React, { useState } from 'react';
import { Modal } from 'antd';
import Image from 'next/image';
import styles from './edm.module.scss';
import { POST } from '@/pages/api/auth';

const Huycuochop: React.FC<any> = ({
  setActiveKey,
}: {
  setActiveKey: Function;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    POST(
      `meetings/chi-tiet-cuoc-hop/${window.sessionStorage.getItem(
        'id_chi_tiet_cuoc_hop'
      )}/huy-cuoc-hop`
    ).then((res) => {
      if (res) {
        setIsModalOpen(false);
        setActiveKey('quan-ly-cuoc-hop');
      }
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <p className="cv_dot" onClick={showModal} style={{ margin: '0' }}>
        <Image
          unoptimized
          width={18}
          height={16}
          alt="met"
          src="https://hungha365.com/storageimage/GV/cancel_meet.png"
          style={{ marginRight: '10px' }}
        />
        Hủy cuộc họp
      </p>
      <Modal
        title="Hủy cuộc họp"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ padding: '20px', fontSize: '16px' }}>
          Bạn có chắc muốn hủy cuộc họp{' '}
          <span style={{ fontWeight: 'bold' }}>Họp khẩn cấp</span>này ?
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
    </>
  );
};

export default Huycuochop;
