import React, { useState, useEffect } from 'react';
import { Checkbox, Modal, Table } from 'antd';
import styles from './edm.module.scss';
import Image from 'next/image';
import { POST } from '@/pages/api/auth';

const Phanquyen: React.FC<any> = ({
  setReload,
  meetingRole,
}: {
  setReload: Function;
  meetingRole: any[];
}) => {
  const [listCheckManager, setListCheckManager] = useState<number[]>([]);
  const [listCheckStaff, setListCheckStaff] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    POST('meetings/chi-tiet-cuoc-hop/role', {
      checked_management: listCheckManager?.join(','),
      checked_ep: listCheckStaff?.join(','),
    }).then((res) => {
      if (res) {
        setIsModalOpen(false);
        setReload(true);
      }
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const dataSource = [
    {
      key: '1',
      name: 'Xem biên bản cuộc họp',
      check1: (
        <Checkbox
          value={listCheckManager?.includes(1)}
          checked={listCheckManager?.includes(1)}
          onChange={(e) => {
            if (e.target.checked) {
              setListCheckManager([...listCheckManager, 1]);
            } else {
              setListCheckManager(
                listCheckManager?.filter((number: number) => number !== 1)
              );
            }
          }}
        />
      ),
      check2: (
        <Checkbox
          value={listCheckStaff?.includes(1)}
          checked={listCheckStaff?.includes(1)}
          onChange={(e) => {
            if (e.target.checked) {
              setListCheckStaff([...listCheckStaff, 1]);
            } else {
              setListCheckStaff(
                listCheckStaff?.filter((number: number) => number !== 1)
              );
            }
          }}
        />
      ),
    },
    {
      key: '2',
      name: 'Tải lên biên bản cuộc họp',
      check1: (
        <Checkbox
          value={listCheckManager?.includes(2)}
          checked={listCheckManager?.includes(2)}
          onChange={(e) => {
            if (e.target.checked) {
              setListCheckManager([...listCheckManager, 2]);
            } else {
              setListCheckManager(
                listCheckManager?.filter((number: number) => number !== 2)
              );
            }
          }}
        />
      ),
      check2: (
        <Checkbox
          value={listCheckStaff?.includes(2)}
          checked={listCheckStaff?.includes(2)}
          onChange={(e) => {
            if (e.target.checked) {
              setListCheckStaff([...listCheckStaff, 2]);
            } else {
              setListCheckStaff(
                listCheckStaff?.filter((number: number) => number !== 2)
              );
            }
          }}
        />
      ),
    },
    {
      key: '3',
      name: 'Cài đặt email thông báo',
      check1: (
        <Checkbox
          value={listCheckManager?.includes(3)}
          checked={listCheckManager?.includes(3)}
          onChange={(e) => {
            if (e.target.checked) {
              setListCheckManager([...listCheckManager, 3]);
            } else {
              setListCheckManager(
                listCheckManager?.filter((number: number) => number !== 3)
              );
            }
          }}
        />
      ),
      check2: (
        <Checkbox
          value={listCheckStaff?.includes(3)}
          checked={listCheckStaff?.includes(3)}
          onChange={(e) => {
            if (e.target.checked) {
              setListCheckStaff([...listCheckStaff, 3]);
            } else {
              setListCheckStaff(
                listCheckStaff?.filter((number: number) => number !== 3)
              );
            }
          }}
        />
      ),
    },
    {
      key: '4',
      name: 'Hủy cuộc họp',
      check1: (
        <Checkbox
          value={listCheckManager?.includes(4)}
          checked={listCheckManager?.includes(4)}
          onChange={(e) => {
            if (e.target.checked) {
              setListCheckManager([...listCheckManager, 4]);
            } else {
              setListCheckManager(
                listCheckManager?.filter((number: number) => number !== 4)
              );
            }
          }}
        />
      ),
      check2: (
        <Checkbox
          value={listCheckStaff?.includes(4)}
          checked={listCheckStaff?.includes(4)}
          onChange={(e) => {
            if (e.target.checked) {
              setListCheckStaff([...listCheckStaff, 4]);
            } else {
              setListCheckStaff(
                listCheckStaff?.filter((number: number) => number !== 4)
              );
            }
          }}
        />
      ),
    },
  ];
  const columns = [
    {
      title: ' ',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Thành viên quản lý',
      dataIndex: 'check1',
      key: 'check1',
    },
    {
      title: 'Thành viên',
      dataIndex: 'check2',
      key: 'check2',
    },
  ];
  useEffect(() => {
    meetingRole?.forEach((item: any) => {
      if (item?.role_id === 1) {
        setListCheckManager(
          item?.permission_meet_id
            ?.split(',')
            ?.map((number: number) => Number(number))
        );
      } else {
        setListCheckStaff(
          item?.permission_meet_id
            ?.split(',')
            ?.map((number: number) => Number(number))
        );
      }
    });
  }, [meetingRole]);
  useEffect(() => {
    listCheckManager?.sort((a, b) => a - b);
    listCheckStaff?.sort((a, b) => a - b);
  }, [listCheckManager, listCheckStaff]);

  return (
    <div>
      <p className="cv_dot" onClick={showModal} style={{ margin: '0' }}>
        <Image
          unoptimized
          width={18}
          height={16}
          alt="met"
          src="https://hungha365.com/storageimage/GV/dtbt_met.png"
          style={{ marginRight: '10px' }}
        />
        Quản lý phân quyền cuộc họp
      </p>

      <Modal
        title="Chỉnh sửa phân quyền cuộc họp"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Table
          columns={columns}
          dataSource={dataSource}
          scroll={{ x: 'max-content' }}
        />
        <div className={styles.button}>
          <button className={styles.ok} onClick={handleOk}>
            Cập nhật
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Phanquyen;
