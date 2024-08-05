import React, { useState } from 'react';
import { Button, Modal, message } from 'antd';
import Image from 'next/image';
import styles from './modal.module.scss';
import { POST } from '@/pages/api/auth';

const DelCV: React.FC<any> = ({
  type,
  data,
  id,
  setReload,
  reload,
}: {
  type: string;
  data: any;
  id: number;
  setReload: Function;
  reload: boolean;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    type === '1'
      ? POST(
          `me/chi-tiet-cong-viec-cua-toi/project/${id}/delete-job-of-job/${data?.id}`
        ).then((res) => {
          if (res) {
            message.success('Xóa thành công!');
            setIsModalOpen(false);
            setReload(!reload);
          }
        })
      : POST(
          `me/chi-tiet-cong-viec-cua-toi/process/${id}/delete-mission-job/${data?.id}`
        ).then((res) => {
          if (res) {
            message.success('Xóa thành công!');
            setIsModalOpen(false);
            setReload(!reload);
          }
        });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <p
        className={`cv_dot ${styles.cv_dot}`}
        onClick={showModal}
        style={{ margin: 0 }}
      >
        <Image
          unoptimized
          width={18}
          height={18}
          alt=""
          src="https://hungha365.com/storageimage/GV/xoa_cvc.png"
          style={{ marginRight: 10 }}
        />
        Xóa công việc
      </p>
      <Modal
        title="Xóa công việc"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p className={styles.text__center}>
          {`Bạn có chắc muốn xóa vĩnh viễn ${
            type === '1' ? data?.job_name_job : data?.job_name
          }? Sau khi xoá sẽ không thể khôi phục!`}
        </p>
        <div className={styles.btn}>
          <button
            onClick={handleCancel}
            className={`${styles.btn__btn} ${styles.huy} `}
          >
            Hủy
          </button>
          <button
            onClick={handleOk}
            className={`${styles.btn__btn} ${styles.ok}`}
          >
            Xác nhận
          </button>
        </div>
      </Modal>
    </>
  );
};

export default DelCV;
