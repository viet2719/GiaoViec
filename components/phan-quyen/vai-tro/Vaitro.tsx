import React, { useState } from 'react';
import Image from 'next/image';
import { Input, Pagination, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import styles from './vaitro.module.css';
import Link from 'next/link';
import ModalDel from './ModalDel';
import { useRouter } from 'next/router';
import Themvaitro from './Themvaitro';
import SuaVaiTro from './SuaVaiTro';
import ChiTietVaiTro from './ChiTietVaiTro';
export default function VaiTro({
  data,
  reload,
  setReLoad,
  setActiveKey,
  setOpenKeys,
  selectedColor,
  isHasRole,
  setData,
}: {
  data: any;
  reload: any;
  setReLoad: any;
  isHasRole: boolean;
  setActiveKey: Function;
  setOpenKeys: Function;
  selectedColor: string;
  setData: any;
}) {
  const router = useRouter();
  const [option, setOption] = useState(0);
  const [dataRole, setDataRole] = useState([]);
  const onClick = (info: any, record: any) => {
    setActiveKey(info?.key);
    info?.key === 'trang-chu' ? setOpenKeys([]) : null;
    setData(record);
  };

  interface DataType {
    id: number;
    key: string;
    name: string;
    text: string;
  }
  const [searchText, setSearchText] = useState('');

  const { Search } = Input;
  const onSearch = (value: string) => {
    setSearchText(value);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;

  const columns: ColumnsType<DataType> = [
    {
      title: 'Tên vai trò',
      key: 'name',
      render: (record) => {
        if (record.id >= 3) {
          return (
            <div
              className={styles.name_vaitro}
              // key={'chi-tiet-vai-tro'}
              onClick={(e) => {
                setDataRole(record);
                setOption(3);
              }}
            >
              {record.name}
            </div>
          );
        } else {
          return (
            <div
              className={styles.name_vaitro}
              onClick={(e) => {
                setDataRole(record);
                setOption(2);
              }}
            >
              {record.name}
            </div>
          );
        }
      },
    },
    {
      title: 'Mô tả',
      dataIndex: 'mota',
      key: 'text',
    },
    {
      title: ' ',
      key: 'action',
      render: (record) => (
        <div>
          {record?.id >= 3 && isHasRole ? (
            <Space size="middle">
              <div
                className={styles.sua}
                // key={'sua-vai-tro'}
                onClick={(e) => {
                  setDataRole(record);
                  setOption(2);
                }}
              >
                <Image
                  unoptimized
                  width={18}
                  height={16}
                  alt=""
                  src="https://hungha365.com/storageimage/GV/edit_ql_blue.png"
                />
                Sửa
              </div>
              <span>/</span>
              <ModalDel
                id={record?.id}
                name={record.name}
                reload={reload}
                setReLoad={setReLoad}
              />
            </Space>
          ) : null}
        </div>
      ),
    },
  ];

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  // const paginatedData = data?.role?.slice(startIndex, endIndex);

  const paginatedData = (data?.role || []).filter((record: any) =>
    (record as DataType).name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      {option == 0 ? (
        <div className="margin_20px" style={{ marginTop: '40px' }}>
          <div className="box_work">
            <div key="list_work">
              <div className={`text_work1 `}>
                <h4 className={`name_list ${selectedColor}`}>
                  Danh sách vai trò
                </h4>
              </div>
              <form action="">
                {isHasRole ? (
                  <div className="form_search">
                    <div
                      className={`${styles.btn_themmoi} ${selectedColor}`}
                      key={'them-moi-vai-tro'}
                      // onClick={() => onClick({ key: 'them-moi-vai-tro' }, [])}
                      onClick={(e) => setOption(1)}
                    >
                      <p>+Thêm mới</p>
                    </div>

                    <div className="searchcv">
                      <Search
                        placeholder="Tìm kiếm vai trò"
                        onSearch={onSearch}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="form_search">
                    <p></p>

                    <div className="searchcv">
                      <Search
                        placeholder="Tìm kiếm dự án"
                        onSearch={onSearch}
                      />
                    </div>
                  </div>
                )}
              </form>

              <Table
                rowKey="id"
                columns={columns}
                dataSource={paginatedData}
                scroll={{ x: 'max-content' }}
              />
            </div>

            {/* <div className="tt_page" style={{ paddingTop: 20 }}>
          <Pagination
            current={currentPage}
            total={data?.role?.length}
            pageSize={PAGE_SIZE}
            onChange={(page) => setCurrentPage(page)}
          />
        </div> */}
          </div>
        </div>
      ) : option == 1 ? (
        <>
          <Themvaitro
            setActiveKey={setActiveKey}
            selectedColor={selectedColor}
            setOption={setOption}
          />
        </>
      ) : option == 2 ? (
        <>
          <SuaVaiTro
            setActiveKey={setActiveKey}
            selectedColor={selectedColor}
            record={dataRole}
            setData={setData}
            setOption={setOption}
          />
        </>
      ) : (
        <>
          <ChiTietVaiTro
            isHasRole={isHasRole}
            setOpenKeys={setActiveKey}
            setActiveKey={setActiveKey}
            selectedColor={selectedColor}
            record={dataRole}
            setOption={setOption}
          />
        </>
      )}
    </>
  );
}
