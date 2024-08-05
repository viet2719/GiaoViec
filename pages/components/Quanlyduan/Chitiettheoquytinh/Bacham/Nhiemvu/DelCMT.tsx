import React, { useState } from 'react';
import { Modal, message } from 'antd';
import Image from 'next/image';
import styles from "@/pages/components/Quanlyduan/Chitiettheoquytinh/detail_modal/thêm trường tùy chỉnh/truong.module.css";
import { POST } from '@/pages/api/auth';


const Xoa: React.FC<any> = ({
    type,
    id,
    commentId,
    reload,
    setReload,
}:{
    type:string,
    id:any,
    commentId:number,
    reload:boolean,
    setReload:Function,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        type === '1' ?
        POST(`me/chi-tiet-cong-viec-cua-toi/project/${id}/delete-comment/${commentId}`)
        .then(res => {
            if(res){
                message.success('Xóa bình luận thành công')
                setIsModalOpen(false);
                setReload(!reload)
            }
        })
        :
        POST(`me/chi-tiet-cong-viec-cua-toi/process/${id}/delete-comment/${commentId}`)
        .then(res => {
            if(res){
                message.success('Xóa bình luận thành công')
                setIsModalOpen(false);
                setReload(!reload)
            }
        })
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

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
};

export default Xoa;