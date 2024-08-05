'use client';
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, List, Avatar, Row, Col } from 'antd';
import styles from './Detail.module.css';
import dayjs from 'dayjs';
import { GET_EXCEL, POST } from '@/pages/api/auth';
import Image from 'next/image';

const Thongtinchung = ({
  dataChitiet,
  setReload,
}: {
  dataChitiet: any;
  setReload: Function;
}) => {
  const handleFileAttUpload = (file: any) => {
    const formData = new FormData();
    formData.append('files', file);
    POST(
      `meetings/chi-tiet-cuoc-hop/${window.sessionStorage.getItem(
        'id_chi_tiet_cuoc_hop'
      )}/add-attachments`,
      formData
    ).then((res) => {
      if (res) {
        message.success(`${file.name} tải lên thành công`);
        setReload(true);
      }
    });
  };
  const handleDowloadAtt = () => {};
  const handleDeleteAtt = (file: any) => {
    POST(
      `meetings/chi-tiet-cuoc-hop/${window.sessionStorage.getItem(
        'id_chi_tiet_cuoc_hop'
      )}/delete-attachments/${file?.id}`
    ).then((res) => {
      if (res) {
        message.success(`${file.name_file} đã được xóa thành công`);
        setReload(true);
      }
    });
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
  const data = [
    {
      title: 'Mô tả',
      description: dataChitiet?.content,
    },
    {
      title: 'Thời gian bắt đầu',
      description: dayjs(dataChitiet?.date_start).format('DD/MM/YYYY'),
    },
    {
      title: 'Thời lượng',
      description: `${dataChitiet?.time_estimated} phút`,
    },
    {
      title: 'Địa điểm',
      description: dataChitiet?.name_room || dataChitiet?.address_links,
    },
    {
      title: 'Tệp đính kèm',
      description: (
        <Upload beforeUpload={handleFileAttUpload} showUploadList={false}>
          <Button
            style={{ border: 'none', color: 'black', background: 'none' }}
            icon={<UploadOutlined />}
          >
            Tải lên tệp đính kèm
          </Button>
        </Upload>
      ),
    },
    {
      title: 'no',
      description: (
        <Row>
          {dataChitiet?.attMeeting?.map((dt: any, index: number) => {
            return (
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
                        `meetings/chi-tiet-cuoc-hop/${dataChitiet?.id}/download-attachments/${dt?.id}`
                      )}
                    >
                      Tải xuống
                    </a>
                    <div style={{ padding: '0 5px' }}>/</div>
                    <div
                      style={{ color: 'red', cursor: 'pointer' }}
                      onClick={() => handleDeleteAtt(dt)}
                    >
                      Xóa
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      ),
    },
  ];
  return (
    <div className={styles.meet_ifmt_tv}>
      <div className={styles.title_detl_meet}>
        <h4>THÔNG TIN CHUNG</h4>
      </div>
      <div className={styles.detl_infm_meet}>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item style={{ display: 'flex', padding: '20px' }}>
              <List.Item.Meta
                title={
                  item.title !== 'no' ? (
                    <b style={{ color: '#474747' }}>{item.title}:</b>
                  ) : (
                    <></>
                  )
                }
                description={
                  <p style={{ color: '#474747', margin: '0' }}>
                    {item.description}
                  </p>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default Thongtinchung;
