import React, { useState } from 'react';
import { Modal, message } from 'antd';
import styles from './Diadiem.module.css';
import Image from 'next/image';
import { POST } from '@/pages/api/auth';
const DeletePlace: any = ({
  id,
  name,
  setReload,
}: {
  id: string;
  name: string;
  setReload: Function;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    POST(`meeting-rooms/quan-ly-dia-diem/delete/${id}`).then((res) => {
      if (res) {
        setReload(true);
        setIsModalOpen(false);
        message.success('Xóa địa điểm thành công');
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
          Khi xoá địa điểm <span style={{ fontWeight: 'bold' }}>{name}</span>,
          tất cả các phòng họp và các cuộc họp tại địa điểm này cũng sẽ bị xoá.
          Bạn có muốn tiếp tục không?
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

export default DeletePlace;
