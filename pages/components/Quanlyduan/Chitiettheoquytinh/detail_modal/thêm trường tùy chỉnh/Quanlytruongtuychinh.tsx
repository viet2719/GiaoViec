'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Modal } from 'antd';

import Themtruongtuychinh from './Themtruongtuychinh';

import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Suatruongtuychinh from './Suatruongtuychinh';
import Xoa from './Xoa';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';
import { Option, fetchOptions } from '@/store/actions/optionsAction';
const Themnhiemvu: React.FC = () => {
  const columns: ColumnsType<Option> = [
    {
      title: '',
      dataIndex: 'name_option',
      key: 'name_option',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '',
      dataIndex: 'type_option',
      key: 'type_option',
      render: (text) => {
        switch (text) {
          case 1:
            return <span>Kiểu số</span>; // Hiển thị kiểu số
          case 2:
            return <span>Kiểu ký tự</span>; // Hiển thị kiểu kí tự
          case 3:
            return <span>Ngày</span>; // Hiển thị kiểu ngày
          case 4:
            return <span>Ngày giờ</span>; // Hiển thị kiểu ngày giờ
          case 5:
            return <span>Đổ xuống một câu trả lời</span>; // Hiển thị đổ xuống một câu trả lời
          case 6:
            return <span>Đổ xuống nhiều câu trả lời</span>; // Hiển thị đổ xuống nhiều câu trả lời
          default:
            return null; // Trả về null nếu không có trường hợp khớp
        }
      },
    },
    {
      title: '',
      dataIndex: 'with_stage',
      key: 'with_stage',
    },

    {
      title: '',
      key: 'action',
      render: (option) => (
        <Space size="middle">
          <Suatruongtuychinh option={option} />
          <span>/</span>
          <Xoa option={option} />
        </Space>
      ),
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const options = useSelector((state: RootState) => state.options.options);
  useEffect(() => {
    const processId = localStorage.getItem('process_id');
    dispatch(fetchOptions(processId as any) as any);
  }, [dispatch]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <p onClick={showModal} style={{ margin: '0' }}>
        <Image
          unoptimized
          width={18}
          height={18}
          src="https://hungha365.com/storageimage/GV/quanli.png"
          alt=""
          style={{ marginRight: 10 }}
        />
        Quản lý trường tùy chỉnh
      </p>
      <Modal
        title="Quản lý trường tùy chỉnh"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Table
          columns={columns}
          dataSource={options}
          style={{ borderBottom: '1px dashed #474747' }}
        />
        <Themtruongtuychinh />
      </Modal>
    </div>
  );
};
export default Themnhiemvu;
