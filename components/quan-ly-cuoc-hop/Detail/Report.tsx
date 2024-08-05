'use client';
import React, { useEffect, useState } from 'react';

import styles from './Detail.module.css';
// import { SearchOutlined } from "@ant-design/icons";
import { UploadOutlined } from '@ant-design/icons';
import { Button, Col, message, Row, Upload, UploadProps } from 'antd';
import { GET_EXCEL, getCurrentID, getType, POST } from '@/pages/api/auth';
import Image from 'next/image';
import dayjs from 'dayjs';

const props: UploadProps = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const Report: React.FC<any> = ({
  dataAll,
  data,
  setReload,
  meetingRole,
  idMeeting,
}: {
  dataAll: any;
  data: any[];
  setReload: Function;
  meetingRole: any[];
  idMeeting: Number;
}) => {
  const [authOwn, setAuthOwn] = useState<String>('');
  const [authTakeIn, setAuthTakeIn] = useState<String>('');
  // người chủ trì
  // const userOwn = 1577142
  // const userTakeIn = 1577142
  // người tham gia
  const admin = getType() === '1';
  const userOwn = getCurrentID();
  const userTakeIn = getCurrentID();
  const handleFileProtocolUpload = (file: any) => {
    const formData = new FormData();
    formData.append('files', file);
    POST(`meetings/chi-tiet-cuoc-hop/${idMeeting}/add-protocol`, formData).then(
      (res) => {
        if (res) {
          message.success(`${file.name} được thêm thành công`);
          setReload(true);
        }
      }
    );
  };
  const formatFileSize = (bytes: any) => {
    if (bytes === 0) {
      return '0 Bytes';
    }

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  const handleDowloadProtocol = () => {};
  const handleDeleteProtocol = (file: any) => {
    POST(
      `meetings/chi-tiet-cuoc-hop/${idMeeting}/delete-protocol/${file?.id}`
    ).then((res) => {
      if (res) {
        message.success(`${file.name_file} đã được xóa thành công`);
        setReload(true);
      }
    });
  };
  useEffect(() => {
    setAuthOwn(
      meetingRole?.filter((dt: any) => dt?.role_id === 1)[0]?.permission_meet_id
    );
    setAuthTakeIn(
      meetingRole?.filter((dt: any) => dt?.role_id === 2)[0]?.permission_meet_id
    );
  }, [meetingRole]);
  const upLoad = () => {
    if (admin) {
      return (
        <Upload beforeUpload={handleFileProtocolUpload} showUploadList={false}>
          <Button
            style={{
              border: 'none',
              color: 'black',
              padding: '10px',
              background: 'none',
            }}
            icon={<UploadOutlined />}
          >
            Tải lên biên bản họp
          </Button>
        </Upload>
      );
    } else {
      if (
        dataAll?.staff_owner?.includes(userOwn.toString()) ||
        dataAll?.staff_take_in?.includes(userTakeIn.toString())
      ) {
        if (dataAll?.staff_owner?.includes(userOwn.toString())) {
          if (authOwn?.includes('2')) {
            return (
              <Upload
                beforeUpload={handleFileProtocolUpload}
                showUploadList={false}
              >
                <Button
                  style={{
                    border: 'none',
                    color: 'black',
                    padding: '10px',
                    background: 'none',
                  }}
                  icon={<UploadOutlined />}
                >
                  Tải lên biên bản họp
                </Button>
              </Upload>
            );
          }
        }
        if (dataAll?.staff_take_in?.includes(userTakeIn.toString())) {
          if (authTakeIn?.includes('2')) {
            return (
              <Upload
                beforeUpload={handleFileProtocolUpload}
                showUploadList={false}
              >
                <Button
                  style={{
                    border: 'none',
                    color: 'black',
                    padding: '10px',
                    background: 'none',
                  }}
                  icon={<UploadOutlined />}
                >
                  Tải lên biên bản họp
                </Button>
              </Upload>
            );
          }
        }
      }
    }
  };
  const view = () => {
    if (admin) {
      return (
        <Row>
          {data?.map((dt: any, index: number) => (
            <Col
              key={index}
              xxl={8}
              sm={12}
              xs={24}
              style={{
                border: '2px solid #CCCCCC',
                display: 'flex',
                padding: '5px',
              }}
            >
              <Image
                unoptimized
                style={{ margin: '20px' }}
                src="https://hungha365.com/storageimage/GV/tailieu.png"
                height={45}
                width={40}
                alt=""
              ></Image>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  width: '60%',
                }}
              >
                <div>{dt?.name_file}</div>
                <div>{formatFileSize(dt?.size_file)}</div>
                <div>
                  {dayjs.unix(dt?.created_at).format('HH:mm:ss DD/MM/YYYY')}
                </div>
                <div style={{ display: 'flex' }}>
                  <a
                    style={{
                      color: '#4c5bd4',
                      cursor: 'pointer',
                      width: 'max-content',
                      textDecoration: 'none',
                    }}
                    href={GET_EXCEL(
                      `meetings/chi-tiet-cuoc-hop/${dataAll?.id}/download-protocol/${dt?.id}`
                    )}
                  >
                    Tải xuống
                  </a>
                  <div style={{ padding: '0 5px' }}>/</div>
                  <div
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={() => handleDeleteProtocol(dt)}
                  >
                    Xóa
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      );
    } else {
      if (
        dataAll?.staff_owner?.includes(userOwn.toString()) ||
        dataAll?.staff_take_in?.includes(userTakeIn.toString())
      ) {
        if (dataAll?.staff_owner?.includes(userOwn.toString())) {
          if (authOwn?.includes('1')) {
            return (
              <Row>
                {data?.map((dt: any, index: number) => (
                  <Col
                    key={index}
                    xxl={8}
                    sm={12}
                    xs={24}
                    style={{
                      border: '2px solid #CCCCCC',
                      display: 'flex',
                      padding: '5px',
                    }}
                  >
                    <Image
                      style={{ margin: '20px' }}
                      src="https://hungha365.com/storageimage/GV/tailieu.png"
                      height={45}
                      width={40}
                      alt=""
                    ></Image>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: '60%',
                      }}
                    >
                      <div>{dt?.name_file}</div>
                      <div>{formatFileSize(dt?.size_file)}</div>
                      <div>
                        {dayjs
                          .unix(dt?.created_at)
                          .format('HH:mm:ss DD/MM/YYYY')}
                      </div>
                      <div style={{ display: 'flex' }}>
                        <div
                          style={{
                            color: '#4c5bd4',
                            cursor: 'pointer',
                            width: 'max-content',
                          }}
                        >
                          <a
                            style={{
                              color: '#4c5bd4',
                              cursor: 'pointer',
                              width: 'max-content',
                              textDecoration: 'none',
                            }}
                            href={GET_EXCEL(
                              `meetings/chi-tiet-cuoc-hop/${dataAll?.id}/download-protocol/${dt?.id}`
                            )}
                          >
                            Tải xuống
                          </a>
                        </div>
                        <div style={{ padding: '0 5px' }}>/</div>
                        <div
                          style={{ color: 'red', cursor: 'pointer' }}
                          onClick={() => handleDeleteProtocol(dt)}
                        >
                          Xóa
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            );
          }
        }
        if (dataAll?.staff_take_in?.includes(userTakeIn.toString())) {
          if (authTakeIn?.includes('1')) {
            return (
              <Row>
                {data?.map((dt: any, index: number) => (
                  <Col
                    key={index}
                    xxl={8}
                    sm={12}
                    xs={24}
                    style={{
                      border: '2px solid #CCCCCC',
                      display: 'flex',
                      padding: '5px',
                    }}
                  >
                    <Image
                      unoptimized
                      style={{ margin: '20px' }}
                      src="https://hungha365.com/storageimage/GV/tailieu.png"
                      height={45}
                      width={40}
                      alt=""
                    ></Image>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: '60%',
                      }}
                    >
                      <div>{dt?.name_file}</div>
                      <div>{formatFileSize(dt?.size_file)}</div>
                      <div>
                        {dayjs
                          .unix(dt?.created_at)
                          .format('HH:mm:ss DD/MM/YYYY')}
                      </div>
                      <div style={{ display: 'flex' }}>
                        <div
                          style={{
                            color: '#4c5bd4',
                            cursor: 'pointer',
                            width: 'max-content',
                          }}
                        >
                          <a
                            style={{
                              color: '#4c5bd4',
                              cursor: 'pointer',
                              width: 'max-content',
                              textDecoration: 'none',
                            }}
                            href={GET_EXCEL(
                              `meetings/chi-tiet-cuoc-hop/${dataAll?.id}/download-protocol/${dt?.id}`
                            )}
                          >
                            Tải xuống
                          </a>
                        </div>
                        <div style={{ padding: '0 5px' }}>/</div>
                        <div
                          style={{ color: 'red', cursor: 'pointer' }}
                          onClick={() => handleDeleteProtocol(dt)}
                        >
                          Xóa
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            );
          }
        }
      }
    }
  };
  return (
    <div className={styles.meet_ifmt_tv}>
      <div
        className={styles.title_detl_meet}
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <h4>BIÊN BẢN HỌP</h4>
        {upLoad()}
      </div>
      {view()}
    </div>
  );
};

export default Report;
