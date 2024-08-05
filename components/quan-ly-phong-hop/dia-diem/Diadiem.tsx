'use client';
import React, { useEffect, useState } from 'react';
import { Pagination, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import AddPlace from './AddPlace';
import EditPlace from './EditPlace';
import DeletePlace from './DeletePlace';
import { POST, POST_PARAM } from '@/pages/api/auth';
import { log } from 'console';

export interface PostPageAProps {}

export default function DiaDiem({
  selectedColor,
  isHasRole,
}: {
  isHasRole: boolean;

  selectedColor: string;
}) {
  const [page, setPage] = useState(1);
  const [data, setData]: any = useState([]);
  const [dvsd, setDvsd] = useState('');
  const [reload, setReload] = useState(true);
  const [total, setTotal] = useState<number>(0);
  const PAGE_SIZE = 10;
  const columns: any = [
    {},
    {
      title: 'Địa điểm',
      render: (record: any) => (
        <p style={{ fontWeight: '600', color: '#4c5bd4' }}>{record?.name}</p>
      ),
    },
    {
      title: 'Đơn vị sử dụng',
      render: (record: any) => <p>{record?.dvsd}</p>,
    },
    {
      title: 'Địa chỉ',
      render: (record: any) => <p>{record?.address}</p>,
    },
    isHasRole
      ? {
          title: 'Chức năng',
          key: 'action',
          render: (record: any) => (
            <div>
              <Space size="middle">
                <EditPlace data={record} dvsd={dvsd} setReload={setReload} />
                <span>|</span>
                <DeletePlace
                  id={record?.id}
                  name={record?.name}
                  setReload={setReload}
                />
              </Space>
            </div>
          ),
          width: '15%',
        }
      : {},
  ];
  useEffect(() => {
    if (reload) {
      POST_PARAM('meeting-rooms/quan-ly-dia-diem', {}, page).then((res) => {
        setTotal(res?.data?.total);
        setData(res?.data?.place);
        setDvsd(res?.data?.com_name);
        setReload(false);
      });
    }
  }, [page, reload]);

  //handle
  const handlePageChange = (page: any) => {
    setPage(page);
    setReload(true);
  };

  return (
    <div className="margin_20px">
      <div className="box_work">
        <div id="list_work">
          <div className="text_work1">
            <h4
              className={` name_list ${selectedColor}`}
              style={{ fontSize: '16px', fontWeight: 'bold' }}
            >
              Danh sách địa điểm
            </h4>
          </div>
          <form action="">
            {isHasRole ? (
              <div className="form_search">
                <AddPlace
                  selectedColor={selectedColor}
                  dvsd={dvsd}
                  setReload={setReload}
                />
              </div>
            ) : null}
          </form>
          <Table
            columns={columns}
            dataSource={data}
            scroll={{ x: 'max-content' }}
            pagination={{
              current: page, // Truyền giá trị `current` cho Table
              total: total, // Truyền giá trị `total` cho Table
              pageSize: PAGE_SIZE, // Truyền giá trị `pageSize` cho Table
              onChange: handlePageChange, // Truyền hàm xử lý sự thay đổi trang cho Table
            }}
          />
        </div>
        {/* <div className="tt_pages">
          <Pagination
            current={page}
            total={total}
            pageSize={PAGE_SIZE}
            onChange={(page) => {
              setPage(page);
              setReload(true);
            }}
          />
        </div> */}
      </div>
    </div>
  );
}
