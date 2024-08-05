'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Theoquytrinh.module.css';
import { Select, Modal, Checkbox } from 'antd';
import type { SelectProps } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Process, addProcess } from '@/store/actions/processesActions';
import { POST, POST_QLC } from '@/pages/api/auth';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';

const Themquytrinh: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const plainOptions = ['Quan trọng', 'Khẩn cấp'];
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const dispatch = useDispatch();
  const isProcessAdded = useSelector(
    (state: RootState) => state.processes.isProcessAdded
  );
  //array member
  const [admins, setAdmins] = useState<string[]>([]);
  const [follows, setFollows] = useState<string[]>([]);
  const [reviews, setReviews] = useState<string[]>([]);
  const [performs, setPerforms] = useState<string[]>([]);

  //field post
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [timeIn, setTimeIn] = useState<string>('');
  const [timeOut, setTimeOut] = useState<string>('');
  const [dateStart, setDateStart] = useState<string>('');
  const [dateEnd, setDateEnd] = useState<string>('');
  const [card, setCard] = useState<number[]>([]);
  const [failure, setFailure] = useState<string>('');
  useEffect(() => {
    try {
      POST_QLC('managerUser/listAll').then((res) => {
        const newOptions = res?.items.map((item: any) => ({
          label: item.ep_name,
          value: item._id,
        }));
        setOptions(newOptions || []);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  //handle
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
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleAdminChange = (value: string | string[]) => {
    setAdmins(Array.isArray(value) ? value : [value]);
  };
  const handleReviewChange = (value: string | string[]) => {
    setReviews(Array.isArray(value) ? value : [value]);
  };
  const handleFollowChange = (value: string | string[]) => {
    setFollows(Array.isArray(value) ? value : [value]);
  };
  const handlePerformChange = (value: string | string[]) => {
    setPerforms(Array.isArray(value) ? value : [value]);
  };

  //add
  const handleAddProcess = async () => {
    try {
      const processData: Process = {
        process_id: '',
        process_name: name,
        process_description: description,
        time_in: timeIn,
        time_out: timeOut,
        date_start: dateStart,
        date_end: dateEnd,
        process_card: card.join(','),
        process_management: admins.join(','),
        process_member: performs.join(','),
        process_failure: failure,
        process_follow: follows.join(','),
        process_evaluate: reviews.join(','),
      };

      await dispatch(addProcess(processData) as any);

      if (isProcessAdded) {
        setIsModalOpen(false);
      } else {
        setIsModalOpen(true);
      }
    } catch (error) {
      // Handle any errors that occur during the process addition
      console.error('Error adding process:', error);
      setIsModalOpen(true);
    }
  };

  // ...

  <button onClick={handleAddProcess}>Add Process</button>;
  return (
    <div>
      <p onClick={showModal} style={{ margin: '0' }}>
        <Image
          unoptimized
          width={18}
          height={18}
          src="https://hungha365.com/storageimage/GV/Vector (17).png"
          alt=""
          style={{ marginRight: 10 }}
        />
        Thêm quy trình
      </p>
      <Modal
        title="Thêm quy trình"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className={styles.title}>
          <p className={styles.name}>
            Tên quy trình <span>*</span>
          </p>
          <input
            style={{ width: '100%' }}
            type="text"
            placeholder="Tên quy trình"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.title}>
          <p className={styles.name}>
            Thêm thẻ quy trình <span>*</span>
          </p>
          <Checkbox.Group
            options={plainOptions}
            defaultValue={[]}
            onChange={onChange}
          />
        </div>
        <div className={styles.title}>
          <p className={styles.name}>
            Thêm thành viên quản trị <span>*</span>
          </p>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Chọn thành viên quản trị"
            defaultValue={[]}
            onChange={handleAdminChange}
            options={options}
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
            placeholder="Chọn thành viên thực hiện"
            defaultValue={[]}
            onChange={handlePerformChange}
            options={options}
          />
        </div>
        <div className={styles.title}>
          <p className={styles.name}>Thêm thành viên theo dõi dự án </p>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Chọn thành viên theo dõi"
            defaultValue={[]}
            onChange={handleFollowChange}
            options={options}
          />
        </div>
        <div className={styles.title}>
          <p className={styles.name}>Thêm thành viên đánh giá </p>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Chọn thành viên đánh giá"
            defaultValue={[]}
            onChange={handleReviewChange}
            options={options}
          />
        </div>
        <div className={styles.title}>
          <p className={styles.name}>Mô tả quy trình</p>
          <textarea
            style={{ width: '100%' }}
            name=""
            id=""
            placeholder="Nhập mô tả quy trình"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.title}>
          <p className={styles.name}>
            Lý do thất bại<span>*</span>
          </p>
          <input
            style={{ width: '100%' }}
            name=""
            id=""
            placeholder="Nhập lý do thất bại"
            value={failure}
            onChange={(e) => setFailure(e.target.value)}
          />
        </div>
        <div className={styles.title}>
          <p className={styles.name}>
            Thời gian bắt đầu <span>*</span>
          </p>
          <div className={styles.time_work}>
            <input
              style={{ width: '45%' }}
              type="date"
              value={dateStart}
              onChange={(e) => setDateStart(e.target.value)}
            />
            <input
              style={{ width: '45%' }}
              type="time"
              value={timeIn}
              onChange={(e) => setTimeIn(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.title}>
          <p className={styles.name}>
            Thời gian kết thúc <span>*</span>{' '}
          </p>
          <div className={styles.time_work}>
            <input
              style={{ width: '45%' }}
              type="date"
              value={dateEnd}
              onChange={(e) => setDateEnd(e.target.value)}
            />
            <input
              style={{ width: '45%' }}
              type="time"
              value={timeOut}
              onChange={(e) => setTimeOut(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.button}>
          <button className={styles.huy} onClick={handleCancel}>
            Hủy
          </button>
          <button className={styles.ok} onClick={handleAddProcess}>
            Thêm quy trình
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default Themquytrinh;
