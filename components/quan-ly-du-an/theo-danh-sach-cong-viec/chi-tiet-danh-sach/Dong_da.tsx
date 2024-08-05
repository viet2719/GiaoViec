'use client';
import React, { useState } from 'react';
import styles from './Add_duan.module.css';
import Image from 'next/image';
import { Select, Modal } from 'antd';
import { POST } from '@/pages/api/auth';

const Dong_da = ({
  item,
  reload,
  setReload,
}: {
  item: any;
  reload: any;
  setReload: any;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, setState] = useState(1);
  let OpenorClone;
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    POST(
      `projects/chi-tiet-du-an-theo-danh-sach-cong-viec/${item.project_id}/switch`,
      { type: state }
    ).then((res) => {
      if (res?.data?.project?.open_or_close == 0) {
        alert('Đóng dự án thành công');
      }
      if (res?.data?.project?.open_or_close == 1) {
        alert('Mở dự án thành công');
      }
      setReload(!reload);
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOpenOrClose = (value: any) => {
    setState(value);
  };
  return (
    <div>
      <p onClick={showModal} style={{ margin: '0' }}>
        <Image
          unoptimized
          width={18}
          height={18}
          src="https://hungha365.com/storageimage/GV/khoa_dsda.png"
          alt=""
          style={{ marginRight: 10 }}
        />
        Đóng dự án
      </p>
      <Modal
        title="Đóng dự án"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className={styles.title} style={{ display: 'flex' }}>
          <p className={styles.name}>
            Tên dự án <span>*</span>
          </p>
          <input
            defaultValue={item?.project_name}
            type="text"
            placeholder="Tên dự án"
            disabled
            style={{ width: '100%' }}
          />
        </div>

        <div className={styles.title} style={{ display: 'flex' }}>
          <p className={styles.name} style={{ paddingRight: '10px' }}>
            Trạng thái{' '}
          </p>
          <Select
            showSearch
            style={{ width: '100%' }}
            placeholder="Chọn trạng thái"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? '').includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? '')
                .toLowerCase()
                .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            defaultValue={1}
            onChange={(values) => handleOpenOrClose(values)}
            options={[
              {
                value: 2,
                label: 'Dự án thất bại ',
              },
              {
                value: 1,
                label: 'Dự án thành công',
              },
            ]}
          />
        </div>

        <div className={styles.button}>
          <button className={styles.huy} onClick={handleCancel}>
            Hủy
          </button>
          <button className={styles.ok} onClick={handleOk}>
            Đóng
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default Dong_da;
