'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Modal.module.css';
import { Select, Modal, Checkbox } from 'antd';
import type { SelectProps } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { POST } from '@/pages/api/auth';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';
import { Process, editProcess } from '@/store/actions/processesActions';
const plainOptions = ['Quan trọng', 'Khẩn cấp'];

const handleChange = (value: string | string[]) => {
  console.log(`Selected: ${value}`);
};

const Chinhsuaquytrinh: React.FC = () => {
  const dispatch = useDispatch();
  const isProcessEdited = useSelector(
    (state: RootState) => state.processes.isProcessEdited
  );
  const [process, setProcess] = useState<Process>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const [admins, setAdmins] = useState<string[]>([]);
  const [admins2, setAdmins2] = useState<string[]>([]);
  const [performs, setPerforms] = useState<string[]>([]);
  const [performs2, setPerforms2] = useState<string[]>([]);
  const [follows, setFollows] = useState<string[]>([]);
  const [follows2, setFollows2] = useState<string[]>([]);
  const [reviews, setReviews] = useState<string[]>([]);
  const [reviews2, setReviews2] = useState<string[]>([]);
  const [card, setCard] = useState<string[]>([]);
  //field post
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [timeIn, setTimeIn] = useState<string>('');
  const [timeOut, setTimeOut] = useState<string>('');
  const [dateStart, setDateStart] = useState<string>('');
  const [dateEnd, setDateEnd] = useState<string>('');
  const [card2, setCard2] = useState<number[]>([]);
  const [failure, setFailure] = useState<string>('');
  //useEffect
  useEffect(() => {
    try {
      const processId = localStorage.getItem('process_id');
      POST(`projects/chi-tiet-du-an-theo-quy-trinh/${processId}`).then(
        (res) => {
          //process
          setProcess(res?.data.process);
          //admin
          const listIdAdmin = res?.data.process.process_management;
          const listIdAdminArr = listIdAdmin?.split(',');
          const filteredListAdmin = res?.data.listEp.filter((item: any) =>
            listIdAdminArr.includes(item._id.toString())
          );
          const newAdmin = filteredListAdmin?.map((item: any) => ({
            label: item.userName,
            value: item._id,
          }));
          setAdmins(newAdmin || []);
          setAdmins2(newAdmin?.map((admin: any) => admin.value) || []);

          //member
          const listIdMember = res?.data.process.process_member;
          const listIdMemberArr = listIdMember?.split(',');
          const filteredListMember = res?.data.listEp.filter((item: any) =>
            listIdMemberArr.includes(item._id.toString())
          );
          const newMember = filteredListMember?.map((item: any) => ({
            label: item.userName,
            value: item._id,
          }));
          setPerforms(newMember || []);
          setPerforms2(newMember?.map((member: any) => member.value) || []);

          //follow
          const listIdFollow = res?.data.process.process_follow;
          const listIdFollowArr = listIdFollow?.split(',');
          const filteredListFollow = res?.data.listEp.filter((item: any) =>
            listIdFollowArr?.includes(item._id.toString())
          );
          const newFollow = filteredListFollow?.map((item: any) => ({
            label: item.userName,
            value: item._id,
          }));
          setFollows(newFollow || []);
          setFollows2(newFollow?.map((member: any) => member.value) || []);

          //review
          const listIdReview = res?.data.process.process_evaluate;
          const listIdReviewArr = listIdReview?.split(',');
          const filteredListReview = res?.data.listEp.filter((item: any) =>
            listIdReviewArr.includes(item._id.toString())
          );
          const newfollow = filteredListReview?.map((item: any) => ({
            label: item.userName,
            value: item._id,
          }));
          setReviews(newfollow || []);
          setReviews2(newfollow?.map((member: any) => member.value) || []);
          //options
          const newOptions = res?.data.listEp.map((item: any) => ({
            label: item.userName,
            value: item._id,
          }));
          setOptions(newOptions || []);

          //card
          setCard(
            process?.process_card?.includes('1') &&
              process?.process_card?.includes('2')
              ? ['Quan trọng', 'Khẩn cấp']
              : process?.process_card?.includes('1')
              ? ['Quan trọng']
              : process?.process_card?.includes('2')
              ? ['Khẩn cấp']
              : []
          );
        }
      );
    } catch (error) {
      console.log(error);
    }
  }, [process?.process_card]);
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
    setAdmins2(Array.isArray(value) ? value : [value]);
  };
  const handleReviewChange = (checkedValues: CheckboxValueType[]) => {
    setReviews2(checkedValues as any);
  };
  const handleFollowChange = (checkedValues: CheckboxValueType[]) => {
    setFollows2(checkedValues as any);
  };
  const handlePerformChange = (value: string | string[]) => {
    setPerforms2(Array.isArray(value) ? value : [value]);
  };

  const onChange = (checkedValues: CheckboxValueType[]) => {
    const updatedCard: number[] = [];

    if (checkedValues.includes('Quan trọng')) {
      updatedCard.push(1);
    }

    if (checkedValues.includes('Khẩn cấp')) {
      updatedCard.push(2);
    }

    setCard2(updatedCard);
  };

  const handleEditProcess = async () => {
    try {
      const processData: Process = {
        process_id: process?.process_id || '',
        process_name: process?.process_name || name,
        process_description: process?.process_description || description,
        time_in: process?.time_in || timeIn,
        time_out: process?.time_out || timeOut,
        date_start: process?.date_start || dateStart,
        date_end: process?.date_end || dateEnd,
        process_card: card2.join(','),
        process_management: admins2.join(','),
        process_member: performs2.join(','),
        process_failure: process?.process_failure || failure,
        process_follow: follows2.join(','),
        process_evaluate: reviews2.join(','),
      };

      console.log(processData);
      await dispatch(editProcess(processData) as any);

      if (isProcessEdited) {
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
  return (
    <div>
      <p onClick={showModal} style={{ margin: '0' }}>
        <Image
          unoptimized
          width={18}
          height={18}
          src="https://hungha365.com/storageimage/GV/editch.png"
          alt=""
          style={{ marginRight: 10 }}
        />
        Chỉnh sửa quy trình
      </p>
      <Modal
        title="Chỉnh sửa quy trình"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className={styles.title}>
          <p className={styles.name}>
            Tên quy trình <span>*</span>
          </p>
          <input
            type="text"
            placeholder="Tên quy trình"
            defaultValue={process?.process_name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.title}>
          <p className={styles.name}>
            Thêm thẻ quy trình <span>*</span>
          </p>
          <Checkbox.Group
            options={plainOptions}
            defaultValue={card}
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
            defaultValue={admins}
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
            defaultValue={performs}
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
            defaultValue={follows}
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
            defaultValue={reviews}
            onChange={handleReviewChange}
            options={options}
          />
        </div>
        <div className={styles.title}>
          <p className={styles.name}>Mô tả quy trình</p>
          <textarea
            name=""
            id=""
            placeholder="Nhập mô tả quy trình"
            defaultValue={process?.process_description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.title}>
          <p className={styles.name}>
            Lý do thất bại<span>*</span>
          </p>
          <input
            name=""
            id=""
            placeholder="Nhập lý do thất bại"
            defaultValue={process?.process_failure}
            onChange={(e) => setFailure(e.target.value)}
          />
        </div>
        <div className={styles.title}>
          <p className={styles.name}>
            Thời gian bắt đầu <span>*</span>
          </p>
          <div className={styles.time_work}>
            <input
              type="date"
              defaultValue={process?.date_start}
              onChange={(e) => setDateStart(e.target.value)}
            />
            <input
              type="time"
              defaultValue={process?.time_in}
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
              type="date"
              defaultValue={process?.date_end}
              onChange={(e) => setDateEnd(e.target.value)}
            />
            <input
              type="time"
              defaultValue={process?.time_out}
              onChange={(e) => setTimeOut(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.button}>
          <button className={styles.huy} onClick={handleCancel}>
            Hủy
          </button>
          <button className={styles.ok} onClick={handleEditProcess}>
            Sửa quy trình
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default Chinhsuaquytrinh;
