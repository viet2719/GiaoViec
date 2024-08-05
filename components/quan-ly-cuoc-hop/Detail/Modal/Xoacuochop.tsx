import React, { useState } from 'react';
import { Modal } from 'antd';
import Image from 'next/image';
import styles from './edm.module.scss';
import { POST } from '@/pages/api/auth';

const Xoa: React.FC<any> = ({ setActiveKey }: { setActiveKey: Function }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    POST(
      `meetings/chi-tiet-cuoc-hop/${window.sessionStorage.getItem(
        'id_chi_tiet_cuoc_hop'
      )}/delete`
    ).then((res) => {
      if (res) {
        setActiveKey('quan-ly-cuoc-hop');
        setIsModalOpen(false);
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
          src="https://hungha365.com/storageimage/GV/xoa_cvc.png"
          style={{ marginRight: '10px' }}
        />
        Xóa cuộc họp
      </p>
      <Modal
        title="Xác nhận xóa cuộc họp"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ padding: '20px', fontSize: '16px', textAlign: 'center' }}>
          Bạn có chắc muốn xóa cuộc họp{' '}
          <span style={{ fontWeight: 'bold' }}></span>này ?
        </div>
        <div className={styles.button}>
          <button className={styles.huy} onClick={handleCancel}>
            Hủy
          </button>
          <button className={styles.ok} onClick={handleOk}>
            Xác nhận
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Xoa;
