import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Input, Pagination } from 'antd';
import Themmoiquytrinh from '@/pages/components/Quanlyduan/Theoquytrinh/Themmoiquytrinh';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProcesses } from '@/store/actions/processesActions';
import { RootState } from '@/store/reducers';
export default function Tqt({
  setActiveKey,
  setOpenKeys,
  selectedColor,
  isHasRole,
}: {
  setActiveKey: Function;
  setOpenKeys: Function;
  selectedColor: string;
  isHasRole: boolean;
}) {
  const [popup, setPop] = useState(false);
  const [page, setPage] = useState(1);
  //lấy dữ liệu từ redux
  const dispatch = useDispatch();
  const processes = useSelector(
    (state: RootState) => state.processes.processes
  );

  useEffect(() => {
    dispatch(fetchProcesses() as any);
  }, [dispatch]);

  const handleClickOpen = () => {
    setPop(!popup);
  };
  const closePopup = () => {
    setPop(false);
  };

  const onClick = (info: any) => {
    localStorage.setItem('process_id', info.id);
    localStorage.setItem('process_name', info.name);
    setActiveKey(info?.key);
    info?.key === 'trang-chu' ? setOpenKeys([]) : null;
  };
  const { Search } = Input;
  const onSearch = (value: string) => console.log(value);

  return (
    <div>
      <div className="margin_20px">
        <div className="box_work">
          <div id="list_work">
            <div className="text_work1">
              <h4 className={`name_list ${selectedColor}`}>
                Danh sách quy trình
              </h4>
            </div>

            {isHasRole ? (
              <div>
                {/* ---------------------------Công ty-------------------------------- */}
                <form action="">
                  <div className="form_search">
                    <Themmoiquytrinh selectedColor={selectedColor} />
                    <div className="searchcv">
                      <Search
                        placeholder="Tìm kiếm quy trình"
                        onSearch={onSearch}
                      />
                      <div className="loc" onClick={handleClickOpen}>
                        <p style={{ margin: '0' }}>Bộ lọc</p>
                        <Image
                          unoptimized
                          width={18}
                          height={13}
                          alt=""
                          className="img_none"
                          src="https://hungha365.com/storageimage/GV/boloc.png"
                        />
                      </div>

                      {/* ------------------Bộ lọc-------------- */}
                      {popup ? (
                        <div className="boloc">
                          <div>
                            <div className="nenxanh_chutrang  head_boloc remove_class">
                              <h3
                                className="h3"
                                style={{
                                  fontSize: '18px',
                                  lineHeight: '38px',
                                  fontWeight: 'bold',
                                }}
                              >
                                Bộ lọc
                              </h3>
                              <div className=" x_close close c-pointer">
                                <Image
                                  unoptimized
                                  width={15}
                                  height={15}
                                  alt=""
                                  className="img_none23"
                                  onClick={closePopup}
                                  src="https://hungha365.com/storageimage/GV/close.png"
                                />
                              </div>
                            </div>
                            <div className="pd_20_bot25 nentrang">
                              <div className="bot-15">
                                <div className="w50 m_right_20">
                                  <p className="font-medium chuden bot5">
                                    Ngày tạo từ:
                                  </p>
                                  <input
                                    placeholder="Chọn ngày tạo"
                                    className="date_bl date_bl_sta"
                                    type="date"
                                  />
                                </div>
                                <div className="w50">
                                  <p className="font-medium chuden bot5">
                                    Đến ngày:
                                  </p>
                                  <input
                                    placeholder="Chọn ngày"
                                    className="date_bl date_bl_end"
                                    type="date"
                                  />
                                </div>
                              </div>
                              <div className="bot25">
                                <p className="font-medium chuden bot5">
                                  Trạng thái quy trình
                                </p>
                                <div className="select_no_muti_li">
                                  <select
                                    className="select_status select2-hidden-accessible"
                                    data-select2-id="select2-data-1-q71l"
                                    tabIndex={-1}
                                    aria-hidden="true"
                                  >
                                    <option value={0}>Tất cả</option>
                                    <option value={2}>Đã hoàn thành</option>
                                    <option value={1}>Đang thực hiện</option>
                                    <option value={3}>Quá hạn</option>
                                  </select>
                                </div>
                              </div>
                              <div className=" j_between">
                                <div className="nentrang_chuxanh footer_boloc_huy footer_boloc  j_center c-pointer">
                                  <p className="size-15" onClick={closePopup}>
                                    Huỷ
                                  </p>
                                </div>
                                <div className="nenxanh_chutrang footer_boloc footer_boloc_capnhat  j_center c-pointer remove_class">
                                  <p className="size-15">Cập nhật</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                </form>
                <div className="scrollmobile table-container">
                  <table className="tbl_work">
                    <thead>
                      <tr>
                        <th className="stt_tbl">STT</th>
                        <th>Tên quy trình</th>
                        <th className="name_work_tbl">Nhân sự thực hiện</th>
                        <th>Nhân sự quản lý</th>
                        <th>Trạng thái</th>
                        <th>Thời gian</th>
                      </tr>
                    </thead>
                    <tbody>
                      {processes?.map((item: any, index) => (
                        <React.Fragment key={index}>
                          <tr>
                            <td>{index + 1}</td>
                            <td>
                              <div
                                key={'chi-tiet-theo-quy-trinh'}
                                onClick={() =>
                                  onClick({
                                    key: 'chi-tiet-theo-quy-trinh',
                                    id: item.process_id,
                                    name: item.process_name,
                                  })
                                }
                                style={{ color: '#4c5bd4', cursor: 'pointer' }}
                              >
                                {item?.process_name}
                              </div>
                              <div>
                                <span style={{ display: 'none' }}></span>
                                {item?.process_card.includes(2) && (
                                  <span>Khẩn cấp</span>
                                )}
                                <br />
                                {item?.process_card.includes(1) && (
                                  <span>Quan trọng</span>
                                )}
                              </div>
                            </td>
                            <td>
                              <Image unoptimized src={''} alt={''} />
                              Việt
                            </td>
                            <td>
                              <Image src={''} alt={''} />
                              Việt
                            </td>
                            <td>Quá hạn</td>
                            <td className="show_date">
                              <p className="start_work">
                                {moment(item?.date_start).format('DD/MM/YYYY')}
                              </p>
                              <p className="end_work">
                                {moment(item?.date_end).format('DD/MM/YYYY')}
                              </p>
                              <div className="hover_show">
                                <p className="start_work">
                                  Thời gian bắt đầu:{' '}
                                  {moment(item?.date_start).format(
                                    'DD/MM/YYYY'
                                  )}
                                </p>
                                <p className="end_work">
                                  Thời gian kết thúc:{' '}
                                  {moment(item?.date_end).format('DD/MM/YYYY')}
                                </p>
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
              <div>
                {/* ------------------------------------- Nhân Viên------------------------------------- */}
                <form action="">
                  <div className="form_search">
                    <p></p>
                    <div className="searchcv ">
                      <Search
                        placeholder="Tìm kiếm quy trình"
                        onSearch={onSearch}
                      />
                    </div>

                    <div className="loc" onClick={handleClickOpen}>
                      <p style={{ margin: '0' }}>Bộ lọc</p>
                      <Image
                        unoptimized
                        width={18}
                        height={13}
                        alt=""
                        className="img_none"
                        src="https://hungha365.com/storageimage/GV/boloc.png"
                      />
                    </div>

                    {/* ------------------Bộ lọc-------------- */}
                    {popup ? (
                      <div className="boloc">
                        <div>
                          <div className="nenxanh_chutrang  head_boloc remove_class">
                            <h3 className="h3">Bộ lọc</h3>
                            <div className=" x_close close c-pointer">
                              <Image
                                unoptimized
                                width={15}
                                height={15}
                                alt=""
                                className="img_none23"
                                onClick={closePopup}
                                src="https://hungha365.com/storageimage/GV/close.png"
                              />
                            </div>
                          </div>
                          <div className="pd_20_bot25 nentrang">
                            <div className="bot-15">
                              <div className="w50 m_right_20">
                                <p className="font-medium chuden bot5">
                                  Ngày tạo từ:
                                </p>
                                <input
                                  placeholder="Chọn ngày tạo"
                                  className="date_bl date_bl_sta"
                                  type="date"
                                />
                              </div>
                              <div className="w50">
                                <p className="font-medium chuden bot5">
                                  Đến ngày:
                                </p>
                                <input
                                  placeholder="Chọn ngày"
                                  className="date_bl date_bl_end"
                                  type="date"
                                />
                              </div>
                            </div>
                            <div className="bot25">
                              <p className="font-medium chuden bot5">
                                Trạng thái quy trình
                              </p>
                              <div className="select_no_muti_li">
                                <select
                                  className="select_status select2-hidden-accessible"
                                  data-select2-id="select2-data-1-q71l"
                                  tabIndex={-1}
                                  aria-hidden="true"
                                >
                                  <option value={0}>Tất cả</option>
                                  <option value={2}>Đã hoàn thành</option>
                                  <option value={1}>Đang thực hiện</option>
                                  <option value={3}>Quá hạn</option>
                                </select>
                              </div>
                            </div>
                            <div className=" j_between">
                              <div className="nentrang_chuxanh footer_boloc_huy footer_boloc  j_center c-pointer">
                                <p className="size-15" onClick={closePopup}>
                                  Huỷ
                                </p>
                              </div>
                              <div className="nenxanh_chutrang footer_boloc footer_boloc_capnhat  j_center c-pointer remove_class">
                                <p className="size-15">Cập nhật</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </form>
                <div className="scrollmobile table-container">
                  <table className="tbl_work">
                    <thead>
                      <tr>
                        <th className="stt_tbl">STT</th>
                        <th className="name_work_tbl">Tên quy trình</th>
                        <th>Nhân sự thực hiện</th>
                        <th>Nhân sự quản lý</th>
                        <th>Trạng thái</th>
                        <th>Thời gian</th>
                      </tr>
                    </thead>
                    <tbody>
                      {processes?.map((item: any, index) => (
                        <React.Fragment key={index}>
                          <tr>
                            <td>{index + 1}</td>
                            <td>
                              <div
                                key={'chi-tiet-theo-quy-trinh'}
                                onClick={() =>
                                  onClick({ key: 'chi-tiet-theo-quy-trinh' })
                                }
                                style={{ color: '#4c5bd4', cursor: 'pointer' }}
                              >
                                {item?.process_name}
                              </div>
                              <div>
                                <span style={{ display: 'none' }}></span>
                                {item?.process_card.includes(2) && (
                                  <span>Khẩn cấp</span>
                                )}
                                <br />
                                {item?.process_card.includes(1) && (
                                  <span>Quan trọng</span>
                                )}
                              </div>
                            </td>
                            <td>
                              <Image src={''} alt={''} />
                              Việt
                            </td>
                            <td>
                              <Image src={''} alt={''} />
                              Việt
                            </td>
                            <td>Quá hạn</td>
                            <td className="show_date">
                              <p className="start_work">
                                {moment(item?.date_start).format('DD/MM/YYYY')}
                              </p>
                              <p className="end_work">
                                {moment(item?.date_end).format('DD/MM/YYYY')}
                              </p>
                              <div className="hover_show">
                                <p className="start_work">
                                  Thời gian bắt đầu:{' '}
                                  {moment(item?.date_start).format(
                                    'DD/MM/YYYY'
                                  )}
                                </p>
                                <p className="end_work">
                                  Thời gian kết thúc:{' '}
                                  {moment(item?.date_end).format('DD/MM/YYYY')}
                                </p>
                              </div>
                            </td>
                          </tr>
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
          <div className="tt_page" style={{ paddingTop: 20 }}>
            <Pagination
              current={1}
              total={50}
              pageSize={10}
              onChange={(page) => {
                setPage(page);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
