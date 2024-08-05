import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import Image from 'next/image';
import styles from './modal.module.scss';
import { POST } from '@/pages/api/auth';
import dayjs from 'dayjs';

const EditCV: React.FC<any> = ({
  data,
  id,
  setReload,
  reload,
  message,
}: {
  data: any;
  id: number;
  setReload: Function;
  reload: boolean;
  message: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newData, setNewData]: any = useState({});
  useEffect(() => {
    setNewData(data);
  }, [data, isModalOpen]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    POST(
      `projects/chi-tiet-nhiem-vu/${id}/edit-mission-job/${newData?.id}`,
      newData
    ).then((res) => {
      if (res) {
        setIsModalOpen(false);
        setReload(!reload);
      } else {
        alert(message);
      }
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleNameSubWork = (e: any) => {
    setNewData({ ...newData, job_name: e.target.value });
  };
  const handleNameSubDate = (e: any) => {
    setNewData({ ...newData, date_limit: e.target.value });
  };
  const handleNameSubTime = (e: any) => {
    setNewData({ ...newData, hour_limit: e.target.value });
  };
  return (
    <>
      <p className="cv_dot" onClick={showModal} style={{ margin: 0 }}>
        <Image
          width={18}
          height={18}
          alt=""
          src="https://hungha365.com/storageimage/GV/editch.png"
          style={{ marginRight: 10 }}
        />
        Sửa công việc
      </p>
      <Modal
        title="Sửa công việc con"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <div className={styles.name}>
            <p>Tên công việc</p>
            <input
              value={newData?.job_name}
              type="text"
              className={styles.input}
              onChange={handleNameSubWork}
            />
          </div>
          <div className={styles.member}>
            <p>Thành viên thực hiện</p>
            <input
              value={newData?.staff_id}
              type="text"
              disabled
              style={{ width: '100%' }}
              readOnly
            />
          </div>
          <div className={styles.time}>
            <p>Thời gian kết thúc</p>
            <div className={styles.date}>
              <input
                value={newData?.date_limit}
                type="date"
                className={styles.date__date}
                onChange={handleNameSubDate}
              />
              <input
                value={newData?.hour_limit}
                type="time"
                className={styles.date__date}
                onChange={handleNameSubTime}
              />
            </div>
          </div>
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
              Lưu
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditCV;
