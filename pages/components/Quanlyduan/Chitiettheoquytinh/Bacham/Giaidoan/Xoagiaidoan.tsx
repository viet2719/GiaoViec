import React, { useState } from 'react';
import { Modal } from 'antd';
import Image from 'next/image';
import styles from '@/pages/components/Quanlyduan/Chitiettheoquytinh/detail_modal/thêm trường tùy chỉnh/truong.module.css';
import { useDispatch } from 'react-redux';
import { Stage, delStage } from '@/store/actions/stagesActions';

export default function Xoa(props: { stage: Stage }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  //handle
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    alert('Xóa thành công');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelStage = () => {
    dispatch(delStage(props.stage.id as any) as any);
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
        Xóa giai đoạn
      </p>
      <Modal
        title="Xác nhận xóa giai đoạn tùy chỉnh"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ padding: '20px', fontSize: '16px', textAlign: 'center' }}>
          Bạn có đồng ý xóa giai đoạn
          <span style={{ fontWeight: 'bold' }}> {props.stage.name}</span> này?
          Tất cả các nhiệm vụ sẽ bị xóa và không thể khôi phục!
        </div>
        <div className={styles.button}>
          <button className={styles.huy} onClick={handleCancel}>
            Hủy
          </button>
          <button className={styles.ok} onClick={handleDelStage}>
            Xóa
          </button>
        </div>
      </Modal>
    </>
  );
}
