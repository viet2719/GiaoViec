import styles from './vaitro.module.css';

import React, { useState } from 'react';
import { Checkbox, Radio, Select, Space, message } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import type { SelectProps, RadioChangeEvent } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import Image from 'next/image';
import { POST } from '@/pages/api/auth';

const onChanges = (checkedValues: CheckboxValueType[]) => {
  console.log('checked = ', checkedValues);
};

export default function Themvaitro({
  setActiveKey,
  selectedColor,
  setOption,
}: {
  setActiveKey: Function;
  selectedColor: string;
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
  const [nameError, setNameError] = useState('');
  const [motaError, setMotaError] = useState('');
  const [duanError, setDuanError] = useState('');
  const [duanQTError, setDuanQTError] = useState('');
  const [tailieuError, setTailieuError] = useState('');
  const [tailieuQTError, setTailieuQTError] = useState('');
  const [diadiemError, setDiaDiemError] = useState('');
  const [phonghopError, setPhongHopError] = useState('');
  const [cuochopError, setCuocHopError] = useState('');
  const [congvieccuatoiError, setCongViecCuaToiError] = useState('');
  const [baocaoquytrinhError, setBaoCaoQuyTrinhError] = useState('');
  const [baocaoduanError, setBaoCaoDuAnError] = useState('');
  const [dulieudaxoaError, setDuLieuDaXoaError] = useState('');
  const [phanquyenvaitroError, setPhanQuyenVaiTroError] = useState('');
  const [phanquyennguoidungError, setPhanQuyenNguoiDungError] = useState('');
  const [caidatError, setCaiDatError] = useState('');

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
      content: 'Thêm vai trò thành công',
    });
  };
  const validateForm = () => {
    let isValid = true;
    setNameError('');
    setMotaError('');
    setTailieuError('');
    setDuanQTError('');
    setDuanError('');
    if (name.trim() === '') {
      setNameError('Tên vai trò không được trống*');
      isValid = false;
    }
    if (mota.trim() === '') {
      setMotaError('Mô tả vai trò không được trống*');
      isValid = false;
    }
    if (!duanDscv || duanDscv.length === 0) {
      setDuanError('Vui lòng chọn ít nhất một quyền*');
      isValid = false;
    }
    if (!duanQuytrinh || duanQuytrinh.length === 0) {
      setDuanQTError('Vui lòng chọn ít nhất một quyền*');
      isValid = false;
    }
    if (!tailieucongviec || tailieucongviec.length === 0) {
      setTailieuError('Vui lòng chọn ít nhất một quyền*');
      isValid = false;
    }
    if (!tailieucuatoi || tailieucuatoi.length === 0) {
      setTailieuQTError('Vui lòng chọn ít nhất một quyền*');
      isValid = false;
    }
    if (!diadiem || diadiem.length === 0) {
      setDiaDiemError('Vui lòng chọn ít nhất một quyền*');
      isValid = false;
    }
    if (!phonghop || phonghop.length === 0) {
      setPhongHopError('Vui lòng chọn ít nhất một quyền*');
      isValid = false;
    }
    if (!cuochop || cuochop.length === 0) {
      setCuocHopError('Vui lòng chọn ít nhất một quyền*');
      isValid = false;
    }
    if (!congvieccuatoi || congvieccuatoi.length === 0) {
      setCongViecCuaToiError('Vui lòng chọn ít nhất một quyền*');
      isValid = false;
    }
    if (!baocaoquytrinh || baocaoquytrinh.length === 0) {
      setBaoCaoQuyTrinhError('Vui lòng chọn ít nhất một quyền*');
      isValid = false;
    }
    if (!baocaoduan || baocaoduan.length === 0) {
      setBaoCaoDuAnError('Vui lòng chọn ít nhất một quyền*');
      isValid = false;
    }
    if (!dulieudaxoa || dulieudaxoa.length === 0) {
      setDuLieuDaXoaError('Vui lòng chọn ít nhất một quyền*');
      isValid = false;
    }
    if (!phanquyenvaitro || phanquyenvaitro.length === 0) {
      setPhanQuyenVaiTroError('Vui lòng chọn ít nhất một quyền*');
      isValid = false;
    }
    if (!phanquyennguoidung || phanquyennguoidung.length === 0) {
      setPhanQuyenNguoiDungError('Vui lòng chọn ít nhất một quyền*');
      isValid = false;
    }
    if (!caidat || caidat.length === 0) {
      setCaiDatError('Vui lòng chọn ít nhất một quyền*');
      isValid = false;
    }

    return isValid;
  };

  const handleSave = () => {
    if (validateForm()) {
      POST('roles/quan-ly-vai-tro/add', {
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
    }
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
                Thêm vai trò
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
              <span className="error-message" style={{ color: 'red' }}>
                {nameError}
              </span>

              <div className={styles.title1}>
                <p className={styles.name}>Mô tả</p>
                <input
                  type="text"
                  placeholder="Nhập mô tả"
                  value={mota}
                  onChange={(e) => setMota(e.target.value)}
                />
                <span className="error-message" style={{ color: 'red' }}>
                  {motaError}
                </span>
              </div>
              <div className={styles.title}>
                <p className={styles.name}>Quản lý dự án</p>
                <div className={styles.box}>
                  <div className={`boxvaitro ${styles.quanlyda}`}>
                    <p className={styles.name1}>Theo danh sách công việc</p>
                    <p className={styles.name1}>Theo danh quy trình</p>
                  </div>
                  <div className={`boxvaitro ${styles.quanlyda}`}>
                    <span className="error-message" style={{ color: 'red' }}>
                      {duanError}
                    </span>
                    <Select
                      style={{ marginBottom: '30px' }}
                      mode="multiple"
                      size={size}
                      placeholder="Chọn quyền"
                      onChange={(selectedValues) =>
                        handleSelectChange('duan_dscv', selectedValues)
                      }
                      options={options}
                    />
                    <span className="error-message" style={{ color: 'red' }}>
                      {duanQTError}
                    </span>
                    <Select
                      style={{ marginBottom: '30px' }}
                      mode="multiple"
                      size={size}
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
                    <span className="error-message" style={{ color: 'red' }}>
                      {tailieuError}
                    </span>
                    <Select
                      style={{ marginBottom: '30px' }}
                      mode="multiple"
                      size={size}
                      placeholder="Chọn quyền"
                      onChange={(selectedValues) =>
                        handleSelectChange('tailieucongviec', selectedValues)
                      }
                      options={options}
                    />
                    <span className="error-message" style={{ color: 'red' }}>
                      {tailieuQTError}
                    </span>
                    <Select
                      style={{ marginBottom: '30px' }}
                      mode="multiple"
                      size={size}
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
                    <span className="error-message" style={{ color: 'red' }}>
                      {diadiemError}
                    </span>
                    <Select
                      style={{ marginBottom: '30px' }}
                      mode="multiple"
                      size={size}
                      placeholder="Chọn quyền"
                      onChange={(selectedValues) =>
                        handleSelectChange('diadiem', selectedValues)
                      }
                      options={options}
                    />
                    <span className="error-message" style={{ color: 'red' }}>
                      {phonghopError}
                    </span>
                    <Select
                      style={{ marginBottom: '30px' }}
                      mode="multiple"
                      size={size}
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
                    <span className="error-message" style={{ color: 'red' }}>
                      {cuochopError}
                    </span>
                    <Select
                      style={{ marginBottom: '30px' }}
                      mode="multiple"
                      size={size}
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
                    <span className="error-message" style={{ color: 'red' }}>
                      {congvieccuatoiError}
                    </span>
                    <Select
                      style={{ marginBottom: '30px' }}
                      mode="multiple"
                      size={size}
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
                    <span className="error-message" style={{ color: 'red' }}>
                      {baocaoquytrinhError}
                    </span>
                    <Select
                      style={{ marginBottom: '30px' }}
                      mode="multiple"
                      size={size}
                      placeholder="Chọn quyền"
                      onChange={(selectedValues) =>
                        handleSelectChange('baocao_quytrinh', selectedValues)
                      }
                      options={options}
                    />
                    <span className="error-message" style={{ color: 'red' }}>
                      {baocaoduanError}
                    </span>
                    <Select
                      style={{ marginBottom: '30px' }}
                      mode="multiple"
                      size={size}
                      placeholder="Chọn quyền"
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
                    <span className="error-message" style={{ color: 'red' }}>
                      {dulieudaxoaError}
                    </span>
                    <Select
                      style={{ marginBottom: '30px' }}
                      mode="multiple"
                      size={size}
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
                    <span className="error-message" style={{ color: 'red' }}>
                      {phanquyenvaitroError}
                    </span>
                    <Select
                      style={{ marginBottom: '30px' }}
                      mode="multiple"
                      size={size}
                      placeholder="Chọn quyền"
                      onChange={(selectedValues) =>
                        handleSelectChange('phanquyen_vaitro', selectedValues)
                      }
                      options={options}
                    />
                    <span className="error-message" style={{ color: 'red' }}>
                      {phanquyennguoidungError}
                    </span>
                    <Select
                      style={{ marginBottom: '30px' }}
                      mode="multiple"
                      size={size}
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
                    <span className="error-message" style={{ color: 'red' }}>
                      {caidatError}
                    </span>
                    <Select
                      style={{ marginBottom: '30px' }}
                      mode="multiple"
                      size={size}
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
                    handleSave();
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
