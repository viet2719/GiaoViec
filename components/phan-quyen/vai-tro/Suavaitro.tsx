import styles from './vaitro.module.css';

import React, { useEffect, useState } from 'react';
import { Checkbox, Radio, Select, Space, message } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import type { SelectProps, RadioChangeEvent } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import Image from 'next/image';
import Alert from './Alert/Sua';
import { POST } from '@/pages/api/auth';

const onChanges = (checkedValues: CheckboxValueType[]) => {
  console.log('checked = ', checkedValues);
};

export default function SuaVaiTro({
  setActiveKey,
  selectedColor,
  record,
  setData,
  setOption,
}: {
  setActiveKey: Function;
  selectedColor: string;
  record: any;
  setData: any;
  setOption: Function;
}) {
  const renderApplyKey = () => {
    // setActiveKey('vai-tro');
    setOption(0);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [size, setSize] = useState<SizeType>('middle');
  const handleChange = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
  };
  const options: SelectProps['options'] = [
    {
      value: '1',
      label: 'Xem',
      width: '100px',
    },
    {
      value: '2',
      label: 'Thêm',
    },
    {
      value: '3',
      label: 'Sửa',
    },
    {
      value: '4',
      label: 'Xóa',
    },
  ];
  const [duanDscv, setDuanDscv] = useState<number[]>([]);
  const [duanQuytrinh, setDuanQuytrinh] = useState<number[]>([]);
  const [tailieucongviec, setTailieucongviec] = useState<number[]>([]);
  const [tailieucuatoi, setTailieucuatoi] = useState<number[]>([]);
  const [diadiem, setDiaDiem] = useState<number[]>([]);
  const [phonghop, setPhongHop] = useState<number[]>([]);
  const [cuochop, setCuocHop] = useState<number[]>([]);
  const [congvieccuatoi, setCongViecCuaToi] = useState<number[]>([]);
  const [baocaoquytrinh, setBaoCaoQuyTrinh] = useState<number[]>([]);
  const [baocaoduan, setBaoCaoDuAn] = useState<number[]>([]);
  const [dulieudaxoa, setDuLieuDaXoa] = useState<number[]>([]);
  const [phanquyenvaitro, setPhanQuyenVaiTro] = useState<number[]>([]);
  const [phanquyennguoidung, setPhanQuyenNguoiDung] = useState<number[]>([]);
  const [caidat, setCaiDat] = useState<number[]>([]);

  const [name, setName] = useState('');
  const [mota, setMota] = useState('');
  useEffect(() => {
    setName(record?.name);
    setMota(record?.mota);
    setDuanDscv(record?.duan_dscv !== '' ? record?.duan_dscv.split(',') : []);
    setDuanQuytrinh(
      record?.duan_quytrinh !== '' ? record?.duan_quytrinh?.split(',') : []
    );
    setTailieucongviec(
      record?.tailieucongviec !== '' ? record?.tailieucongviec?.split(',') : []
    );
    setTailieucuatoi(
      record?.tailieucuatoi !== '' ? record?.tailieucuatoi?.split(',') : []
    );
    setDiaDiem(record?.diadiem !== '' ? record?.diadiem?.split(',') : []);
    setPhongHop(record?.phonghop !== '' ? record?.phonghop?.split(',') : []);
    setCuocHop(record?.cuochop !== '' ? record?.cuochop?.split(',') : []);
    setCongViecCuaToi(
      record?.congvieccuatoi !== '' ? record?.congvieccuatoi?.split(',') : []
    );
    setBaoCaoQuyTrinh(
      record?.baocao_quytrinh !== '' ? record?.baocao_quytrinh?.split(',') : []
    );
    setBaoCaoDuAn(
      record?.baocao_duan !== '' ? record?.baocao_duan?.split(',') : []
    );
    setDuLieuDaXoa(
      record?.dulieudaxoa !== '' ? record?.dulieudaxoa?.split(',') : []
    );
    setPhanQuyenVaiTro(
      record?.phanquyen_vaitro !== ''
        ? record?.phanquyen_vaitro?.split(',')
        : []
    );
    setPhanQuyenNguoiDung(
      record?.phanquyen_nguoidung !== ''
        ? record?.phanquyen_nguoidung?.split(',')
        : []
    );
    setCaiDat(record?.caidat !== '' ? record?.caidat?.split(',') : []);
  }, [record]);
  const handleSelectChange = (fieldName: any, selectedValues: any) => {
    switch (fieldName) {
      case 'duan_dscv':
        setDuanDscv(selectedValues);
        break;
      case 'duan_quytrinh':
        setDuanQuytrinh(selectedValues);
        break;
      case 'tailieucongviec':
        setTailieucongviec(selectedValues);
        break;
      case 'tailieucuatoi':
        setTailieucuatoi(selectedValues);
        break;
      case 'diadiem':
        setDiaDiem(selectedValues);
        break;
      case 'phonghop':
        setPhongHop(selectedValues);
        break;
      case 'cuochop':
        setCuocHop(selectedValues);
        break;
      case 'congvieccuatoi':
        setCongViecCuaToi(selectedValues);
        break;
      case 'baocao_quytrinh':
        setBaoCaoQuyTrinh(selectedValues);
        break;
      case 'baocao_duan':
        setBaoCaoDuAn(selectedValues);
        break;
      case 'dulieudaxoa':
        setDuLieuDaXoa(selectedValues);
        break;
      case 'phanquyen_vaitro':
        setPhanQuyenVaiTro(selectedValues);
        break;
      case 'phanquyen_nguoidung':
        setPhanQuyenNguoiDung(selectedValues);
        break;
      case 'caidat':
        setCaiDat(selectedValues);
        break;

      default:
        break;
    }
  };
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Sửa vai trò thành công',
    });
  };
  const handleEdit = () => {
    POST(`roles/quan-ly-vai-tro/edit/${record?.id}`, {
      name: name,
      mota: mota,
      duan_dscv: duanDscv.join(','),
      duan_quytrinh: duanQuytrinh.join(','),
      tailieucongviec: tailieucongviec.join(','),
      tailieucuatoi: tailieucuatoi.join(','),
      diadiem: diadiem.join(','),
      phonghop: phonghop.join(','),
      cuochop: cuochop.join(','),
      congvieccuatoi: congvieccuatoi.join(','),
      baocao_quytrinh: baocaoquytrinh.join(','),
      baocao_duan: baocaoduan.join(','),
      dulieudaxoa: dulieudaxoa.join(','),
      phanquyen_vaitro: phanquyenvaitro.join(','),
      phanquyen_nguoidung: phanquyennguoidung.join(','),
      caidat: caidat.join(','),
    })
      .then((data) => {
        console.log('Phản hồi từ API:', data);
        success();
      })

      .then(() => {
        setTimeout(() => {
          renderApplyKey();
        }, 1000);
      })
      .catch((error) => {
        console.error('Lỗi khi gửi yêu cầu API:', error);
      });
  };
  return (
    <div>
      <div className="margin_20px">
        <div className="box_work">
          <div id="list_work">
            <div className="text_work1" onClick={renderApplyKey}>
              <h4 className={`${styles.name_list} ${selectedColor}`}>
                <Image
                  unoptimized
                  width={7}
                  height={14}
                  alt=""
                  src="https://hungha365.com/storageimage/GV/img15.png"
                  style={{ marginRight: '5px' }}
                />
                Sửa vai trò
              </h4>
            </div>
            <div className={styles.noidung}>
              <div className={styles.title1}>
                <p className={styles.name}>
                  Tên vai trò <span>*</span>
                </p>
                <input
                  type="text"
                  placeholder="Nhập tên vai trò"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={styles.title1}>
                <p className={styles.name}>Mô tả</p>
                <input
                  type="text"
                  placeholder="Nhập mô tả"
                  value={mota}
                  onChange={(e) => setMota(e.target.value)}
                />
              </div>
              <div className={styles.title}>
                <p className={styles.name}>Quản lý dự án</p>
                <div className={styles.box}>
                  <div className={`boxvaitro ${styles.quanlyda}`}>
                    <p className={styles.name1}>Theo danh sách công việc</p>
                    <p className={styles.name1}>Theo danh quy trình</p>
                  </div>
                  <div className={`boxvaitro ${styles.quanlyda}`}>
                    <Select
                      style={{ marginBottom: '30px' }}
                      mode="multiple"
                      size={size}
                      value={duanDscv ? duanDscv : []}
                      placeholder="Chọn quyền"
                      onChange={(selectedValues) =>
                        handleSelectChange('duan_dscv', selectedValues)
                      }
                      options={options}
                    />

                    <Select
                      style={{ marginBottom: '30px' }}
                      mode="multiple"
                      size={size}
                      value={duanQuytrinh ? duanQuytrinh : []}
                      placeholder="Chọn quyền"
                      onChange={(selectedValues) =>
                        handleSelectChange('duan_quytrinh', selectedValues)
                      }
                      options={options}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.title}>
                <p className={styles.name}>Quản lý tài liệu</p>
                <div className={styles.box}>
                  <div className={`boxvaitro ${styles.quanlyda}`}>
                    <p className={styles.name1}>Tài liệu công việc</p>
                    <p className={styles.name1}>Tài liệu của tôi</p>
                  </div>
                  <div className={`boxvaitro ${styles.quanlyda}`}>
                    <Select
                      style={{ marginBottom: '30px' }}
                      mode="multiple"
                      size={size}
                      value={tailieucongviec ? tailieucongviec : ''}
                      placeholder="Chọn quyền"
                      onChange={(selectedValues) =>
                        handleSelectChange('tailieucongviec', selectedValues)
                      }
                      options={options}
                    />
                    <Select
                      style={{ marginBottom: '30px' }}
                      mode="multiple"
                      size={size}
                      value={tailieucuatoi ? tailieucuatoi : ''}
                      placeholder="Chọn quyền"
                      onChange={(selectedValues) =>
                        handleSelectChange('tailieucuatoi', selectedValues)
                      }
                      options={options}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.title}>
                <p className={styles.name}>Quản lý phòng họp</p>
                <div className={styles.box}>
                  <div className={`boxvaitro ${styles.quanlyda}`}>
                    <p className={styles.name1}>Địa điểm</p>
                    <p className={styles.name1}>Phòng họp</p>
                  </div>
                  <div className={`boxvaitro ${styles.quanlyda}`}>
                    <Select
                      style={{ marginBottom: '30px' }}
                      mode="multiple"
                      size={size}
                      value={diadiem ? diadiem : ''}
                      placeholder="Chọn quyền"
                      onChange={(selectedValues) =>
                        handleSelectChange('diadiem', selectedValues)
                      }
                      options={options}
                    />
                    <Select
                      style={{ marginBottom: '30px' }}
                      mode="multiple"
                      size={size}
                      value={phonghop ? phonghop : ''}
                      placeholder="Chọn quyền"
                      onChange={(selectedValues) =>
                        handleSelectChange('phonghop', selectedValues)
                      }
                      options={options}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.title}>
                <p className={styles.name}>Quản lý cuộc họp </p>
                <div className={styles.box}>
                  <div className={`boxvaitro ${styles.quanlyda}`}>
                    <p className={styles.name1}>Quản lý cuộc họp</p>
                  </div>
                  <div className={`boxvaitro ${styles.quanlyda}`}>
                    <Select
                      style={{ marginBottom: '30px' }}
                      mode="multiple"
                      size={size}
                      value={cuochop ? cuochop : ''}
                      placeholder="Chọn quyền"
                      onChange={(selectedValues) =>
                        handleSelectChange('cuochop', selectedValues)
                      }
                      options={[
                        {
                          value: '1',
                          label: 'Xem',
                          width: '100px',
                        },
                        {
                          value: '2',
                          label: 'Thêm',
                        },
                        {
                          value: '3',
                          label: 'Sửa',
                        },
                        {
                          value: '4',
                          label: 'Xóa',
                        },
                        {
                          value: '7',
                          label: 'Xem cuộc họp người khác',
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.title}>
                <p className={styles.name}>Công việc của tôi</p>
                <div className={styles.box}>
                  <div className={`boxvaitro ${styles.quanlyda}`}>
                    <p className={styles.name1}>Công việc của tôi</p>
                  </div>
                  <div className={`boxvaitro ${styles.quanlyda}`}>
                    <Select
                      style={{ marginBottom: '30px' }}
                      mode="multiple"
                      size={size}
                      value={congvieccuatoi ? congvieccuatoi : ''}
                      placeholder="Chọn quyền"
                      onChange={(selectedValues) =>
                        handleSelectChange('congvieccuatoi', selectedValues)
                      }
                      options={options}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.title}>
                <p className={styles.name}>Báo cáo</p>
                <div className={styles.box}>
                  <div className={`boxvaitro ${styles.quanlyda}`}>
                    <p className={styles.name1}>Theo quy trình</p>
                    <p className={styles.name1}>Theo dự án</p>
                  </div>
                  <div className={`boxvaitro ${styles.quanlyda}`}>
                    <Select
                      style={{ marginBottom: '30px' }}
                      mode="multiple"
                      size={size}
                      value={baocaoquytrinh ? baocaoquytrinh : ''}
                      placeholder="Chọn quyền"
                      onChange={(selectedValues) =>
                        handleSelectChange('baocao_quytrinh', selectedValues)
                      }
                      options={options}
                    />
                    <Select
                      style={{ marginBottom: '30px' }}
                      mode="multiple"
                      size={size}
                      placeholder="Chọn quyền"
                      value={baocaoduan ? baocaoduan : ''}
                      onChange={(selectedValues) =>
                        handleSelectChange('baocao_duan', selectedValues)
                      }
                      options={options}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.title}>
                <p className={styles.name}>Dữ liệu xoá gần đây</p>
                <div className={styles.box}>
                  <div className={`boxvaitro ${styles.quanlyda}`}>
                    <p className={styles.name1}>Dữ liệu xoá gần đây</p>
                  </div>
                  <div className={`boxvaitro ${styles.quanlyda}`}>
                    <Select
                      style={{ marginBottom: '30px' }}
                      mode="multiple"
                      size={size}
                      value={dulieudaxoa ? dulieudaxoa : ''}
                      placeholder="Chọn quyền"
                      onChange={(selectedValues) =>
                        handleSelectChange('dulieudaxoa', selectedValues)
                      }
                      options={[
                        {
                          value: '1',
                          label: 'Xem',
                          width: '100px',
                        },
                        {
                          value: '2',
                          label: 'Khôi phục',
                        },
                        {
                          value: '3',
                          label: 'Xóa',
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.title}>
                <p className={styles.name}>Phân quyền</p>
                <div className={styles.box}>
                  <div className={`boxvaitro ${styles.quanlyda}`}>
                    <p className={styles.name1}>Vai trò</p>
                    <p className={styles.name1}>Người dùng</p>
                  </div>
                  <div className={`boxvaitro ${styles.quanlyda}`}>
                    <Select
                      style={{ marginBottom: '30px' }}
                      mode="multiple"
                      size={size}
                      value={phanquyenvaitro ? phanquyenvaitro : ''}
                      placeholder="Chọn quyền"
                      onChange={(selectedValues) =>
                        handleSelectChange('phanquyen_vaitro', selectedValues)
                      }
                      options={options}
                    />
                    <Select
                      style={{ marginBottom: '30px' }}
                      mode="multiple"
                      size={size}
                      value={phanquyennguoidung ? phanquyennguoidung : ''}
                      placeholder="Chọn quyền"
                      onChange={(selectedValues) =>
                        handleSelectChange(
                          'phanquyen_nguoidung',
                          selectedValues
                        )
                      }
                      options={[
                        {
                          value: '1',
                          label: 'Xem',
                          width: '100px',
                        },
                        {
                          value: '2',
                          label: 'Cập nhật quyền',
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.title}>
                <p className={styles.name}>Cài đặt</p>
                <div className={styles.box}>
                  <div className={`boxvaitro ${styles.quanlyda}`}>
                    <p className={styles.name1}>Cài đặt</p>
                  </div>
                  <div className={`boxvaitro ${styles.quanlyda}`}>
                    <Select
                      style={{ marginBottom: '30px' }}
                      mode="multiple"
                      size={size}
                      value={caidat ? caidat : ''}
                      placeholder="Chọn quyền"
                      onChange={(selectedValues) =>
                        handleSelectChange('caidat', selectedValues)
                      }
                      options={options}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.button}>
                <button className={`${styles.huy}`} onClick={renderApplyKey}>
                  Hủy
                </button>
                {contextHolder}
                <button
                  className={`${styles.ok} ${selectedColor}`}
                  onClick={() => {
                    handleEdit();
                  }}
                >
                  Lưu
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
