import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState, useContext } from 'react';
import { Input, Pagination, Table } from 'antd';
import { convertDateFormat, calculateTaskStatus } from '@/utils/dataUtils';
import Btn_ThemMoi from '@/components/quan-ly-du-an/theo-danh-sach-cong-viec/Themmoi';
import { POST } from '@/pages/api/auth';
import { ListEpContext } from '@/components/context/listEpContext';
import styles from './danhsachcongviec.module.scss';
import { useRouter } from 'next/router';
export default function Listwork({
  setActiveKey,
  setOpenKeys,
  selectedColor,
  isHasRole,
  setIdProject,
  activeKey,
}: {
  setActiveKey: Function;
  setOpenKeys: Function;
  selectedColor: string;
  isHasRole: boolean;
  setIdProject: Function;
  activeKey: any;
}) {
  const router = useRouter();
  const listEp: any = useContext(ListEpContext);
  const [listP, setListP] = useState([]);
  const [textSearch, setTextSearch]: any = useState('');
  const [allContent, setAllContent]: any = useState();
  const [pageSize, setPageSize]: any = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [reload, setReload] = useState(false);

  //cột
  const columns: any[] = [
    {
      title: 'STT',
      dataIndex: 'index',
      key: 'index',
      render: (text: any, record: any, index: number) => index + 1,
    },
    {
      title: 'Tên dự án',
      dataIndex: 'project_name',
      key: 'project_name',
      render: (text: any, record: any) => (
        <div
          onClick={() =>
            router.push(
              `/quan-ly-du-an-theo-danh-sach-cong-viec/chi-tiet-du-an-theo-danh-sach-cong-viec?task=${record.project_id}`
            )
          }
          style={{ color: '#4c5bd4', cursor: 'pointer', fontWeight: '600' }}
        >
          {text}
        </div>
      ),
    },
    {
      title: 'Nhân sự thực hiện',
      dataIndex: 'project_member',
      key: 'project_member',
      render: (text: any, record: any) => handleProjectMember(record),
    },
    {
      title: 'Nhân sự quản lý',
      dataIndex: 'project_management',
      key: 'project_management',
      render: (text: any, record: any) => handleProjectManagement(record),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text: any, record: any) => calculateTaskStatus(record),
    },
    {
      title: 'Thời gian',
      dataIndex: 'date',
      key: 'date',
      render: (text: any, record: any) => (
        <td className="show_date">
          <div>
            <p className="start_work">{convertDateFormat(record.date_start)}</p>
            <p className="end_work">{convertDateFormat(record.date_end)}</p>
          </div>
          <div className="hover_show">
            <p className="start_work">
              Thời gian bắt đầu:
              {convertDateFormat(record.date_start)}
            </p>
            <p className="end_work">
              Thời gian kết thúc:
              {convertDateFormat(record.date_end)}
            </p>
          </div>
        </td>
      ),
    },
  ];

  useEffect(() => {
    try {
      const formData = new FormData();
      formData.append('pageSize', pageSize)
      POST(
        `projects/quan-ly-du-an-theo-danh-sach-cong-viec/${currentPage}?keywords=${textSearch}`, {pageSize}
      ).then((res) => {
        setListP(res?.data?.project);
        setAllContent(res?.data?.total);
      });
    } catch (e) {
      console.log(e);
    }
  }, [currentPage, pageSize, reload]);

  const startClick = (info: any, item: any) => {
    // setIdProject(item);
    localStorage.setItem('project', JSON.stringify(item));
    setActiveKey(info?.key);
    info?.key === 'trang-chu' ? setOpenKeys([]) : null;
  };
  const { Search } = Input;

  const onSearch = async (value: any) => {
    setTextSearch(value);
    try {
      const response = await POST(
        `projects/quan-ly-du-an-theo-danh-sach-cong-viec/1?keywords=${value}`
      );
      setListP(response.data.project);
      setAllContent(response?.data?.total);
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleProjectMember = (item: any) => {
    let nameMember = '';
    const memberIDs = item.project_member.split(',');
    const result = memberIDs.map((id: any, index: any) => {
      for (let i = 0; i < listEp?.length; i++) {
        const epItem = listEp[i];
        if (epItem._id === Number(id)) {
          nameMember = epItem.userName;
          break;
        }
      }
      return (
        <div key={index} className="show_date">
          <Image
            unoptimized
            width={22}
            height={22}
            src="https://hungha365.com/storageimage/GV/Group 626671.png"
            alt=""
            className="img_table_work"
          />
          <div className="hover_show">
            <p className="start_work">{nameMember}</p>
          </div>
        </div>
      );
    });
    return result;
  };

  const handleProjectManagement = (item: any) => {
    const memberIDs = item.project_management.split(',');
    const result = memberIDs.map((id: any, index: any) => {
      let nameManagement = '';
      for (let i = 0; i < listEp?.length; i++) {
        const epItem = listEp[i];
        if (epItem._id === Number(id)) {
          nameManagement = epItem.userName;
          break;
        }
      }
      return (
        <div key={index} className="show_date">
          <Image
            unoptimized
            width={22}
            height={22}
            src="https://hungha365.com/storageimage/GV/Group 626671.png"
            alt=""
            className="img_table_work"
          />
          <div className="hover_show">
            <p className="start_work">{nameManagement}</p>
          </div>
        </div>
      );
    });
    return result;
  };

  return (
    <div className={styles.dsda}>
      <div>
        <div className="margin_20px">
          <div className="box_work">
            <div id="list_work">
              <div className="text_work1">
                <h4 className={`name_list ${selectedColor}`}>
                  Danh sách dự án
                </h4>
              </div>

              {isHasRole ? (
                // =====================================Công ty================================
                <div>
                  <form action="">
                    <div className="form_search">
                      <Btn_ThemMoi
                        selectedColor={selectedColor}
                        listEp={listEp}
                        listP={listP}
                        setReload={setReload}
                        reload={reload}
                      />
                      <br />
                      <div
                        className="searchcv"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                          }
                        }}
                      >
                        <Search
                          placeholder="Tìm kiếm dự án"
                          onSearch={onSearch}
                        />
                      </div>
                    </div>
                  </form>
                  <div className="scrollmobile table-container">
                    <table className="tbl_work">
                      <thead>
                        <tr>
                          <th className="stt_tbl">STT</th>
                          <th className="name_work_tbl">Tên dự án</th>
                          <th>Nhân sự thực hiện</th>
                          <th>Nhân sự quản lý</th>
                          <th>Trạng thái</th>
                          <th>Thời gian</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listP?.map((item: any, index) => (
                          <React.Fragment key={index}>
                            <tr>
                              <td>{index + 1}</td>
                              <td>
                                <div
                                  onClick={() =>
                                    router.push(
                                      `/quan-ly-du-an-theo-danh-sach-cong-viec/chi-tiet-du-an-theo-danh-sach-cong-viec?task=${item.project_id}`
                                    )
                                  }
                                  style={{
                                    color: '#4c5bd4',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                  }}
                                >
                                  {item.project_name}
                                </div>
                                <div>
                                  <span className={styles.blue}>DA</span>
                                  {item.project_card?.includes(1) && (
                                    <span className={styles.green}>
                                      Quan trọng
                                    </span>
                                  )}
                                  {item.project_card?.includes(2) && (
                                    <span className={styles.red}>Khẩn cấp</span>
                                  )}
                                </div>
                              </td>

                              <td>
                                <div>{handleProjectMember(item)} </div>
                              </td>
                              <td>
                                <div>{handleProjectManagement(item)}</div>
                              </td>
                              {/* <td>
                                <Image
              unoptimized
                                  width={22}
                                  height={22}
                                  src="https://hungha365.com/storageimage/GV/Group 626671.png"
                                  alt=""
                                />
                              </td> */}
                              <td>{calculateTaskStatus(item)}</td>
                              <td className="show_date">
                                <div>
                                  <p className="start_work">
                                    {convertDateFormat(item.date_start)}
                                  </p>{' '}
                                  {/* Sửa định dạng ngày */}
                                  <p className="end_work">
                                    {convertDateFormat(item.date_end)}
                                  </p>{' '}
                                  {/* Sửa định dạng ngày */}
                                </div>
                                <div className="hover_show">
                                  <p className="start_work">
                                    Thời gian bắt đầu:{' '}
                                    {convertDateFormat(item.date_start)}
                                  </p>{' '}
                                  {/* Sửa định dạng ngày */}
                                  <p className="end_work">
                                    Thời gian kết thúc:{' '}
                                    {convertDateFormat(item.date_end)}
                                  </p>{' '}
                                  {/* Sửa định dạng ngày */}
                                </div>
                              </td>
                            </tr>
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                //==================================== Nhân Viên============================================<3
                <div>
                  <form action="">
                    <div className="form_search">
                      <br />
                      <div
                        className="searchcv"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                          }
                        }}
                      >
                        <Search
                          placeholder="Tìm kiếm dự án"
                          onSearch={onSearch}
                        />
                      </div>
                    </div>
                  </form>
                  <div className="scrollmobile table-container">
                    <Table
                      className="tbl_work"
                      scroll={{ x: 'max-content' }}
                      columns={columns}
                      dataSource={listP}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="tt_pages">
              <Pagination
                total={allContent}
                current={currentPage}
                onShowSizeChange={(current, size) => {
                  setPageSize(size)
                 }}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
