import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { POST } from "../api/auth";
import { pos } from "@/components/Department";

interface DataType {
  key: React.Key;
  id: number;
  name: string;
  email: string;
  sdt: string;
  phongban: string;
  vitri: string;
}

const App: React.FC = () => {
  const [apiData, setApiData] = useState<{ DanhSachThanhVien: DataType[] }>({
    DanhSachThanhVien: [],
  });
  const [listDepartment, setListDepartment] = useState<any>();

  const [searchValue, setSearchValue] = useState("");

  const fetchApiData = () => {
    POST("cai-dat-sau-dang-nhap-quan-ly", {}).then((response) => {
      setApiData(response.data);
    });
  };
  const fetchApiListDepartment = () => {
    POST( "showListDep", {})
    .then((res) => {
        setListDepartment(res?.listDep);
      })
    .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    fetchApiData();
    fetchApiListDepartment();
  }, []);
  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "    Họ & Tên",
      dataIndex: "userName",
    },
    {
      title: "Email",
      dataIndex: "emailContact",
    },

    {
      title: "SĐT",
      dataIndex: "phone",
    },
    {
      title: "Phòng Ban",
      filters: listDepartment?.map((item : any) => ({
        text: item.dep_name,
        value: item.dep_id,
      })),
      onFilter: (value: any, record: any) => {
        return record?.inForPerson?.employee?.dep_id === value;
      },
      filterSearch: {
        placeholder: "Tìm phòng ban",
        autoFocus: true,
        onSearch: (text: string) => setSearchValue(text),
      } as any,
      width: "20%",
      render: (record) => (
        <p>
          {
            listDepartment.find(
              (item : any) =>
                item.dep_id === record?.inForPerson?.employee?.dep_id
            )?.dep_name
          }
        </p>
      ),
    },
    {
      title: "Vị trí",
      filters: pos.map((item) => ({
        text: item.label,
        value: item.value,
      })),
      onFilter: (value: any, record: any) => {
        return record?.inForPerson?.employee?.position_id === value;
      },
      filterSearch: {
        placeholder: "Tìm kiếm vị trí",
        autoFocus: true,
        onSearch: (text: string) => setSearchValue(text),
      } as any,
      width: "20%",
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
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  

  return (
    <div>
      <Table
        columns={columns}
        dataSource={apiData?.DanhSachThanhVien}
        onChange={onChange}
        scroll={{ x: "1000" }}
      />
    </div>
  );
};

export default App;
