import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Checkbox, Input, Popconfirm, Table, Modal } from 'antd';
import styles from './index.module.css';
import { CaretDownOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { POST } from '@/pages/api/auth';
import { format } from 'date-fns';

interface Item {
  key: string;
  name: string;
  dateB: string;
  img: string;
  hourB: string;
  thoiluong: string;
  diadiem: string;
}

const App = ({
  data,
  reload,
  setReLoad,
}: {
  data: any;
  reload: any;
  setReLoad: any;
}) => {
  const [count, setCount] = useState(2);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteRecordKey, setDeleteRecordKey] = useState<string | null>(null);

  const handleExpand = (expanded: boolean, record: any) => {
    setExpandedRowKeys(expanded ? [record.id] : []);
  };

  const handleSelectAll = (e: any) => {
    const { checked } = e.target;
    const allRowKeys = data?.meeting?.map((item: any) => item.id);
    if (checked) {
      setSelectedRowKeys(allRowKeys);
    } else {
      setSelectedRowKeys([]);
    }
  };

  const selectAllCheckbox = (
    <Checkbox
      checked={selectedRowKeys.length === data?.meeting?.length}
      onChange={handleSelectAll}
    />
  );

  const onSelectChange = (selectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(selectedRowKeys);
  };
  const handleSelectRow = (recordKey: React.Key) => {
    const newSelectedRowKeys = selectedRowKeys.includes(recordKey)
      ? selectedRowKeys.filter((key) => key !== recordKey)
      : [...selectedRowKeys, recordKey];
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const [showRestoreConfirm, setShowRestoreConfirm] = useState(false);

  const handleRestore = () => {
    if (selectedRowKeys.length > 0) {
      setShowRestoreConfirm(true);
    }
  };

  const handleConfirmRestore = () => {
    POST('deleted-data/quan-ly-cuoc-hop-da-xoa-gan-day/restore?', {
      list_check: '[' + selectedRowKeys?.join(',') + ']',
    }).then((response) => {
      setReLoad(!reload);
      setShowRestoreConfirm(false);
    });
  };

  const handleCancelRestore = () => {
    setShowRestoreConfirm(false);
  };

  const expandable = {
    expandedRowKeys,
    onExpand: (expanded: boolean, record: any) =>
      handleExpand(expanded, record),
    expandIcon: ({ expanded, onExpand, record }: any) => (
      <div style={{ display: 'flex', color: 'blue' }}>
        <p style={{ margin: '10px' }}>
          {format(new Date(record?.deleted_at * 1000), 'dd-MM-yyyy')}
        </p>

        <CaretDownOutlined
          onClick={() => onExpand(record, !expanded)}
          style={{ marginLeft: 8, marginTop: 12, cursor: 'pointer' }}
        />
      </div>
    ),
    expandedRowRender: (record: any) => (
      <div
        onClick={() => handleSelectRow(record.id)}
        style={{ display: 'flex' }}
      >
        <p>
          {' '}
          <Image
            unoptimized
            width={100}
            height={25}
            alt=""
            src={'/anh134.png'}
            style={{ paddingLeft: '70px' }}
          />
        </p>
        <p style={{ fontWeight: '500', paddingLeft: '60px' }}>
          {record.name_meeting}
        </p>
        <p style={{ fontWeight: '500', paddingLeft: '30px' }}>
          {record.content}
        </p>
        <p style={{ paddingLeft: '30px' }}>
          {record?.time_start} {record?.date_start}
        </p>
      </div>
    ),
  };

  const handleDelete = () => {
    if (selectedRowKeys.length > 0) {
      setShowDeleteConfirm(true);
    }
  };

  const handleConfirmDelete = () => {
    POST('deleted-data/quan-ly-cuoc-hop-da-xoa-gan-day/force-delete', {
      list_check: '[' + selectedRowKeys?.join(',') + ']',
    }).then((res) => {
      setReLoad(!reload);
      setSelectedRowKeys([]);
      setShowDeleteConfirm(false);
    });
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };
  return (
    <div>
      {selectedRowKeys.length > 0 && (
        <div>
          <Button
            type="primary"
            onClick={handleRestore}
            className={styles.buttun}
          >
            Khôi phục
          </Button>

          <Button type="primary" danger ghost onClick={handleDelete}>
            Xóa
          </Button>
        </div>
      )}
      <Modal
        title="Xác nhận xóa"
        open={showDeleteConfirm}
        style={{ width: '460px' }}
        onCancel={handleCancelDelete}
      >
        <p style={{ textAlign: 'center', fontSize: '16px', padding: '18px' }}>
          Bạn có chắc chắn muốn xóa vĩnh viễn dự án đã chọn?
        </p>

        <div
          style={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <Button
            onClick={handleCancelDelete}
            style={{ backgroundColor: '#4C5BD4', color: 'white' }}
          >
            Huỷ
          </Button>

          <Button
            onClick={handleConfirmDelete}
            style={{ color: 'white', background: '#ffa800' }}
          >
            Xóa
          </Button>
        </div>
      </Modal>
      <Modal
        title="Xác nhận khôi phục"
        open={showRestoreConfirm}
        style={{ width: '460px' }}
        onCancel={handleCancelRestore}
      >
        <p style={{ textAlign: 'center', fontSize: '16px', padding: '18px' }}>
          Bạn có chắc chắn muốn khôi phục dự án đã chọn?
        </p>
        <div
          style={{
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <Button
            key="cancel"
            onClick={handleCancelRestore}
            style={{ backgroundColor: '#4C5BD4', color: 'white' }}
          >
            Huỷ
          </Button>
          <Button
            key="restore"
            onClick={handleConfirmRestore}
            style={{ backgroundColor: '#ffa800', color: 'white' }}
          >
            Khôi phục
          </Button>
        </div>
      </Modal>

      <Table
        rowKey="id"
        bordered
        dataSource={data?.meeting}
        // columns={defaultColumns as any}
        expandable={expandable as any}
      />
    </div>
  );
};
export default App;
