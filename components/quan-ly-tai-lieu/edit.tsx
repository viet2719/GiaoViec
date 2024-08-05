import styled from '@emotion/styled/types/base';
import { Button, Modal } from 'antd';
import { useState } from 'react';
import styles from './Chitiet.module.css';
import { POST } from '@/pages/api/auth';

const App = ({
  comment,
  reload,
  setReload,
}: {
  comment: any;
  reload: any;
  setReload: any;
}) => {
  const [cmt, setCmt] = useState(comment.content);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    try {
      POST(
        `files/chi-tiet-tai-lieu/${comment.id_files}/edit-comment/${comment.id}`,
        { content: cmt }
      ).then((res) => {
        alert('Chỉnh sửa bình luận thành công!');
        setReload(!reload);
      });
    } catch (err) {
      alert('Chỉnh sửa bình luận thất bại!');
      setReload(!reload);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e: any) => {
    setCmt(e.target.value);
  };
  return (
    <>
      <p onClick={showModal} style={{ display: 'flex', alignItems: 'center' }}>
        {/* <Image
              unoptimized width={14} height={20} alt="" /> */}
        Chỉnh sửa bình luận
      </p>
      <Modal
        title="Sửa bình luận"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <textarea
          defaultValue={cmt}
          style={{ width: '100%' }}
          onChange={handleInputChange}
        ></textarea>
        <div className={styles.btn}>
          <button className={styles.btn_huy} onClick={handleCancel}>
            Hủy
          </button>
          <button className={styles.btn_ok} onClick={handleOk}>
            Lưu
          </button>
        </div>
      </Modal>
    </>
  );
};

export default App;
