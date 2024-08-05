import React, { useEffect, useState } from 'react';
import { Input, Modal, Select, SelectProps } from 'antd';
import Image from 'next/image';
import styles from './nhiemvu.module.scss';

import SelectCustomize from '@/components/select/select';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';
import { POST } from '@/pages/api/auth';
const onChange = (value: string) => {
  console.log(`selected ${value}`);
  console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
  console.log('search:', value);
  console.log('search:', value);
};
const options: SelectProps['options'] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}
const handleChange = (value: string | string[]) => {
  console.log(`Selected: ${value}`);
  console.log(`Selected: ${value}`);
};
const Xoa: React.FC = () => {
  const stages = useSelector((state: RootState) => state.stages.stages);
  const [id, setId] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [list, setList] = useState([]);
  const [listEmp, setListEmp] = useState([]);
  useEffect(() => {
    try {
      const processId = localStorage.getItem('process_id');
      POST(`projects/chi-tiet-du-an-theo-quy-trinh/${processId}`).then(
        (res) => {
          //member
          const listIdMember = res?.data.processStage[0]?.stage_member;
          const listIdMemberArr = listIdMember?.split(',');
          setListEmp(res?.data.listEp);
          const filteredListMember = res?.data.listEp.filter((item: any) =>
            listIdMemberArr?.includes(item._id.toString())
          );
          const newOptionsMember = filteredListMember?.map((item: any) => ({
            _id: item._id,
            userName: item.userName,
          }));
          setList(newOptionsMember || []);
          console.log(listEmp);
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
    alert('Cập nhật người giao việc thành công');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { Search } = Input;

  return (
    <>
      <p
        onClick={showModal}
        className={styles._edit}
        style={{
          color: 'blue',
          cursor: 'pointer',
          marginBottom: '0rem',
        }}
      >
        Chỉnh sửa
      </p>
      <Modal
        title="Chỉnh sửa người giao việc"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className={styles.select_frame}>
          <SelectCustomize
            data={list}
            onIdChange={(id: any) => setId(id)}
            placeholder={'Tìm kiếm'}
          />
        </div>

        <label htmlFor="">Gợi ý</label>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '1px solid black',
          }}
        >
          {listEmp?.map((item: { userName: string }, index) => (
            <div
              key={index}
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Image width={24} height={24} alt="" src="/Group 626671.png" />
              <p>{item?.userName}</p>
              <input
                style={{ width: '18px', height: '18px' }}
                type="checkbox"
              />
            </div>
          ))}
        </div>
        <div
          className={styles.button}
          style={{ textAlign: 'center', marginTop: '20px' }}
        >
          <button className={styles.ok} onClick={handleOk}>
            Thêm
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Xoa;
