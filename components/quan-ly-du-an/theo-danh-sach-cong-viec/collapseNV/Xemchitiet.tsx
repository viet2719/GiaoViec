'use client';
import React, { useState, useEffect } from 'react';
import styles from './Add_duan.module.css';

import {
  convertDateFormat,
  calculateTaskStatusG,
  calculateTaskStatusJ,
} from '@/utils/dataUtils';
import Image from 'next/image';
import { Select, Modal, Checkbox, Input } from 'antd';
import type { SelectProps } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { getCurrentID, getType } from '@/pages/api/auth';
import { POST } from '@/pages/api/auth';

const Xemchitiet = ({
  itemGroup,
  listEp,
  project,
  reload,
  setReload,
}: {
  itemGroup: any;
  listEp: any;
  project: any;
  reload: any;
  setReload: any;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEvaluate, setIsEvaluate] = useState(false);
  const admin = getType() === '1';
  const employee = getCurrentID();
  useEffect(() => {
    if (project?.project_management?.includes(employee.toString())) {
      setIsEvaluate(true);
    }

    if (project?.project_evaluate?.includes(employee.toString())) {
      setIsEvaluate(true);
    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Lấy tên nhân viên
  const showNameEp = (stringId: any) => {
    const arrId = stringId.split(',').map(Number)
    let arrEp: any = []
    arrId.forEach((id: any) => {
      const emp = listEp.filter((employee: any) => {
        return (id === employee._id)
      })
      arrEp.push(emp[0]?.userName)
    })
    return arrEp?.join(', ')
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDanhGia = (e: any) => {
    POST(
      `projects/chi-tiet-du-an-theo-danh-sach-cong-viec/${itemGroup.id}/danhGiaNhomCongViec`,
      { quanli_danhgia: e.target.value }
    ).then((response) => {});
  };
  return (
    <div>
      <p onClick={showModal} style={{ margin: '0' }}>
        <Image
          unoptimized
          width={16}
          height={20}
          src="https://hungha365.com/storageimage/GV/chitiet.png"
          alt=""
          style={{ marginRight: 10 }}
        />
        Xem chi tiêt nhóm công việc
      </p>
      <Modal
        title="Xem chi tiêt nhóm công việc"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className={styles.title} style={{borderBottom: '1px dashed #666666'}}>
          <p className={styles.name}>
            Tên nhóm công việc:
          </p>
          <p>{itemGroup?.name}</p>
        </div>
        <div className={styles.title} style={{borderBottom: '1px dashed #666666'}}>
          <p className={styles.name}>Thẻ công việc:</p>
          <div>
            {itemGroup?.card?.includes(1) && <span style={{
              backgroundColor: '#76B51B',
              fontSize: '12px',
              color: '#ffffff',
              padding: '3px 10px',
              borderRadius: '57px',
              marginRight: '5px',
              marginLeft: '20px'
            }} >Quan trọng</span>}

            {itemGroup?.card?.includes(2) && <span style={{
              backgroundColor: '#F46A6A',
              fontSize: '12px',
              color: '#ffffff',
              padding: '3px 12px',
              borderRadius: '57px',
              marginLeft: '20px'}}>Khẩn cấp </span>}
          </div>
        </div>
        <div className={styles.title} style={{borderBottom: '1px dashed #666666'}}>
          <p className={styles.name}>Mô tả công việc: </p>
          <p>{itemGroup?.description}</p>
        </div>
        <div className={styles.title} style={{borderBottom: '1px dashed #666666'}}>
          <p className={styles.name}>Thành viên quản lý: </p>
          <p>{showNameEp(itemGroup?.project_manager)}</p>
        </div>
        <div className={styles.title} style={{borderBottom: '1px dashed #666666'}}>
          <p className={styles.name}>Thành viên thực hiện:</p>
          <p>{showNameEp(itemGroup?.project_member)}</p>
        </div>

        <div className={styles.title} style={{borderBottom: '1px dashed #666666'}}>
          <p className={styles.name} style={{display: 'inline-block'}}> Thời gian bắt đầu:</p>
          <p style={{color: '#76B51B', display: 'inline-block'}}>&nbsp;{itemGroup?.time_in} - {itemGroup?.date_start}</p>
        </div>

        <div className={styles.title} style={{borderBottom: '1px dashed #666666'}}>
          <p className={styles.name} style={{display: 'inline-block'}}>Thời gian kết thúc:</p>
          <p style={{color: '#F46A6A', display: 'inline-block'}}>&nbsp;{`${itemGroup?.time_out} - ${itemGroup?.date_end}`}</p>
        </div>

        <div
          className={styles.title}
          style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #666666' }}
        >
          <p className={styles.name}>{calculateTaskStatusG(itemGroup)} </p>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p style={{ fontWeight: 'bold' }}>Kết quả:</p>
            <Input
              value={
                itemGroup?.process_percent ? itemGroup?.process_percent : ''
              }
              suffix="%"
              disabled
              style={{ width: '80px', height: '30px' }}
            />
          </div>
        </div>
        <div
          className={styles.title}
          style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #666666' }}
        >
          <p className={styles.name}>Quản lý đánh giá: </p>
          <select
            defaultValue={itemGroup?.quanli_danhgia}
            name=""
            id=""
            style={{ width: 200, height: 34 }}
            disabled={!isEvaluate}
            onChange={handleDanhGia}
          >
            <option value="1">Chờ đánh giá</option>
            <option value="2">Vượt KPI</option>
            <option value="3">Đạt yêu cầu</option>
            <option value="4">Chưa đạt yêu cầu</option>
            <option value="5">Thất bại</option>
          </select>
        </div>
        <div className={styles.button} style={{justifyContent: 'center'}}>
          <button className={styles.huy} onClick={handleCancel}>
            Đóng
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default Xemchitiet;
