import React, { useState, useEffect } from 'react';
import { POST } from '@/pages/api/auth';

interface DataCom {
  tongNhanVien: number;
  tongCuocHopSapToi: number;
  tongDuAn: number;
  duAnDangLam: number;
  duAnQuaHan: number;
  tongCongViec: number;
  congViecDangLam: number;
  congViecQuaHan: number;
}
interface DataEmp {
  DuAnThamGia: number;
  DuAnHoanThanh: number;
  DuAnQuaHan: number;
  TongSoCongViec: number;
  CongViecHoanThanh: number;
  CongViecQuaHan: number;
}

export default function Boxcontent({ isHasRole }: { isHasRole: boolean }) {
  const [data, setData] = useState<DataCom>({
    tongNhanVien: 0,
    tongCuocHopSapToi: 0,
    tongDuAn: 0,
    duAnDangLam: 0,
    duAnQuaHan: 0,
    tongCongViec: 0,
    congViecDangLam: 0,
    congViecQuaHan: 0,
  });
  const [dataNV, setDataNV] = useState<DataEmp>({
    DuAnThamGia: 0,
    DuAnHoanThanh: 0,
    DuAnQuaHan: 0,
    TongSoCongViec: 0,
    CongViecHoanThanh: 0,
    CongViecQuaHan: 0,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res1, res2] = await Promise.all([
          POST('quan-ly-chung-cong-ty', null),
          POST('quan-ly-chung-nhan-vien', null),
        ]);

        if (res1) {
          setData(res1?.data);
        }

        if (res2) {
          setDataNV(res2?.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  //format số thành số luôn có 2 chữ số
  const formatNumber = (number: number) => {
    return number.toLocaleString('en-US', { minimumIntegerDigits: 2 });
  };

  return (
    <div>
      {isHasRole ? (
        <div>
          <div id="box_content" className="db_flex">
            <div className="box box1">
              <p className="num num_bl">{formatNumber(data?.tongNhanVien)}</p>
              <p className="box_suff">Tổng nhân viên</p>
            </div>
            <div className="box box2">
              <p className="num num_gr">
                {formatNumber(data?.tongCuocHopSapToi)}
              </p>
              <p className="box_suff">Tổng số cuộc họp sắp tới</p>
            </div>
            <div className="box box3">
              <p className="num num_gr">
                {formatNumber(data?.duAnDangLam)}/{formatNumber(data?.tongDuAn)}
              </p>
              <p className="box_suff">Dự án đang làm/Tổng số dự án</p>
            </div>
            <div className="box box4">
              <p className="num num_bl">
                {formatNumber(data?.tongCongViec)}/
                {formatNumber(data?.tongDuAn)}
              </p>
              <p className="box_suff">Tổng số công việc/Tổng số dự án</p>
            </div>
            <div className="box box5">
              <p className="num num_yl">
                {formatNumber(data?.congViecDangLam)}/
                {formatNumber(data?.duAnDangLam)}
              </p>
              <p className="box_suff">Công việc đang làm/Dự án đang làm</p>
            </div>
            <div className="box box6">
              <p className="num num_red">
                {formatNumber(data?.congViecQuaHan)}/
                {formatNumber(data?.duAnQuaHan)}
              </p>
              <p className="box_suff">Công việc quá hạn/Dự án quá hạn</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div id="box_content" className=" db_flex">
            <div className="box box1">
              <p className="num num_bl">{formatNumber(dataNV?.DuAnThamGia)}</p>
              <p className="box_suff">Dự án tham gia</p>
            </div>
            <div className="box box2">
              <p className="num num_gr">
                {formatNumber(dataNV?.DuAnHoanThanh)}
              </p>
              <p className="box_suff">Dự án hoàn thành</p>
            </div>
            <div className="box box3">
              <p className="num num_gr">{formatNumber(dataNV?.DuAnQuaHan)}</p>
              <p className="box_suff">Số dự án quá hạn</p>
            </div>
            <div className="box box4">
              <p className="num num_bl">
                {formatNumber(dataNV?.TongSoCongViec)}
              </p>
              <p className="box_suff">Tổng số công việc</p>
            </div>
            <div className="box box5">
              <p className="num num_yl">
                {formatNumber(dataNV?.CongViecHoanThanh)}
              </p>
              <p className="box_suff">Số công việc hoàn thành</p>
            </div>
            <div className="box box6">
              <p className="num num_red">
                {formatNumber(dataNV?.CongViecQuaHan)}
              </p>
              <p className="box_suff">Số công việc quá hạn</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
