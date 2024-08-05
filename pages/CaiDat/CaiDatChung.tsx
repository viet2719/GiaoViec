import React, { useEffect, useState } from 'react';
import styles from './CaiDat.module.css';
import Image from 'next/image';
import { Checkbox, message } from 'antd';
import { Modal, Input, Button } from 'antd';
import ModeChinhMau from './model-chinh-mau';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { POST, getType } from '../api/auth';

const YourComponent = ({
  isHasRole,
  setSelectedColor,
  selectedColor,
}: {
  isHasRole: boolean;
  setSelectedColor: Function;
  selectedColor: string;
}) => {
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [editedInfo, setEditedInfo] = useState({
    companyName: 'Công ty Cổ phần Thanh toán Hưng Hà',
    quyMoNhanSu: '24',
    diaChi: 'Trần Nguyên Đán - Hoàng Mai',
    sdt: '0348787777',
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };
  const handleColorChange = (newColor: any) => {
    POST('cai-dat-sau-dang-nhap/sua-background', {
      background: newColor,
      type: getType(),
    }).then((response) => {
      setSelectedColor(response?.data?.background);
    });
  };
  const [isEmptyFields, setIsEmptyFields] = useState({
    companyName: false,
    diaChi: false,
    sdt: false,
  });
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Sửa vai thông tin công ty thành công',
    });
  };
  const saveEditedInfo = () => {
    POST('cai-dat-sau-dang-nhap-quan-ly/cap-nhat-thong-tin-cong-ty', {
      userName: name,
      address: address,
      phone: phone,
    }).then((res) => {
      closeModal();
      success();
    });
  };

  const [selectedLanguage, setSelectedLanguage] = useState('A'); // Lưu giá trị của checkbox được chọn

  const handleLanguageChange = (value: any) => {
    setSelectedLanguage(value);
  };

  // Thêm biến trạng thái để kiểm soát biểu tượng
  const [isCaretUp, setIsCaretUp] = useState(false);

  const toggleInfoVisibility = () => {
    setIsInfoVisible(!isInfoVisible);
    // Thay đổi trạng thái của biểu tượng
    setIsCaretUp(!isCaretUp);
  };
  const [data, setData] = useState<any>();
  const fetchApiData = () => {
    POST('cai-dat-sau-dang-nhap-nhan-vien', {}).then((response) => {
      setData(response?.data);
    });
  };
  useEffect(() => {
    fetchApiData();
  }, []);

  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [scale, setScale] = useState();
  const [address, setAddress] = useState();

  useEffect(() => {
    setName(data?.ThongTinCongTy?.userName);
    setPhone(data?.ThongTinCongTy?.phone);
    setEmail(data?.ThongTinCongTy?.emailContact);
    setScale(data?.ThongTinCongTy?.inForCompany?.com_size);
    setAddress(data?.ThongTinCongTy?.address);
  }, [data]);

  return (
    <div>
      <div className={styles.sett_wtt}>
        <div className={styles.infmt_ttct}>
          {isHasRole ? (
            <div className={styles.inf_tto}>
              <div
                className={styles.inf_dropdown}
                onClick={toggleInfoVisibility}
              >
                <h3
                  className={styles.inf_dropdown_h}
                  style={{ fontWeight: 'bold' }}
                >
                  Thông tin công ty
                  {isCaretUp ? (
                    <CaretUpOutlined style={{ padding: '3px' }} />
                  ) : (
                    <CaretDownOutlined style={{ padding: '3px' }} />
                  )}
                </h3>
                <span className={styles.aft_bef}></span>
              </div>

              <p
                className={`${styles.edit_tt} ${styles.uptt_btx}`}
                onClick={openModal}
              >
                <span className={`${styles.inf_md_one} ${styles.plus} d-flex `}>
                  Chỉnh sửa
                  <div>
                    <Image
                      unoptimized
                      alt=""
                      width={14}
                      height={14}
                      src="https://hungha365.com/storageimage/GV/plus.png"
                      style={{
                        padding: '0',
                        marginLeft: '2px',
                        marginBottom: '4px',
                      }}
                    ></Image>
                  </div>
                </span>
              </p>
            </div>
          ) : (
            <div className={styles.inf_tto}>
              <div
                className={styles.inf_dropdown}
                onClick={toggleInfoVisibility}
              >
                <h3
                  className={styles.inf_dropdown_h}
                  style={{ fontWeight: 'bold' }}
                >
                  Thông tin công ty
                  {isCaretUp ? (
                    <CaretUpOutlined style={{ padding: '3px' }} />
                  ) : (
                    <CaretDownOutlined style={{ padding: '3px' }} />
                  )}
                </h3>
                <span className={styles.aft_bef}></span>
              </div>
            </div>
          )}

          {isInfoVisible && (
            <div className={`${styles.inf_iclu} `}>
              <div
                className={`${styles.inf_tct} ${styles.inf_tto}`}
                style={{ fontWeight: 'bold' }}
              >
                <h4 style={{ fontWeight: 'bold' }}> {name}</h4>
                <div className={styles.inf_tto_onw}>
                  <h4 className={styles.h4_1} style={{ fontWeight: 'bold' }}>
                    Quy mô nhân sự:
                  </h4>
                  <p style={{ margin: '-4px 0px 5px 0px' }}> {scale}</p>
                </div>
              </div>
              <div className={`${styles.inf_lvhd} ${styles.inf_tto}`}>
                <h4 style={{ fontWeight: 'bold' }}>
                  Địa chỉ: <span>{address}</span>
                </h4>
                <div className={styles.inf_tto_onw} style={{ display: 'flex' }}>
                  <h4 style={{ fontWeight: 'bold' }}>SĐT:</h4>
                  <p style={{ margin: '-5px 0px 5px 0px' }}>{phone}</p>
                </div>
              </div>
            </div>
          )}

          <Modal
            title={
              <div className={selectedColor}> Cập nhật thông tin công ty</div>
            }
            open={isModalVisible}
            onCancel={closeModal}
          >
            <form className="infmt_form infm_valif " noValidate>
              <div className="form-group d-flex " style={{ margin: '10px' }}>
                <label style={{ width: '50%' }}>Tên công ty</label>
                <Input
                  name="companyName"
                  value={name}
                  onChange={(e: any) => setName(e.target.value)}
                  required
                />
              </div>

              {isEmptyFields.companyName && (
                <p style={{ color: 'red' }}>Không được để trống</p>
              )}
              <div className="form-group d-flex" style={{ margin: '10px' }}>
                <label style={{ width: '50%' }}>Quy mô nhân sự</label>
                <p className="count_numb">{scale}</p>
              </div>
              <div className="form-group d-flex" style={{ margin: '10px' }}>
                <label style={{ width: '50%' }}>SĐT</label>
                <Input
                  name="sdt"
                  value={phone}
                  onChange={(e: any) => setPhone(e.target.value)}
                  onInput={(e) => {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /[^0-9]/g,
                      ''
                    );
                  }}
                  required
                />
              </div>
              {isEmptyFields.sdt && (
                <p style={{ color: 'red' }}>Không được để trống</p>
              )}
              <div className="form-group d-flex" style={{ margin: '10px' }}>
                <label style={{ width: '50%' }}>Địa chỉ</label>
                <Input
                  name="diaChi"
                  value={address}
                  onChange={(e: any) => setAddress(e.target.value)}
                  required
                />
              </div>
              {isEmptyFields.diaChi && (
                <p style={{ color: 'red' }}>Không được để trống</p>
              )}
            </form>
            {contextHolder}
            <div
              style={{
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'space-around',
              }}
            >
              <Button
                onClick={closeModal}
                style={{ color: 'white', backgroundColor: '#FFA800' }}
                className={selectedColor}
              >
                Huỷ
              </Button>
              <Button
                key="save"
                type="primary"
                onClick={saveEditedInfo}
                style={{
                  color: 'white',
                  borderRadius: '5px',
                  padding: '9px 20px',
                }}
                className={selectedColor}
              >
                Lưu thông tin
              </Button>
            </div>
          </Modal>
        </div>
        <div
          className={`${styles.infmt_ttct} ${styles.infmt_lgg} ${styles.lgf_flex} ${styles.ngon_ngu}`}
        >
          <h4 className={styles.title_lgg} style={{ fontWeight: 'bold' }}>
            Ngôn ngữ:
          </h4>

          <div className={`${styles.lgg_vn} ${styles.lgg_ve}`}>
            <div className={styles.lgg_check}>
              {/* <input type="radio" name="ve_language" value="" />
              <span className={styles.check_radio}></span> */}
              <Checkbox
                value="A"
                checked={selectedLanguage === 'A'}
                onChange={() => handleLanguageChange('A')}
              >
                Tiếng Việt (Vietnamese)
              </Checkbox>

              <Image
                unoptimized
                width={20}
                height={20}
                src="https://hungha365.com/storageimage/GV/vn.png"
                alt=""
              />
            </div>
          </div>
          <div className={`${styles.lgg_el} ${styles.lgg_ve}`}>
            <div className={styles.lgg_check}>
              {/* <input type="radio" name="ve_language" value="" />
              <span className={styles.check_radio}></span> */}
              <Checkbox
                value="B"
                checked={selectedLanguage === 'B'}
                onChange={() => handleLanguageChange('B')}
              >
                Tiếng Anh (English)
              </Checkbox>

              <Image
                unoptimized
                width={20}
                height={20}
                src="https://hungha365.com/storageimage/GV/el.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div
          className={`${styles.infmt_ttct} ${styles.infmt_gd} ${styles.lgf_flex}`}
        >
          <h4 className={styles.title_lgg} style={{ fontWeight: 'bold' }}>
            Giao diện:
          </h4>

          <p
            className={styles.inf_md}
            data-bg="remove_class"
            onClick={() => handleColorChange('bgr_alt0')}
          >
            <span className={`${styles.inf_md_one} ${styles.plus_1} d-flex `}>
              Mặc định
              <div>
                <Image
                  unoptimized
                  width={14}
                  height={14}
                  alt=""
                  src="https://hungha365.com/storageimage/GV/defual.png"
                  style={{
                    padding: '0',
                    marginLeft: '2px',
                    marginBottom: '4px',
                  }}
                ></Image>
              </div>
            </span>
          </p>

          <ModeChinhMau
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
          />
        </div>
      </div>
    </div>
  );
};

export default YourComponent;
