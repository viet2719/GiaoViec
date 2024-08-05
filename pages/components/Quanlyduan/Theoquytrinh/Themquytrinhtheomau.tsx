'use client';
import React, { use, useEffect, useState } from 'react';
import styles from './Theoquytrinh.module.css';

import Image from 'next/image';
import { Select, Modal, Checkbox, message } from 'antd';
import type { SelectProps } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { POST } from '@/pages/api/auth';
import { useDispatch } from 'react-redux';
import { fetchProcesses } from '@/store/actions/processesActions';

const plainOptions = [
  { label: 'Quan trọng', value: 1 },
  { label: 'Khẩn cấp', value: 2 },
];

const onSearch = (value: string) => {
  console.log('search:', value);
};

const Add_duan: React.FC = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [options, setOptions] = useState<SelectProps['options']>([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOption1, setSelectedOption1] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [selectedOption3, setSelectedOption3] = useState(null);
  const [detail, setDetail] = useState<any>();
  const [processName, setProcessName] = useState<any>('');
  const [card, setCard] = useState<any>();
  const [id, setId] = useState<any>();
  const [nvQuyTrinh, setNvQuyTrinh] = useState<any>();
  const [processManager, setProcessManager] = useState<any>();
  const [processMember, setProcessMember] = useState<any>();
  const [processEvaluate, setProcessEvaluate] = useState<any>();
  const [processFollower, setProcessFollower] = useState<any>();

  const onChanges = (checkedValues: CheckboxValueType[]) => {
    console.log('checked = ', checkedValues);
    setCard(checkedValues);
  };
  const onChange = async (value: string) => {
    await POST(`projects/chi-tiet-du-an-theo-quy-trinh/${value}`).then(
      (res) => {
        setDetail(res?.data);
      }
    );
    setId(value);
  };

  const onChangeNv = (value: string) => {
    setNvQuyTrinh(value);
  };
  const handleFirstSelectChange = (value: any) => {
    setSelectedOption(value);
    if (value === 1) {
      setProcessManager(detail?.process?.process_management);
    }
  };
  const handleFirstSelectChange1 = (value: any) => {
    setSelectedOption1(value);
    if (value === 1) {
      setProcessMember(detail?.process?.process_member);
    }
  };
  const handleFirstSelectChange2 = (value: any) => {
    setSelectedOption2(value);
    if (value === 1) {
      setProcessFollower(detail?.process?.process_follow);
    }
  };
  const handleFirstSelectChange3 = (value: any) => {
    setSelectedOption3(value);
    if (value === 1) {
      setProcessEvaluate(detail?.process?.process_evaluate);
    }
  };

  const onChangeUser = (value: any) => {
    setProcessManager(value.join(','));
  };
  const onChangeUser1 = (value: any) => {
    setProcessMember(value.join(','));
  };
  const onChangeUser2 = (value: any) => {
    setProcessFollower(value.join(','));
  };
  const onChangeUser3 = (value: any) => {
    setProcessEvaluate(value.join(','));
  };

  const renderSecondSelect = () => {
    if (selectedOption === 2) {
      return (
        <div>
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Chọn nhân viên"
            optionFilterProp="children"
            onChange={onChangeUser}
            onSearch={onSearch}
            filterOption={(input, option: any) =>
              (option?.label ?? '')?.toLowerCase().includes(input.toLowerCase())
            }
            options={detail?.listEp.map((item: any) => ({
              label: item.userName,
              value: item._id,
            }))}
          />
          <span className="error-message" style={{ color: 'red' }}>
            {nameError}
          </span>
        </div>
      );
    }
    return null; // Render nothing by default
  };
  const renderSecondSelect1 = () => {
    if (selectedOption1 === 2) {
      return (
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="Chọn nhân viên"
          optionFilterProp="children"
          onChange={onChangeUser1}
          onSearch={onSearch}
          filterOption={(input, option: any) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={detail?.listEp.map((item: any) => ({
            label: item.userName,
            value: item._id, // Use 'value' for the selected value
          }))}
        />
      );
    }
    return null; // Render nothing by default
  };
  const renderSecondSelect2 = () => {
    if (selectedOption2 === 2) {
      return (
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="Chọn nhân viên"
          optionFilterProp="children"
          onChange={onChangeUser2}
          onSearch={onSearch}
          filterOption={(input, option: any) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={detail?.listEp.map((item: any) => ({
            label: item.userName,
            value: item._id, // Use 'value' for the selected value
          }))}
        />
      );
    }
    return null; // Render nothing by default
  };
  const renderSecondSelect3 = () => {
    if (selectedOption3 === 2) {
      return (
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="Chọn nhân viên"
          optionFilterProp="children"
          onChange={onChangeUser3}
          onSearch={onSearch}
          filterOption={(input, option: any) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={detail?.listEp.map((item: any) => ({
            label: item.userName,
            value: item._id, // Use 'value' for the selected value
          }))}
        />
      );
    }
    return null; // Render nothing by default
  };

  useEffect(() => {
    try {
      POST('projects/quan-ly-du-an-theo-quy-trinh').then((res) => {
        const newOptions = res?.data.process.map((item: any) => ({
          label: item.process_name,
          value: item.process_id,
        }));
        setOptions(newOptions || []);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const [messageApi, contextHolder] = message.useMessage();
  const [nameError, setNameError] = useState('');
  const [cardError, setCardError] = useState('');
  const [processError, setProcessError] = useState('');
  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Thêm quy trình thành công',
    });
  };

  const validateForm = () => {
    let isValid = true;
    setNameError('');
    if (processName.trim() === '') {
      setNameError('Tên quy trình không được trống*');
      isValid = false;
    }
    if (!card || card.length === 0) {
      setCardError('Chưa chọn thẻ quy trình*');
      isValid = false;
    }
    if (!id || id === '') {
      setProcessError('Tên quy trình theo mẫu không được trống*');
      isValid = false;
    }
    return isValid;
  };
  const handleOk = () => {
    if (validateForm()) {
      POST('projects/quan-ly-du-an-theo-quy-trinh/them-quy-trinh-theo-mau', {
        id: id,
        stage_mission: nvQuyTrinh,
        management: selectedOption,
        member: selectedOption1,
        evaluate: selectedOption2,
        follow: selectedOption3,
        process_name: processName,
        process_card: card.join(','),
        process_management: processManager,
        process_member: processMember,
        process_evaluate: processEvaluate,
        process_follow: processFollower,
      })
        .then((res) => {
          console.log('Thêm mới thành công', res);
          setIsModalOpen(false);
          setId('');
          setNvQuyTrinh('');
          setSelectedOption(null);
          setSelectedOption1(null);
          setSelectedOption2(null);
          setSelectedOption3(null);
          setProcessName('');
          setCard([]);
          setProcessManager('');
          setProcessMember('');
          setProcessEvaluate('');
          setProcessFollower('');
          setNameError('');
          setCardError('');
          setProcessError('');
          dispatch(fetchProcesses() as any);
          success();
        })
        .catch((err) => console.log('Thêm mới thất bại', err));
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setId('');
    setNvQuyTrinh('');
    setSelectedOption(null);
    setSelectedOption1(null);
    setSelectedOption2(null);
    setSelectedOption3(null);
    setProcessName('');
    setCard([]);
    setProcessManager('');
    setProcessMember('');
    setProcessEvaluate('');
    setProcessFollower('');
    setNameError('');
    setCardError('');
    setProcessError('');
  };

  return (
    <div>
      <p onClick={showModal} style={{ margin: '0' }}>
        <Image
          unoptimized
          width={18}
          height={18}
          src="https://hungha365.com/storageimage/GV/img_add_qttm.png"
          alt=""
          style={{ marginRight: 10 }}
        />
        Thêm quy trình theo mẫu
      </p>
      <Modal
        title="Thêm quy trình theo mẫu"
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
            value={processName}
            onChange={(e) => setProcessName(e.target.value)}
          />
          <span className="error-message" style={{ color: 'red' }}>
            {nameError}
          </span>
        </div>
        <div className={styles.title}>
          <p className={styles.name}>
            Thêm thẻ quy trình <span>*</span>
          </p>
          <Checkbox.Group
            options={plainOptions}
            value={card}
            onChange={onChanges}
          />
          <span className="error-message" style={{ color: 'red' }}>
            {cardError}
          </span>
        </div>
        <div className={styles.title}>
          <p className={styles.name}>
            Theo mẫu quy trình <span>*</span>
          </p>
          <Select
            showSearch
            style={{ width: '100%' }}
            placeholder="Chọn quy trình"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            value={id}
            filterOption={(input, option) => {
              if (option && option.label) {
                const label = option.label.toString();
                return label.toLowerCase().includes(input.toLowerCase());
              }
              return false;
            }}
            options={options}
          />
          <span className="error-message" style={{ color: 'red' }}>
            {processError}
          </span>
        </div>
        <div className={styles.title}>
          <p className={styles.name}>
            Nhiệm vụ/Giai đoạn <span>*</span>
          </p>
          <Select
            showSearch
            style={{ width: '100%' }}
            placeholder="Chọn quy trình"
            optionFilterProp="children"
            onChange={onChangeNv}
            onSearch={onSearch}
            value={nvQuyTrinh}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: '2',
                label: 'Giữ lại tất cả nhiệm vụ và giai đoạn',
              },
              {
                value: '1',
                label: 'Giữ lại giai đoạn',
              },
              {
                value: '0',
                label: 'Không giữ lại nhiệm vụ và giai đoạn',
              },
            ]}
          />
        </div>
        <div className={styles.title}>
          <p className={styles.name}>
            Thành viên chủ trì<span>*</span>{' '}
          </p>
          <Select
            showSearch
            style={{ width: '100%' }}
            placeholder="Chọn thành viên chủ trì"
            optionFilterProp="children"
            onChange={handleFirstSelectChange}
            onSearch={onSearch}
            value={selectedOption}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: 1,
                label: 'Giữ nguyên thông tin thành viên chủ trì',
              },
              {
                value: 2,
                label: 'Không giữ lại thông tin thành viên chủ trì',
              },
            ]}
          />
          {renderSecondSelect()}
        </div>
        <div className={styles.title}>
          <p className={styles.name}>
            Thành viên thực hiện<span>*</span>{' '}
          </p>
          <Select
            showSearch
            style={{ width: '100%' }}
            placeholder="Chọn thành viên thực hiện"
            optionFilterProp="children"
            onChange={handleFirstSelectChange1}
            onSearch={onSearch}
            value={selectedOption1}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: 1,
                label: 'Giữ nguyên thông tin thành viên thực hiện',
              },
              {
                value: 2,
                label: 'Không giữ lại thông tin thành viên thực hiện',
              },
            ]}
          />
          {renderSecondSelect1()}
        </div>
        <div className={styles.title}>
          <p className={styles.name}>
            Thành viên theo dõi <span>*</span>
          </p>
          <Select
            showSearch
            style={{ width: '100%' }}
            placeholder="Chọn thành viên theo dõi"
            optionFilterProp="children"
            onChange={handleFirstSelectChange2}
            onSearch={onSearch}
            value={selectedOption2}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: 1,
                label: 'Giữ lại thông tin thành viên theo dõi công việc',
              },
              {
                value: 2,
                label: 'Không giữ lại thông tin thành viên theo dõi công việc',
              },
            ]}
          />
          {renderSecondSelect2()}
        </div>
        <div className={styles.title}>
          <p className={styles.name}>
            Thành viên đánh giá công việc<span>*</span>{' '}
          </p>
          <Select
            showSearch
            style={{ width: '100%' }}
            placeholder="Chọn thành viên đánh giá"
            optionFilterProp="children"
            onChange={handleFirstSelectChange3}
            onSearch={onSearch}
            value={selectedOption3}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: 1,
                label: 'Giữ lại thông tin thành viên đánh giá công việc',
              },
              {
                value: 2,
                label: 'Không giữ lại thông tin thành viên đánh giá công việc',
              },
            ]}
          />
          {renderSecondSelect3()}
        </div>

        <div className={styles.button}>
          <button className={styles.huy} onClick={handleCancel}>
            Hủy
          </button>
          {contextHolder}
          <button className={styles.ok} onClick={handleOk}>
            Thêm quy trình
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default Add_duan;
