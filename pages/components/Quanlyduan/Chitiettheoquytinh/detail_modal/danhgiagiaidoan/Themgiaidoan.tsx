'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Danhgiagiaidoan.module.css';
import { Select, Modal, Checkbox, Input } from 'antd';
import type { SelectProps } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { POST } from '@/pages/api/auth';
import { useDispatch } from 'react-redux';
import { Stage, addStage, fetchStages } from '@/store/actions/stagesActions';

const onSearch = (value: string) => {
  console.log('search:', value);
};

const Themquytrinh: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [optionsAdmin, setOptionsAdmin] = useState<SelectProps['options']>([]);
  const [optionsMember, setOptionsMember] = useState<SelectProps['options']>(
    []
  );
  const dispatch = useDispatch();

  //field post
  const [name, setName] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [statusTime, setStatusTime] = useState<string>('');
  //array member
  const [admins, setAdmins] = useState<string[]>([]);
  const [reviews, setReviews] = useState<string[]>([]);
  const [performs, setPerforms] = useState<string[]>([]);
  //useEffect
  useEffect(() => {
    try {
      const processId = localStorage.getItem('process_id');
      POST(`projects/chi-tiet-du-an-theo-quy-trinh/${processId}`).then(
        (res) => {
          //admin
          const listIdAdmin = res?.data.process.process_management;
          const listIdAdminArr = listIdAdmin?.split(',');
          const filteredListAdmin = res?.data.listEp.filter((item: any) =>
            listIdAdminArr.includes(item._id.toString())
          );
          const newOptionsAdmin = filteredListAdmin?.map((item: any) => ({
            label: item.userName,
            value: item._id,
          }));
          setOptionsAdmin(newOptionsAdmin || []);

          //member
          const listIdMember = res?.data.process.process_member;
          const listIdMemberArr = listIdMember?.split(',');
          const filteredListMember = res?.data.listEp.filter((item: any) =>
            listIdMemberArr.includes(item._id.toString())
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

  //handle
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChange = (checkedValues: CheckboxValueType[]) => {
    setStatusTime(checkedValues as any);
  };

  const handleAdminChange = (value: string | string[]) => {
    setAdmins(Array.isArray(value) ? value : [value]);
  };
  const handleReviewChange = (value: string | string[]) => {
    setReviews(Array.isArray(value) ? value : [value]);
  };
  const handlePerformChange = (value: string | string[]) => {
    setPerforms(Array.isArray(value) ? value : [value]);
  };

  const handleAddStage = () => {
    const processId = localStorage.getItem('process_id');
    const stageData: Stage = {
      id: '',
      name: name,
      stage_management: admins.join(','),
      stage_member: performs.join(','),
      stage_evaluate: reviews.join(','),
      completion_time: time,
      status_completion_time: statusTime,
      stageMission: [],
    };
    dispatch(addStage(processId as any, stageData) as any);
    setIsModalOpen(false);
  };
  return (
    <div>
      <p onClick={showModal} style={{ margin: '0' }}>
        <Image
          unoptimized
          width={18}
          height={18}
          src="https://hungha365.com/storageimage/GV/anh100.png"
          alt=""
          style={{ marginRight: 10 }}
        />
        Thêm giai đoạn
      </p>
      <Modal
        title="Thêm giai đoạn"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className={styles.title}>
          <p className={styles.name}>
            Tên giai đoạn <span>*</span>
          </p>
          <input
            type="text"
            placeholder="Tên giai đoạn"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.title}>
          <p className={styles.name}>
            Thêm thành viên quản trị giai đoạn <span>*</span>
          </p>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Chọn thành viên quản trị"
            defaultValue={[]}
            onChange={handleAdminChange}
            options={optionsAdmin}
          />
        </div>
        <div className={styles.title}>
          <p className={styles.name}>
            Thêm thành viên thực hiện giai đoạn<span>*</span>
          </p>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Chọn thành viên thực hiện"
            defaultValue={[]}
            onChange={handlePerformChange}
            options={optionsMember}
          />
        </div>
        <div className={styles.title}>
          <p className={styles.name}>
            Người nhận nhiệm vụ sau khi chuyển giai đoạn<span>*</span>{' '}
          </p>
          <Select
            showSearch
            placeholder="Lựa chọn người nhận công việc sau khi chuyển giai đoạn"
            optionFilterProp="children"
            onChange={handleReviewChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: 1,
                label: 'Người nhận nhiệm vụ ở giai đoạn trước',
              },
              {
                value: 2,
                label: 'Người nhận nhiệm vụ đầu tiên',
              },
              {
                value: 3,
                label: 'Giao lại ngẫu nhiên',
              },
              {
                value: 4,
                label: 'Giao lại cho người ít nhiệm vụ nhất',
              },
              {
                value: 5,
                label: 'Để người nhận nhiệm vụ giai đoạn hiện tại quyết định',
              },
            ]}
          />
        </div>
        <div className={styles.title}>
          <p className={styles.name}>
            Thời gian hoàn thành dự kiến<span>*</span>{' '}
          </p>
          <Input
            suffix="giờ"
            placeholder="Nhập số giờ dự kiến hoàn thành công việc"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div className={styles.title}>
          <p className={styles.name}>
            Điều chỉnh thời hạn hoàn thành công việc{' '}
          </p>
          <Select
            showSearch
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: 1,
                label: 'Thời hạn không thể điều chỉnh',
              },
              {
                value: 2,
                label: 'Thời hạn điều chỉnh trong từng gia đoạn',
              },
            ]}
          />
        </div>
        <div className={styles.title}>
          <p className={styles.name}>
            Vị trí đặt giai đoạn<span>*</span>
          </p>
          <input
            name=""
            id=""
            placeholder="Trước giai đoạn hoàn thành"
            disabled
          />
        </div>

        <div className={styles.button}>
          <button className={styles.huy} onClick={handleCancel}>
            Hủy
          </button>
          <button className={styles.ok} onClick={handleAddStage}>
            Thêm giai đoạn
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default Themquytrinh;
