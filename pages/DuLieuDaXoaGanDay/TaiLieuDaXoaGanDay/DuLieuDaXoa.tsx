import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, Form, Checkbox, Input, Popconfirm, Table, Modal } from 'antd';
import styles from './index.module.css';
import { CaretDownOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { format } from 'date-fns';
import { POST } from '@/pages/api/auth';

interface Item {
  key: string;
  name: string;
  dateB: string;
  dungluong: string;
  date: string;
  img: string;
}

const App = ({
  selectedColor,
  data,
  reload,
  setReLoad,
}: {
  selectedColor: string;
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
    setExpandedRowKeys(expanded ? [record?.id] : []);
  };

  const handleSelectAll = (e: any) => {
    const { checked } = e.target;
    const allRowKeys = data?.file?.map((item: any) => item.id);

    if (checked) {
      setSelectedRowKeys(allRowKeys);
    } else {
      setSelectedRowKeys([]);
    }
  };
  const selectAllCheckbox = (
    <Checkbox
      checked={selectedRowKeys.length === data?.file?.length}
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
        style={{ display: 'flex', justifyContent: 'space-evenly' }}
        onClick={() => handleSelectRow(record.id)}
      >
        <p></p>
        <p style={{ fontWeight: '500', marginRight: '90px' }}>
          {' '}
          <Image
            unoptimized
            width={50}
            height={50}
            alt=""
            src={'/anh134.png'}
            style={{ padding: '10px' }}
          />
          {record.name_file}
        </p>
        <p style={{ padding: '10px' }}>
          {format(new Date(record?.created_at * 1000), 'dd-MM-yyyy HH:mm:ss')}
        </p>
        <p style={{ padding: '10px' }}>{record.size_file} kb</p>
      </div>
    ),
  };

  const defaultColumns: any[number] & {
    editable?: boolean;
    dataIndex: string;
  } = [
    {
      title: 'Tên tài liệu',
      width: '20%',
    },
    {
      title: 'Thời gian',
      width: '20%',
    },
    {
      title: 'Dung lượng',
      width: '20%',
    },
    {
      title: (
        <div style={{ display: 'flex' }}>
          {selectAllCheckbox}
          <span style={{ marginLeft: 8 }}>Chọn</span>
        </div>
      ),
      dataIndex: 'selectAll',
      width: '10%',
      render: (_: any, record: { id: React.Key }) => (
        <Checkbox
          checked={selectedRowKeys.includes(record.id)}
          onChange={() => handleSelectRow(record.id)}
        />
      ),
      editable: true,
    },
  ];

  const handleDelete = () => {
    if (selectedRowKeys.length > 0) {
      setShowDeleteConfirm(true);
    }
  };

  const handleConfirmDelete = () => {
    POST('deleted-data/quan-ly-tai-lieu-da-xoa-gan-day/force-delete', {
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

  const [showRestoreConfirm, setShowRestoreConfirm] = useState(false);

  const handleRestore = () => {
    if (selectedRowKeys.length > 0) {
      setShowRestoreConfirm(true);
    }
  };

  const handleConfirmRestore = () => {
    POST('deleted-data/quan-ly-tai-lieu-da-xoa-gan-day/restore', {
      list_check: '[' + selectedRowKeys?.join(',') + ']',
    }).then((response) => {
      setReLoad(!reload);
      setShowRestoreConfirm(false);
    });
  };

  const handleCancelRestore = () => {
    setShowRestoreConfirm(false);
  };
  return (
    <div>
      {/* <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button> */}
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
            style={{ backgroundColor: '#ffa800', color: 'white' }}
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
        dataSource={data?.file}
        scroll={{ x: 'max-content' }}
        columns={defaultColumns as any}
        expandable={expandable as any}
      />
    </div>
  );
};
export default App;
