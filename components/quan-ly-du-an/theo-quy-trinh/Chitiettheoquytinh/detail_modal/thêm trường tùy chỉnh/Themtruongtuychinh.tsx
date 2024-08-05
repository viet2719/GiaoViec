'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './truong.module.css';
import { Select, Modal, Checkbox, Input } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import SelectCustomize from '@/components/select/select';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';
import { addOption, fetchOptions, Option } from '@/store/actions/optionsAction';

const Themtruongtuychinh: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idStage, setIdStage] = useState<string>('');
  //lấy dữ liệu từ redux
  const dispatch = useDispatch();
  const stages = useSelector((state: RootState) => state.stages.stages);
  const [optionStage, setOptionStage] = useState([]);
  useEffect(() => {
    const processId = localStorage.getItem('process_id');
    dispatch(fetchOptions(processId as any) as any);
    const newOptions = stages?.map((item: any) => ({
      id: item.id,
      name: item.name,
    }));
    setOptionStage(newOptions as any);
  }, [dispatch, stages]);

  //field post
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [type, setType] = useState<string[]>([]);
  const [isRequired, setIsRequired] = useState(false);
  const onChange = (value: string | string[]) => {
    setType(Array.isArray(value) ? value : [value]);
  };
  const onSearch = (value: string) => {
    console.log('search:', value);
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
  console.log(stages);
  const handleAddOption = () => {
    const optionData: Option = {
      id: '',
      type_option: type.join(','),
      name_option: name,
      with_stage: idStage,
      des_option: description,
      is_required: isRequired ? '0' : '1',
    };
    const processId = localStorage.getItem('process_id');
    dispatch(addOption(processId as any, optionData) as any);
    setIsModalOpen(false);
  };
  return (
    <div>
      <p
        onClick={showModal}
        style={{ margin: '0', cursor: 'pointer', color: '#4c5bd4' }}
      >
        <Image
          unoptimized
          width={18}
          height={18}
          src="https://hungha365.com/storageimage/GV/tr_tuychinh.png"
          alt=""
          style={{ marginRight: 10 }}
        />
        Thêm trường tùy chỉnh
      </p>
      <Modal
        title="Thêm trường tùy chỉnh"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className={styles.title}>
          <p className={styles.name}>
            Loại dữ liệu <span>*</span>
          </p>
          <Select
            showSearch
            placeholder="Chọn kiểu dữ liệu"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: 1,
                label: 'Kiểu số',
              },
              {
                value: 2,
                label: 'Kiểu ký tự',
              },
              {
                value: 3,
                label: 'Ngày',
              },
              {
                value: 4,
                label: 'Ngày giờ',
              },
              {
                value: 5,
                label: 'Đổ xuống một câu trả lời',
              },
              {
                value: 6,
                label: 'Đổ xuống nhiều câu trả lời',
              },
            ]}
          />
        </div>
        <div className={styles.title}>
          <p className={styles.name}>
            Nhập tên trường dữ liệu<span>*</span>{' '}
          </p>
          <Input
            placeholder="Nhập tên trường dữ liệu"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.title}>
          <p className={styles.name}>Mô tả trường dữ liệu</p>
          <textarea
            name=""
            id=""
            placeholder="Nhập mô tả tên trường dữ liệu"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.title} style={{ display: 'flex' }}>
          <p className={styles.name}>Trường bắt buộc *</p>
          <input
            style={{ marginLeft: '20px', marginTop: '-3px', width: '15px' }}
            type="checkbox"
            checked={isRequired}
            onChange={(e) => setIsRequired(e.target.checked)}
          />
        </div>

        <div className={styles.title}>
          <p className={styles.name}>
            Liên kết với giai đoạn <span>*</span>
          </p>
          <div className={styles.select_frame}>
            <SelectCustomize
              data={stages}
              onIdChange={(id: any) => setIdStage(id)}
              placeholder={'Trường dữ liệu khi nhập mới'}
            />
          </div>
        </div>

        <div className={styles.button}>
          <button className={styles.huy} onClick={handleCancel}>
            Hủy
          </button>
          <button className={styles.ok} onClick={handleAddOption}>
            Áp dụng
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default Themtruongtuychinh;
