'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './detail_modal/Themnhiemvu/Add_mission.module.css';
import { Select, Modal, Checkbox } from 'antd';
import type { SelectProps } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useDispatch } from 'react-redux';
import { Task, addTask } from '@/store/actions/stagesActions';
import { POST } from '@/pages/api/auth';

const ThemNhiemVuMoi: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const plainOptions = ['Quan trọng', 'Khẩn cấp'];
  const [optionsMember, setOptionsMember] = useState<SelectProps['options']>(
    []
  );

  //field post
  const [name, setName] = useState<string>('');
  const [performs, setPerforms] = useState<string[]>([]);
  const [description, setDescription] = useState<string>('');
  const [card, setCard] = useState<number[]>([]);
  //useEffect
  useEffect(() => {
    try {
      const processId = localStorage.getItem('process_id');
      POST(`projects/chi-tiet-du-an-theo-quy-trinh/${processId}`).then(
        (res) => {
          //member
          const listIdMember = res?.data.processStage[0]?.stage_member;
          const listIdMemberArr = listIdMember?.split(',');
          const filteredListMember = res?.data.listEp.filter((item: any) =>
            listIdMemberArr?.includes(item._id.toString())
          );
          const newOptionsMember = filteredListMember?.map((item: any) => ({
            label: item.userName,
            value: item._id,
          }));
          setOptionsMember(newOptionsMember || []);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }, []);
  const onChange = (checkedValues: CheckboxValueType[]) => {
    const updatedCard: number[] = [];

    if (checkedValues.includes('Quan trọng')) {
      updatedCard.push(1);
    }

    if (checkedValues.includes('Khẩn cấp')) {
      updatedCard.push(2);
    }

    setCard(updatedCard);
  };

  const handleChange = (value: string | string[]) => {
    setPerforms(Array.isArray(value) ? value : [value]);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAddTask = () => {
    const taskData: Task = {
      id: '',
      name_misssion: name,
      misssion_staff_id: performs.join(','),
      misssion_description: description,
      card: card.join(','),
      misssion_staff_name: '',
    };
    const processId = localStorage.getItem('process_id');
    console.log(taskData);
    dispatch(addTask(processId as any, taskData) as any);
    setIsModalOpen(false);
  };
  return (
    <div>
      <button
        onClick={showModal}
        style={{
          border: 'none',
          background: '#4c5bd4',
          color: '#ffffff',
          fontSize: '13px',
          height: '32px',
          fontWeight: 'bold',
          borderRadius: '20px',
          padding: '6px 10px',
        }}
      >
        + Nhiệm vụ
      </button>
      <Modal
        title="Thêm nhiệm vụ mới"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className={styles.title}>
          <p className={styles.name}>
            Tên nhiệm vụ <span>*</span>
          </p>
          <input
            style={{ width: '100%' }}
            type="text"
            placeholder="Nhập tên nhiệm vụ"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.title}>
          <p className={styles.name}>
            Thêm thẻ nhiệm vụ <span>*</span>
          </p>
          <Checkbox.Group
            options={plainOptions}
            defaultValue={[]}
            onChange={onChange}
          />
        </div>

        <div className={styles.title}>
          <p className={styles.name}>Mô tả nhiệm vụ</p>
          <textarea
            style={{ width: '100%' }}
            name=""
            id=""
            placeholder="Nhập mô tả nhiệm vụ"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.title}>
          <p className={styles.name}>
            Thêm thành viên thực hiện <span>*</span>
          </p>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Thêm thành viên thực hiện"
            defaultValue={[]}
            onChange={handleChange}
            options={optionsMember}
          />
        </div>

        <div className={styles.button}>
          <button className={styles.huy} onClick={handleCancel}>
            Hủy
          </button>
          <button className={styles.ok} onClick={handleAddTask}>
            Tạo nhiệm vụ
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default ThemNhiemVuMoi;
