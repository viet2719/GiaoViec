import React, { useEffect, useState } from 'react';
import { Pagination, Space, Table, Tag } from 'antd';
import AddMeeting from './AddMeeting';
import EditMeeting from './EditMeeting';

import DeleteMeeting from './DeleteMeeting';
import { POST_PARAM } from '@/pages/api/auth';
import './Diadiem.module.css';
export interface PostPageAProps {}

export default function PhongHop({
  selectedColor,
  isHasRole,
}: {
  isHasRole: boolean;
  selectedColor: string;
}) {
  const [data, setData]: any = useState([]);
  const [listPlace, setListPlace]: any = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(true);
  const [total, setTotal] = useState<number>();
  const PAGE_SIZE = 10;
  const columns: any = [
    {},
    {
      title: 'Tên phòng',
      render: (record: any) => (
        <p style={{ fontWeight: '600', color: '#4c5bd4' }}>{record?.name}</p>
      ),
    },
    {
      title: 'Địa điểm',
      render: (record: any) => <p>{record?.tenDiaDiem}</p>,
    },
    {
      title: 'Sức chứa',
      render: (record: any) => <p>{record?.succhua}</p>,
    },
    {
      title: 'Trạng thái',
      render: (record: any) => (
        <>
          {record?.trangthai === 1 ? (
            <Tag color={'green'}>ĐANG HOẠT ĐỘNG</Tag>
          ) : (
            <Tag color={'red'}>NGƯNG HOẠT ĐỘNG</Tag>
          )}
        </>
      ),
    },
    {
      title: '',
      render: (record: any) => (
        <div>
          {isHasRole ? (
            <Space size="middle">
              <EditMeeting
                data={record}
                listPlace={listPlace}
                setReload={setReload}
              />
              <span>|</span>
              <DeleteMeeting
                id={record?.id}
                name={record?.name}
                setReload={setReload}
              />
            </Space>
          ) : null}
        </div>
      ),
    },
  ];
  useEffect(() => {
    if (reload) {
      POST_PARAM('meeting-rooms/quan-ly-phong-hop', {}, page).then((res) => {
        setTotal(res?.data?.total);
        setData(res?.data?.meetingRoom);
        setListPlace(res?.data?.listPlace);
        setReload(false);
      });
    }
  }, [page, reload]);

  //handle
  const handlePageChange = (page: any) => {
    setPage(page);
    setReload(true);
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedData = data?.slice(startIndex, endIndex);
  return (
    <div className="margin_20px">
      <div className="box_work">
        <div id="list_work">
          <div className="text_work1">
            <h4
              className={`name_list ${selectedColor}`}
              style={{ fontSize: '16px', fontWeight: 'bold' }}
            >
              Danh sách phòng họp
            </h4>
          </div>
          <form action="">
            {isHasRole ? (
              <div className="form_search">
                <AddMeeting
                  selectedColor={selectedColor}
                  listPlace={listPlace}
                  setReload={setReload}
                />
              </div>
            ) : null}
          </form>
          <Table
            className="table-room"
            scroll={{ x: 'max-content' }}
            columns={columns}
            dataSource={data}
            // dataSource={paginatedData}
            pagination={{
              current: page, // Truyền giá trị `current` cho Table
              total: total, // Truyền giá trị `total` cho Table
              pageSize: PAGE_SIZE, // Truyền giá trị `pageSize` cho Table
              onChange: handlePageChange, // Truyền hàm xử lý sự thay đổi trang cho Table
            }}
          />
        </div>
        {/* <div className="tt_pages" style={{ paddingTop: 10 }}>
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
