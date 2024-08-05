import React, { useState } from 'react';
import { Button, message, Space } from 'antd';
import styles from '../vaitro.module.css';
import { access } from 'fs';
import { POST } from '@/pages/api/auth';

const App = ({
  id,
  setIsModalOpen,
  reload,
  setReLoad,
}: {
  id: any;
  setIsModalOpen: Function;
  reload: any;
  setReLoad: any;
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  const showModal = () => {
    setIsModalOpen(true);
  };
  console.log(id);

  const handleOk = () => {
    POST(`roles/quan-ly-vai-tro/delete/${id}`, {})
      .then((response) => {
        setIsModalOpen(false);
        messageApi.open({
          type: 'success',
          content: 'Xóa vai trò thành công',
        });
      })
      .then(() => {
        setTimeout(() => {
          setReLoad(!reload);
        }, 1000);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      <button onClick={handleOk} className={styles.ok} type="submit">
        Xóa
      </button>
    </>
  );
};

export default App;
