import React, { useEffect, useState } from 'react';
import {
  Table,
  Input,
  Pagination,
  Select,
  message,
  Dropdown,
  Menu,
} from 'antd';
const { Option } = Select;
import type { ColumnsType, TableProps } from 'antd/es/table';
import Image from 'next/image';
import styles from '@/components/phan-quyen/vai-tro/vaitro.module.css';
import { POST } from '@/pages/api/auth';
import { fetchData } from 'next-auth/client/_utils';
import { pos } from '@/components/Department';
interface DataType {
  _id: any;
  userName: string;
  phone: number;
  emailContact: string;
  vaitro: string;
}

const NguoiDung = ({
  selectedColor,
  isHasRole,
}: {
  selectedColor: string;
  isHasRole: boolean;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>([]);
  const [apiData, setApiData] = useState<{ user: DataType[] }>({ user: [] });
  const [role, setRole] = useState<any>();
  const [reload, setReLoad] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [searchValue, setSearchValue] = useState('');
  const [listDepartment, setListDepartment] = useState<any>();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Cập nhật vai trò người dùng thành công',
    });
  };
  const fetchApiListDepartment = () => {
    POST('showListDep', {})
      .then((res) => {
        setListDepartment(res?.listDep);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchApiData = () => {
    if (searchQuery) {
      POST('roles/quan-ly-nguoi-dung?keywords=' + searchQuery, {})
        .then((res) => {
          setSearchResults(res?.data);
          setApiData(res?.data);
          setReLoad(!reload);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      POST('roles/quan-ly-nguoi-dung?keywords=', {}).then((res) => {
        setApiData(res?.data);
        setReLoad(!reload);
      });
    }
  };
  useEffect(() => {
    fetchApiData();
    fetchDataRole();
    fetchApiListDepartment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  const fetchDataRole = () => {
    POST('roles/quan-ly-vai-tro?keywords', {}).then((response) => {
      setRole(response?.data);
      setReLoad(!reload);
    });
  };

  const updateRole = (userId: any, roleId: any) => {
    POST(`roles/quan-ly-nguoi-dung/edit/${userId}`, {
      vaitro_id: roleId,
    })
      .then((response) => {
        success();
        setReLoad(!reload);
      })
      .catch((err) => {
        new Error(err.message);
      });
  };
  const renderDropdownMenu = (record: any) => (
    <Menu>
      <Menu.Item>
        <div style={{ display: 'flex' }}>
          <div>
            <Image
              unoptimized
              src="https://hungha365.com/storageimage/GV/avt.jpg"
              alt=""
              style={{
                width: '37px',
                borderRadius: '50%',
                paddingTop: '20px',
                paddingRight: '5px',
              }}
            />
          </div>
          <div>
            <p style={{ paddingTop: '10px' }}>{record.userName}</p>
            <p>
              {
                pos.find(
                  (item) =>
                    item.value === record?.inForPerson?.employee?.position_id
                )?.label
              }
            </p>
          </div>
        </div>
      </Menu.Item>
    </Menu>
  );
  const columns: ColumnsType<DataType> = [
    {
      title: 'ID',
      dataIndex: '_id',
    },
    {
      title: '    Họ & Tên',
      render: (text, record) => (
        <Dropdown overlay={renderDropdownMenu(record)} trigger={['hover']}>
          <span>{record.userName}</span>
        </Dropdown>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'emailContact',
    },

    {
      title: 'SĐT',
      dataIndex: 'phone',
    },
    {
      title: 'Chọn phòng ban',
      filters: listDepartment?.map((item: any) => ({
        text: item.dep_name,
        value: item.dep_id,
      })),
      onFilter: (value: any, record: any) => {
        return record?.inForPerson?.employee?.dep_id === value;
      },
      filterSearch: {
        placeholder: 'Tìm phòng ban',
        autoFocus: true,
        onSearch: (text: string) => setSearchValue(text),
      } as any,
      width: '20%',
      render: (record) => (
        <p>
          {
            listDepartment?.find(
              (item: any) =>
                item.dep_id === record?.inForPerson?.employee?.dep_id
            )?.dep_name
          }
        </p>
      ),
    },
    {
      title: 'Chọn chức vụ',
      filters: pos.map((item) => ({
        text: item.label,
        value: item.value,
      })),
      onFilter: (value: any, record: any) => {
        return record?.inForPerson?.employee?.position_id === value;
      },
      filterSearch: {
        placeholder: 'Tìm kiếm chức vụ',
        autoFocus: true,
        onSearch: (text: string) => setSearchValue(text),
      } as any,
      width: '20%',
      render: (record) => (
        <p>
          {
            pos.find(
              (item) =>
                item.value === record?.inForPerson?.employee?.position_id
            )?.label
          }
        </p>
      ),
    },
    {
      title: 'Vai trò',
      render: (value) =>
        isHasRole ? (
          <Select
            value={value?.vaitro}
            onChange={(newValue) => {
              updateRole(value?._id, newValue);
            }}
          >
            {role?.role?.map((item: any) => (
              <Option value={item.id} key={item.id}>
                {item?.name}
              </Option>
            ))}
          </Select>
        ) : (
          <p>{value.vaitro}</p>
        ),
    },
  ];

  const onChange: TableProps<DataType>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {};
  const { Search } = Input;
  const onSearch = (value: string) => {
    setSearchQuery(value);
  };
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedData = searchQuery ? searchResults?.user : apiData?.user;

  return (
    <div className="margin_20px">
      <div className="box_work">
        <div id="list_work">
          <div className="text_work1">
            <h4 className={`name_list ${selectedColor}`}>
              Danh sách nhân viên
            </h4>
          </div>
          <div className="form_search">
            <p></p>
            <div className="searchcv">
              <Search placeholder="Tìm kiếm nhân viên" onSearch={onSearch} />
            </div>
          </div>
          {contextHolder}
          <div className={styles.div_tb}>
            <Table
              columns={columns}
              dataSource={paginatedData}
              onChange={onChange}
              scroll={{ x: '1000' }}
            />
          </div>
        </div>
        <div className="tt_page" style={{ paddingTop: 20 }}></div>
      </div>
    </div>
  );
};
export default NguoiDung;
