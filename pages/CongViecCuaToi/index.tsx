import React, { useEffect, useState } from "react";
import Router from "next/router";
import Image from "next/image";
import { Space, Table, Input, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import { POST, POST_PARAM_QUERY } from "../api/auth";
import dayjs from "dayjs";

export interface PostPageAProps {}
export default function PostPage({
  setActiveKey,
  setOpenKeys,
  selectedColor,
  isHasRole,
}: {
  isHasRole: boolean;
  setActiveKey: Function;
  setOpenKeys: Function;
  selectedColor: string;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 10;
  const [data,setData] = useState<any[]>([])
  useEffect(()=>{
    POST('me/cong-viec-cua-toi',{})
    .then(res => {
      if(res){
        setData(res?.data?.list);
      }
    })

  },[])
  const onClick = (info: any) => {
    setActiveKey(info?.key);
    info?.key === "trang-chu" ? setOpenKeys([]) : null;
  };
  const renderApplyKey = () => {
    setActiveKey("chi-tiet-cong-viec-cua-toi");
  };

  const Chitietcongvieccuatoi = (record:any) => {
    Router.push(`CongViecCuaToi/chitietcv?id=${record?.type === 1 ? record?.job_id : record?.id}&type=${record?.type}`);
  };
  const columns: ColumnsType<any> = [
    {
      title: "STT",
      key: "stt",
      render: (text, record, index):any => <div style={{fontWeight:'600'}}>{index + 1}</div> 
    },
    {
      title: "Tên công việc",
      key: "name",
      render: (record) => 
      <p onClick={()=>Chitietcongvieccuatoi(record)} style={{fontWeight:'600',color:'#4c5bd4',cursor:'pointer'}}>
        {record?.type === 1 ? record?.job_name : record?.name_misssion}
      </p>,
    },
    {
      title: "Người giao việc",
      key: "boss",
      render: (record) => <p>{record?.type === 1 ? record?.id_giaoviec : record?.id_giaovien}</p>,
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (record) => 
        <p style={{color:`${
          record?.type === 1 ?
              record?.status_or_late === 1 ?
                dayjs() > dayjs(`${record?.date_end} ${record?.time_out}`) ?
                  'red' :
                  'blue'
              :
              record?.status_or_late === 2 ?
                'green'
                :
                'orange'
            :
            record?.stage_id === 222 ?
              'red'
              :
              record?.stage_id === 111 ?
              'green'
              : 
              dayjs() > dayjs.unix(record?.hour_complete) ?
              'red'
              :
              'blue'
              
        }`}}>
          {
            record?.type === 1 ?
              record?.status_or_late === 1 ?
                dayjs() > dayjs(`${record?.date_end} ${record?.time_out}`) ?
                  'Quá hạn' :
                  'Đang tiến hành'
              :
              record?.status_or_late === 2 ?
                'Hoàn thành'
                :
                'Hoàn thành muộn'
            :
            record?.stage_id === 222 ?
              'Thất bại'
              :
              record?.stage_id === 111 ?
              'Hoàn thành'
              : 
              dayjs() > dayjs.unix(record?.hour_complete) ?
              'Quá hạn'
              :
              'Đang tiến hành'
          }
        </p>,
    },
    {
      title: "Thời hạn công việc",
      key: "time",
      render: (record) => 
        <p onClick={Chitietcongvieccuatoi} style={{color:'#F46A6A', fontWeight:'600'}}>
          { 
            record?.type === 1 ?
            dayjs(`${record?.date_end} ${record?.time_out}`).format('DD/MM/YYYY HH:mm'):
            dayjs.unix(record?.hour_complete).format('DD/MM/YYYY HH:mm')
          }
        </p>,
    },
  ];
  const { Search } = Input;
  const onSearch = (value: string) => {
    POST_PARAM_QUERY('me/cong-viec-cua-toi',{},{keywords:value})
    .then(res => {
      if(res){
        setData(res?.data?.list);
      }
    })
  }
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedData = data?.slice(startIndex, endIndex);
  return (
    <div className="margin_20px">
      <div className="box_work">
        <div id="list_work">
          <div className={`text_work1 ${selectedColor}`}>
            <h4
              className={`name_list ${selectedColor}`}
              style={{ fontSize: "16px", fontWeight: "bold" }}
            >
              Danh sách công việc
            </h4>
          </div>
          <form action="">
            <div className="form_search">
              <p></p>
              <div className="searchcv">
                <Search placeholder="Tìm kiếm công việc" onSearch={onSearch} />
              </div>
            </div>
          </form>
          <Table
            columns={columns}
            // dataSource={data}
            dataSource={paginatedData}
            scroll={{ x: "max-content" }}
          />
        </div>
        <div className="tt_pages">
          <Pagination
            current={currentPage}
            total={data?.length}
            pageSize={PAGE_SIZE}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
}
