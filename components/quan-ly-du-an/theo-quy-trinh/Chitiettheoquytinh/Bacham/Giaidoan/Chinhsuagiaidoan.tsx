'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './Giaidoan.module.css';
import { Select, Modal, Checkbox, Input } from 'antd';
import type { SelectProps } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { Stage, editStage } from '@/store/actions/stagesActions';
import { POST } from '@/pages/api/auth';
import { useDispatch } from 'react-redux';

export default function Themquytrinh(props: { stage: Stage }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const [admins, setAdmins] = useState<string[]>([]);
  const [admins2, setAdmins2] = useState<string[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [time, setTime] = useState<string>(props.stage.completion_time || '');
  const [statusTime, setStatusTime] = useState<any[]>([]);
  const [performs, setPerforms] = useState<string[]>([]);
  const [performs2, setPerforms2] = useState<string[]>([]);
  const [name, setName] = useState<string>(props.stage.name || '');
  const [optionsAdmin, setOptionsAdmin] = useState<SelectProps['options']>([]);
  const [optionsMember, setOptionsMember] = useState<SelectProps['options']>(
    []
  );
  const [conditions, setConditions] = useState<SelectProps['options']>([
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
  ]);
  const [statusTimeOption, setStatusTimeOption] = useState<
    SelectProps['options']
  >([
    {
      value: 1,
      label: 'Thời hạn không thể điều chỉnh',
    },
    {
      value: 2,
      label: 'Thời hạn điều chỉnh trong từng gia đoạn',
    },
  ]);
  useEffect(() => {
    try {
      const processId = localStorage.getItem('process_id');
      POST(`projects/chi-tiet-du-an-theo-quy-trinh/${processId}`).then(
        (res) => {
          //admin
          const listIdAdmin = props.stage.stage_management;
          const listIdAdminArr = listIdAdmin?.split(',');
          const filteredListAdmin = res?.data.listEp.filter((item: any) =>
            listIdAdminArr?.includes(item._id.toString())
          );
          const newAdmin = filteredListAdmin?.map((item: any) => ({
            label: item.userName,
            value: item._id,
          }));
          setAdmins(newAdmin || []);
          setAdmins2(newAdmin?.map((admin: any) => admin.value) || []);

          //option admin
          const listIdAdmin2 = res?.data.process.process_management;
          const listIdAdminArr2 = listIdAdmin2?.split(',');
          const filteredListAdmin2 = res?.data.listEp.filter((item: any) =>
            listIdAdminArr2.includes(item._id.toString())
          );
          const newOptionsAdmin = filteredListAdmin2?.map((item: any) => ({
            label: item.userName,
            value: item._id,
          }));
          setOptionsAdmin(newOptionsAdmin || []);

          //member
          const listIdMember = props.stage.stage_member;
          const listIdMemberArr = listIdMember?.split(',');
          const filteredListMember = res?.data.listEp.filter((item: any) =>
            listIdMemberArr?.includes(item._id.toString())
          );
          const newMember = filteredListMember?.map((item: any) => ({
            label: item.userName,
            value: item._id,
          }));
          setPerforms(newMember || []);
          setPerforms2(newMember?.map((member: any) => member.value) || []);

          //option member
          const listIdMember2 = res?.data.process.process_member;
          const listIdMemberArr2 = listIdMember2?.split(',');
          const filteredListMember2 = res?.data.listEp.filter((item: any) =>
            listIdMemberArr2.includes(item._id.toString())
          );
          const newOptionsMember = filteredListMember2.map((item: any) => ({
            label: item.userName,
            value: item._id,
          }));
          setOptionsMember(newOptionsMember || []);

          //evaluate
          const selectedCondition = conditions?.find(
            (option) => option.value === props.stage.stage_evaluate
          );
          if (selectedCondition) {
            setReviews([selectedCondition]);
          } else {
            setReviews([]);
          }

          //status completion
          const selectedstatusTime = statusTimeOption?.find(
            (option) => option.value === props.stage.status_completion_time
          );
          if (selectedstatusTime) {
            setStatusTime([selectedstatusTime]);
          } else {
            setStatusTime([]);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    setAdmins2(Array.isArray(value) ? value : [value]);
  };
  const handleReviewChange = (checkedValues: CheckboxValueType[]) => {
    setReviews(checkedValues as any);
  };
  const handlePerformChange = (value: string | string[]) => {
    setPerforms2(Array.isArray(value) ? value : [value]);
  };

  const handleUpdateStage = () => {
    const processId = localStorage.getItem('process_id');
    const stageData: Stage = {
      id: props.stage.id,
      name: name,
      stage_management: admins2.join(','),
      stage_member: performs2.join(','),
      stage_evaluate: reviews[0]?.value?.toString(),
      completion_time: time,
      status_completion_time: statusTime[0].value,
      stageMission: [],
    };

    dispatch(editStage(processId as any, stageData) as any);
    setIsModalOpen(false);
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
        Chỉnh sửa giai đoạn
      </p>
      <Modal
        title="Chỉnh sửa giai đoạn"
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
            defaultValue={props.stage.name}
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
            defaultValue={admins}
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
            defaultValue={performs}
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
            onChange={onChange}
            defaultValue={reviews}
            filterOption={(input, option) =>
              (option?.label?.toString() ?? '')
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            options={conditions}
          />
        </div>
        <div className={styles.title}>
          <p className={styles.name}>
            Thời gian hoàn thành dự kiến<span>*</span>{' '}
          </p>
          <Input
            suffix="giờ"
            placeholder="Nhập số giờ dự kiến hoàn thành công việc"
            defaultValue={props.stage.completion_time}
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
            onChange={handleReviewChange}
            filterOption={(input, option) =>
              (option?.label?.toString() ?? '')
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            defaultValue={statusTime}
            options={statusTimeOption}
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
          <button className={styles.ok} onClick={handleUpdateStage}>
            Cập nhật
          </button>
        </div>
      </Modal>
    </div>
  );
}
