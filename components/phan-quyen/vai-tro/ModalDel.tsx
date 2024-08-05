import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import Image from 'next/image';
import styles from './vaitro.module.css';
import Del from './Alert/Del';
const App = ({
  id,
  reload,
  setReLoad,
  name,
}: {
  id: any;
  reload: any;
  setReLoad: any;
  name: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <a
        onClick={showModal}
        style={{ fontWeight: 'bold', fontSize: '15px', color: '#f46a6a' }}
      >
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
        title="Xóa vai trò"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p
          style={{ textAlign: 'center', fontSize: '16px', paddingTop: '10px' }}
        >
          Bạn có chắc chắn muốn xóa vai trò <span>{name}</span> này không?
        </p>
        <div className={styles.button}>
          <button className={styles.huy} onClick={handleCancel}>
            Hủy
          </button>
          <Del
            id={id}
            setIsModalOpen={setIsModalOpen}
            reload={reload}
            setReLoad={setReLoad}
          />
        </div>
      </Modal>
    </>
  );
};

export default App;
