import React, { useState } from 'react';
import { Modal, message } from 'antd';
import Image from 'next/image';
<<<<<<< HEAD:pages/components/MeetingManagement/Detail/Modal/Xoacuochop.tsx
import styles from '@/pages/components/Quanlyduan/Chitiettheoquytinh/detail_modal/thêm trường tùy chỉnh/truong.module.css';
import { POST } from '@/pages/api/auth';

const Xoa: React.FC<any> = ({ setActiveKey }: { setActiveKey: Function }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
=======
import styles from "@/pages/components/Quanlyduan/Chitiettheoquytinh/detail_modal/thêm trường tùy chỉnh/truong.module.css";
import { POST } from '@/pages/api/auth';


const Xoa: React.FC<any> = ({
    detailJob,
    reload,
    setReload,
    comment,
}:{
    detailJob:any,
    reload:boolean,
    setReload:Function,
    comment:any,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
>>>>>>> main:pages/components/Quanlyduan/Chitiettheoquytinh/Bacham/Nhiemvu/DelCmtDA.tsx

  const showModal = () => {
    setIsModalOpen(true);
  };

<<<<<<< HEAD:pages/components/MeetingManagement/Detail/Modal/Xoacuochop.tsx
  const handleOk = () => {
    POST(
      `meetings/chi-tiet-cuoc-hop/${window.sessionStorage.getItem(
        'id_chi_tiet_cuoc_hop'
      )}/delete`
    ).then((res) => {
      if (res) {
        setActiveKey('quan-ly-cuoc-hop');
=======
    const handleOk = () => {
        POST(`projects/chi-tiet-du-an/${detailJob.job_id}/delete-comment/${comment.id}`)
        .then(res => {
            if(res){
                message.success('Xóa bình luận thành công')
                setIsModalOpen(false);
                setReload(!reload)
            }
        })
    };
    const handleCancel = () => {
>>>>>>> main:pages/components/Quanlyduan/Chitiettheoquytinh/Bacham/Nhiemvu/DelCmtDA.tsx
        setIsModalOpen(false);
      }
    });
  };

<<<<<<< HEAD:pages/components/MeetingManagement/Detail/Modal/Xoacuochop.tsx
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <p className="cv_dot" onClick={showModal} style={{ margin: '0' }}>
        <Image
          unoptimized
          width={18}
          height={16}
          alt="met"
          src="https://hungha365.com/storageimage/GV/xoa_cvc.png"
          style={{ marginRight: '10px' }}
        />
        Xóa cuộc họp
      </p>
      <Modal
        title="Xác nhận xóa cuộc họp"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ padding: '20px', fontSize: '16px', textAlign: 'center' }}>
          Bạn có chắc muốn xóa cuộc họp{' '}
          <span style={{ fontWeight: 'bold' }}></span>này ?
        </div>
        <div className={styles.button}>
          <button className={styles.huy} onClick={handleCancel}>
            Hủy
          </button>
          <button className={styles.ok} onClick={handleOk}>
            Xác nhận
          </button>
        </div>
      </Modal>
    </>
  );
=======
    return (
        <>
            <p onClick={showModal}
                style={{ color: "red", cursor: "pointer", margin: "0rem" }}
            >
                Xóa
            </p>
            <Modal title="Xác nhận xóa bình luận" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} >
                <div style={{ padding: "20px", fontSize: "16px", textAlign: "center" }}>
                    Bạn có đồng ý xóa bình luận này không ?
                </div>
                <div className={styles.button}>
                    <button className={styles.huy} onClick={handleCancel}>Hủy</button>
                    <button className={styles.ok} onClick={handleOk}>Xác nhận</button>
                </div>
            </Modal>
        </>
    );
>>>>>>> main:pages/components/Quanlyduan/Chitiettheoquytinh/Bacham/Nhiemvu/DelCmtDA.tsx
};

export default Xoa;
