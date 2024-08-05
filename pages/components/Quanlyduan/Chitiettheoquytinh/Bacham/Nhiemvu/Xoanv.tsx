import React, { useState } from 'react';
import { Modal } from 'antd';
import Image from 'next/image';
import styles from '@/pages/components/Quanlyduan/Chitiettheoquytinh/detail_modal/thêm trường tùy chỉnh/truong.module.css';
import { Task, delTask } from '@/store/actions/stagesActions';
import { useDispatch } from 'react-redux';

export default function Xoa(props: { task: Task }) {
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

  const handleDelTask = () => {
    const processId = localStorage.getItem('process_id');
    dispatch(delTask(processId as any, props.task.id as any) as any);
    setIsModalOpen(false);
  };

  return (
    <>
      <p
        className={styles.xoa}
        onClick={showModal}
        style={{ margin: 0, color: 'black', fontWeight: 'normal' }}
      >
        <Image
          unoptimized
          width={18}
          height={18}
          alt=""
          src="https://hungha365.com/storageimage/GV/xoa_cvc.png"
          style={{ marginRight: 10 }}
        />
        Xóa nhiệm vụ
      </p>
      <Modal
        title="Xác nhận xóa nhiệm vụ"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ padding: '20px', fontSize: '16px', textAlign: 'center' }}>
          Bạn có đồng ý xóa nhiệm vụ
          <span style={{ fontWeight: 'bold' }}>
            {' '}
            {props.task.name_misssion}
          </span>{' '}
          này? Tất cả các công việc con sẽ bị xóa và không thể khôi phục!
        </div>
        <div className={styles.button}>
          <button className={styles.huy} onClick={handleCancel}>
            Hủy
          </button>
          <button className={styles.ok} onClick={handleDelTask}>
            Xóa
          </button>
        </div>
      </Modal>
    </>
  );
}
