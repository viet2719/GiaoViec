import React, { useState } from 'react';
import { Modal } from 'antd';
import Image from 'next/image';
import styles from './truong.module.css';
import { Option, delOption } from '@/store/actions/optionsAction';
import { useDispatch } from 'react-redux';

function Xoa(props: { option: Option }) {
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

  const handleDelOption = () => {
    dispatch(delOption(props.option.id as any) as any);
    setIsModalOpen(false);
  };

  return (
    <>
      <p className={styles.xoa} onClick={showModal} style={{ margin: 0 }}>
        Xóa
      </p>
      <Modal
        title="Xác nhận xóa trường tùy chỉnh"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ padding: '20px', fontSize: '16px' }}>
          Bạn có chắc muốn trường tùy chỉnh{' '}
          <span style={{ fontWeight: 'bold' }}>{props.option.name_option}</span>{' '}
          ?
        </div>
        <div className={styles.button}>
          <button className={styles.huy} onClick={handleCancel}>
            Hủy
          </button>
          <button className={styles.ok} onClick={handleDelOption}>
            Xác nhận
          </button>
        </div>
      </Modal>
    </>
  );
}

export default Xoa;
