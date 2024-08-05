import React, { useEffect, useState } from 'react';
import styles from './CaiDat.module.css';
import { Modal, Button } from 'react-bootstrap';
import Image from 'next/image';
import { Input, Checkbox } from 'antd';
import { POST } from '../api/auth';
import { Education } from '@/components/Education';
import { pos } from '@/components/Department';
import { format } from 'date-fns';

export interface PostPageAProps {}

export default function PostPage(props: PostPageAProps) {
  const [showModal, setShowModal] = useState(false);
  // Hàm xử lý khi người dùng bấm vào nút mở modal
  const handleShowModal = () => {
    setShowModal(true);
  };

  // Hàm xử lý khi người dùng đóng modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [editedInfo, setEditedInfo] = useState({
    hoTen: '',
    gioiTinh: 'Nam',
    ngaySinh: '',
    queQuan: '',
    sdt: '',
    email: '',
    trinhDoHocVan: '',
    tinhTrangHonNhan: '',
    ngayBatDauLamViec: '',
    chucVu: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: any) => {
    const { name, checked } = e.target;
    setEditedInfo((prevInfo) => ({
      ...prevInfo,
      [name]: checked ? 'Nam' : 'Nữ',
    }));
  };
  const [apiData, setApiData] = useState<any>();
  const [listDepartment, setListDepartment] = useState<any>();

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
    POST('cai-dat-sau-dang-nhap-nhan-vien', {}).then((response) => {
      setApiData(response?.data);
    });
  };
  useEffect(() => {
    fetchApiData();
    fetchApiListDepartment();
  }, []);

  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [address, setAddress] = useState();
  const [id, setId] = useState();
  const [birthday, setBirthday] = useState<string | undefined>();
  const [gender, setGender] = useState();
  const [married, setMarried] = useState();
  const [education, setEducation] = useState();
  const [department, setDepartment] = useState();
  const [startWorkTime, setStartWorkTime] = useState<string | undefined>();
  const [positions, setPositions] = useState();
  const [part, setPart] = useState();

  useEffect(() => {
    if (apiData?.ThongTinCaNhan && apiData.ThongTinCaNhan.length > 0) {
      const personalInfo = apiData.ThongTinCaNhan[0];
      setName(personalInfo.userName);
      setPhone(personalInfo.phone);
      setEmail(personalInfo.emailContact);
      setAddress(personalInfo.address);
      setId(personalInfo.idQLC);
      setBirthday(
        format(
          new Date(personalInfo?.inForPerson?.account?.birthday * 1000),
          'dd/MM/yyyy'
        )
      );
      setGender(personalInfo.inForPerson?.account?.gender);
      setMarried(personalInfo.inForPerson?.account?.married);
      setEducation(personalInfo.inForPerson?.account?.education);
      setDepartment(personalInfo.inForPerson?.employee?.dep_id);
      setStartWorkTime(
        format(
          new Date(personalInfo.inForPerson?.employee?.start_working_time),
          'dd/MM/yyyy'
        )
      );
      setPositions(personalInfo.inForPerson?.employee?.position_id);
    }
  }, [apiData]);

  const educationValue = Education.find((item) => item.id === education)?.value;
  const positionsValue = pos.find((item) => item.value === positions)?.label;
  const departmentValue = listDepartment?.find(
    (item: any) => item.dep_id === department
  )?.dep_name;
  return (
    <div>
      <div id="multiCollapseExample2">
        <div className="card card-body">
          <div className={`${styles.list_setting} active`} id="cds_three">
            <div className={styles.sett_wtt}>
              <div className={`${styles.profile_avt} d-flex`}>
                <div className={`${styles.prof_full} d-flex`}>
                  <Image
                    unoptimized
                    src="duc.jpg"
                    alt=""
                    className={styles.prof_avt}
                  />

                  <div
                    className={styles.prof_infm}
                    style={{ marginLeft: '18px' }}
                  >
                    <div className="d-flex">
                      <h1
                        style={{
                          fontWeight: 'bold',
                          fontSize: '17px',
                          width: '100%',
                        }}
                      >
                        {name}
                      </h1>
                      <div className={styles.chinhsua_2}>
                        <Image
                          width={15}
                          height={15}
                          alt=""
                          src="https://hungha365.com/storageimage/GV/chinhsua.png"
                          onClick={handleShowModal}
                        />
                        <Modal
                          show={showModal}
                          onHide={handleCloseModal}
                          scrollable
                        >
                          <Modal.Header style={{ backgroundColor: '#4C5BD4' }}>
                            <Modal.Title
                              style={{
                                textAlign: 'center',
                                color: 'white',
                                fontSize: '18px',
                                fontWeight: 'bold',
                              }}
                            >
                              Cập nhật thông tin cá nhân
                            </Modal.Title>
                          </Modal.Header>
                          <Modal.Body
                            style={{
                              overflowY: 'clip',
                            }}
                          >
                            <div>
                              <div
                                className="form-group d-flex "
                                style={{ margin: '10px' }}
                              >
                                <label style={{ width: '50%' }}>Họ tên</label>
                                <Input
                                  name="hoTen"
                                  value={editedInfo.hoTen}
                                  placeholder=" Nhập họ và tên"
                                  onChange={(e) => handleInputChange(e)}
                                />
                              </div>
                              <div
                                className="form-group d-flex "
                                style={{ margin: '10px' }}
                              >
                                <label style={{ width: '50%' }}>
                                  Giới tính
                                </label>
                                <Checkbox
                                  style={{ width: '25%' }}
                                  name="gioiTinh"
                                  checked={editedInfo.gioiTinh === 'Nam'}
                                  onChange={(e) => handleCheckboxChange(e)}
                                >
                                  Nam
                                </Checkbox>
                                <Checkbox
                                  style={{ width: '25%' }}
                                  name="gioiTinh"
                                  checked={editedInfo.gioiTinh === 'Nữ'}
                                  onChange={(e) => handleCheckboxChange(e)}
                                >
                                  Nữ
                                </Checkbox>
                              </div>

                              <div
                                className="form-group d-flex "
                                style={{ margin: '10px' }}
                              >
                                <label style={{ width: '50%' }}>
                                  Ngày sinh
                                </label>
                                <Input
                                  name="ngaySinh"
                                  onChange={handleInputChange}
                                  placeholder=" Nhập ngày sinh"
                                  type="date"
                                />
                              </div>

                              <div
                                className="form-group d-flex "
                                style={{ margin: '10px' }}
                              >
                                <label style={{ width: '50%' }}>Quê quán</label>
                                <Input
                                  placeholder=" Nhập quê quán"
                                  name="queQuan"
                                  onChange={handleInputChange}
                                />
                              </div>

                              <div
                                className="form-group d-flex "
                                style={{ margin: '10px' }}
                              >
                                <label style={{ width: '50%' }}>SĐT</label>
                                <Input
                                  placeholder=" Nhập số điện thoại"
                                  name="sdt"
                                  onChange={handleInputChange}
                                />
                              </div>

                              <div
                                className="form-group d-flex "
                                style={{ margin: '10px' }}
                              >
                                <label style={{ width: '50%' }}>Email</label>
                                <Input
                                  placeholder=" Nhập email"
                                  name="email"
                                  onChange={handleInputChange}
                                />
                              </div>

                              <div
                                className="form-group d-flex "
                                style={{ margin: '10px' }}
                              >
                                <label style={{ width: '50%' }}>
                                  Trình độ học vấn
                                </label>
                                <Input placeholder="  Nhập trình độ học vấn" />
                              </div>

                              <div
                                className="form-group d-flex "
                                style={{ margin: '10px' }}
                              >
                                <label style={{ width: '50%' }}>
                                  Tình trạng hôn nhân
                                </label>
                                <Input placeholder="  Nhập tình trạng hôn nhân" />
                              </div>

                              <div
                                className="form-group d-flex "
                                style={{ margin: '10px' }}
                              >
                                <label style={{ width: '50%' }}>
                                  Ngày bắt đầu làm việc
                                </label>
                                <Input placeholder="  Nhập ngày bắt đầu làm việc" />
                              </div>

                              <div
                                className="form-group d-flex "
                                style={{ margin: '10px' }}
                              >
                                <label style={{ width: '50%' }}>Chức vụ</label>
                                <Input
                                  name="chucVu"
                                  placeholder="  Nhập chức vụ"
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>
                          </Modal.Body>
                          <Modal.Footer
                            style={{
                              textAlign: 'center',
                              display: 'flex',
                              justifyContent: 'space-around',
                            }}
                          >
                            <Button
                              style={{
                                color: 'white',
                                backgroundColor: '#FFA800',
                                padding: '9px 58px',
                              }}
                              onClick={handleCloseModal}
                            >
                              Huỷ
                            </Button>

                            <Button
                              key="save"
                              onClick={handleCloseModal}
                              style={{
                                color: 'white',
                                borderRadius: '5px',
                                padding: '9px 20px',
                              }}
                            >
                              Lưu thông tin
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    </div>
                    <div>
                      <b>
                        Bộ phận:{' '}
                        <span style={{ fontWeight: '100' }}>
                          {departmentValue}
                        </span>
                      </b>
                    </div>
                    <div>
                      <b>
                        Vị trí:{' '}
                        <span style={{ fontWeight: '100' }}>
                          {departmentValue}
                        </span>
                      </b>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.prof_brit}>
                <p className={styles.prof_gedr}>
                  <b>Giới tính:</b> <u>{gender === 0 ? 'Nam' : 'Nữ'}</u>{' '}
                </p>
                <p className={styles.prof_inv}>
                  <b>Mã nhân viên:</b> <u>{id}</u>
                </p>
              </div>

              <div className={styles.prof_brit}>
                <p className={styles.brit_nv}>
                  <b>Ngày sinh: </b> <u>{birthday}</u>
                </p>

                <p className={styles.post_nv}>
                  <b>Chức vụ: </b> <u>{positionsValue}</u>
                </p>
              </div>

              <div className={`${styles.prof_brit} ${styles.prof_britdone}`}>
                <p className={styles.addr_nv}>
                  <b>Quê quán: </b> <u>{editedInfo.queQuan}</u>
                </p>
                <p className={styles.marr_nv}>
                  <b>Tình trạng hôn nhân: </b>{' '}
                  <u>{married === 0 ? 'Độc thân' : 'Đã kết hôn'}</u>
                </p>
              </div>
              <div className={`${styles.prof_brit} ${styles.prof_britdone}`}>
                <p className={styles.sdt_nv}>
                  <b>SĐT: </b> <u>{phone}</u>
                </p>

                <p className={styles.star_nv}>
                  <b>Ngày bắt đầu làm việc: </b> <u>{startWorkTime}</u>
                </p>
              </div>
              <div className={`${styles.prof_brit} ${styles.prof_britdone}`}>
                <p className={styles.adre_nv}>
                  <b>Địa chỉ: </b>
                  <u>{address}</u>
                </p>
                <p className={styles.tdhv_nv}>
                  <b>Trình độ học vấn: </b> <u>{educationValue}</u>
                </p>
              </div>

              <div className={styles.prof_brit}>
                <p className={styles.email_nv}>
                  <b>
                    Email: <u>{email}</u>
                  </b>
                </p>
              </div>
            </div>
          </div>
        </div>
        <b></b>
      </div>
    </div>
  );
}
