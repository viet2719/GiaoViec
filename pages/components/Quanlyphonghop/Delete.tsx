import React, { useState } from 'react';
import { Modal } from 'antd';
import styles from '@/pages/components/Quanlyduan/Chitiettheoquytinh/detail_modal/thêm trường tùy chỉnh/truong.module.css';
import Image from 'next/image';
import { POST } from '@/pages/api/auth';
const Del: any = ({ id, setReload }: { id: string; setReload: Function }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    POST(`meeting-rooms/quan-ly-dia-diem/delete/${id}`).then((res) => {
      if (res) {
        setReload(true);
        setIsModalOpen(false);
      }
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <a style={{ color: 'red' }} onClick={showModal}>
        <Image
          unoptimized
          width={14}
          height={16}
          alt=""
          src="https://hungha365.com/storageimage/GV/del_ql_rd.png"
        />
        Xóa
      </a>

      <Modal
        title="Xóa địa điểm"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ padding: '20px', fontSize: '16px', textAlign: 'center' }}>
          Khi xoá địa điểm <span style={{ fontWeight: 'bold' }}>Dịa điểm </span>
          , tất cả các phòng họp và các cuộc họp tại địa điểm này cũng sẽ bị
          xoá. Bạn có muốn tiếp tục không?
        </div>
        <div className={styles.button}>
          <button className={styles.huy} onClick={handleCancel}>
            Hủy
          </button>
          <button className={styles.ok} onClick={handleOk}>
            Xóa
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Del;
