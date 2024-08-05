import Head from "next/head";
import { Anybody, Inter } from "@next/font/google";
import Link from "next/link";
import Body from "@/pages/BaoCao/quytrinh";
import { useState } from "react";
import TheoDanhSachCongViec from "@/pages/QuanLyDuAn/TheoDanhSachCongViec";
import TheoQuyTrinh from "@/pages/QuanLyDuAn/TheoQuyTrinh";
import DuAn from "@/pages/BaoCao/DuAn";
import QuyTrinh from "@/pages/BaoCao/quytrinh";
import TaiLieuCongViec from "@/pages/QuanLyTaiLieu/TaiLieuCongViec";
import TaiLieuCuaToi from "@/pages/QuanLyTaiLieu/TaiLieuCuaToi";
import DiaDiem from "@/pages/QuanLyPhongHop/DiaDiem";
import PhongHop from "@/pages/QuanLyPhongHop/PhongHop";
import QuanLyCuocHop from "@/pages/QuanLyCuocHop";
import DuLieuDaXoaGanDay from "@/pages/DuLieuDaXoaGanDay";
import VaiTro from "@/pages/PhanQuyen/VaiTro";
import NguoiDung from "@/pages/PhanQuyen/NguoiDung";
import CongViecCuaToi from "@/pages/CongViecCuaToi";
import CaiDat from "@/pages/CaiDat";
import QuanLyDuLieuDaXoaGanDay from "@/pages/DuLieuDaXoaGanDay/QuanLyDuLieuDaXoaGanDay";

const inter = Inter({ subsets: ["latin"] });
import Trangchu from "@/components/trangchuphanmemgiaoviec/Trangchu";
import QuyTrinhDaXoaGanDay from "./DuLieuDaXoaGanDay/QuyTrinhDaXoaGanDay";
import TaiLieuDaXoaGanDay from "./DuLieuDaXoaGanDay/TaiLieuDaXoaGanDay";
import CuocHopDaXoaGanDay from "./DuLieuDaXoaGanDay/CuocHopDaXoaGanDay";
import ChiTietDuAn from "@/pages/BaoCao/DuAn/chitiet";
import ChiTietQuyTrinh from "@/pages/BaoCao/quytrinh/chitiet";
import ChiTietTheoDanhSach from "@/pages/components/Quanlyduan/Chitiettheodanhsach/Project_details";
import ChiTietTheoQuyTrinh from "@/pages/components/Quanlyduan/Chitiettheoquytinh/Danh_gia_du_an";
import DetailMeeting from "@/pages/components/MeetingManagement/Detail/DetailMeeting";
import ChiTietVaiTro from "@/pages/PhanQuyen/VaiTro/Xemquyen/Chitietvaitro";
import ThemMoiVaiTro from "@/pages/PhanQuyen/VaiTro/Themvaitro";
import SuaVaiTro from "@/pages/PhanQuyen/VaiTro/Suavaitro";
import Xemchitiet from "@/pages/components/Quanlyduan/Chitiettheoquytinh/Bacham/Nhiemvu/Xemchitiet";
import Chitietcv from "@/pages/components/Quanlyduan/Chitiettheodanhsach/Chitietcv";
import QuanlyNhanvien from "./PhanQuyen/VaiTro/Xemquyen/QuanlyNhanvien";
import Chitietfile from "./components/Quanlytailieu/Chittietfile";
import Dscvlaplai from "./components/Quanlyduan/Chitiettheodanhsach/Dscvlaplai";
import { RoleMeetingContext } from "@/utils/constantContext";
import { LOGIN } from "./api/auth";
import { setCookie } from "cookies-next";
import {ListEpProvider} from "@/components/context/listEpContext";

export default function Home({
  activeKey,
  setActiveKey,
  isHasRole,
  setSelectedColor,
  selectedColor,
  setData,
  data,
  idProject,
  setIdProject,
  file,
  setFile,
}: {
  activeKey: any;
  setActiveKey: Function;
  isHasRole: boolean;
  setSelectedColor: Function;
  selectedColor: string;
  setData: any;
  data: any;
  idProject: any;
  setIdProject: any;
  file:any;
  setFile:any;
}) {
  const [role,SetRole] = useState<String>('1,2,3,4,7')
  const Children = () => {
    switch (activeKey) {
      case "trang-chu":
        return <Trangchu isHasRole={isHasRole} />;
      case "theo-danh-sach-cong-viec":
        return (
          <ListEpProvider>
            <TheoDanhSachCongViec
              isHasRole={isHasRole}
              setActiveKey={setActiveKey}
              setOpenKeys={setActiveKey}
              selectedColor={selectedColor}
              setIdProject={setIdProject}
              activeKey = {activeKey}             
            />
          </ListEpProvider>
        );
      case "theo-quy-trinh":
        return (
          <TheoQuyTrinh
            isHasRole={isHasRole}
            setActiveKey={setActiveKey}
            setOpenKeys={setActiveKey}
            selectedColor={selectedColor}
          />
        );
      case "du-an":
        return (
          <DuAn
            setActiveKey={setActiveKey}
            setOpenKeys={setActiveKey}
            selectedColor={selectedColor}
            setData={setData}
          />
        );
      case "chi-tiet-du-an":
        return (
          <ChiTietDuAn
            setActiveKey={setActiveKey}
            selectedColor={selectedColor}
            item={data}
          />
        );
      case "quy-trinh":
        return (
          <QuyTrinh
            setActiveKey={setActiveKey}
            setOpenKeys={setActiveKey}
            selectedColor={selectedColor}
            setData={setData}
          />
        );
      case "danh-sach-cong-viec-lap-lai":
        return (
          <ListEpProvider>
            <Dscvlaplai 
              isHasRole={isHasRole}
              setOpenKeys={setActiveKey} 
              setActiveKey={setActiveKey} 
              selectedColor={selectedColor} />;
          </ListEpProvider>
        );
      case "chi-tiet-quy-trinh":
        return (
          <ChiTietQuyTrinh
            setActiveKey={setActiveKey}
            selectedColor={selectedColor}
            item={data}
          />
        );
      case "tai-lieu-cong-viec":
        return (
            <TaiLieuCongViec 
              setOpenKeys={setActiveKey}
              setActiveKey={setActiveKey}
              selectedColor={selectedColor}
              isHasRole={isHasRole}
              file={file}
              setFile={setFile}
              />
        )
      case "chi-tiet-file":
        return (
            <Chitietfile 
              setOpenKeys={setActiveKey}
              setActiveKey={setActiveKey} 
              selectedColor={selectedColor}
            />
        )
      case "tai-lieu-cua-toi":
        return (
          <TaiLieuCuaToi
            isHasRole={isHasRole}
            setOpenKeys={setActiveKey}
            setActiveKey={setActiveKey}
            selectedColor={selectedColor}
          />
        );
      case "dia-diem":
        return <DiaDiem isHasRole={isHasRole} selectedColor={selectedColor} />;
      case "phong-hop":
        return <PhongHop isHasRole={isHasRole} selectedColor={selectedColor} />;
      case "cong-viec-cua-toi":
        return(
            <CongViecCuaToi 
              isHasRole={isHasRole} 
              selectedColor={selectedColor} 
              setActiveKey={setActiveKey}
              setOpenKeys={setActiveKey}
            />
          );
      case "du-lieu-da-xoa-gan-day":
        return <DuLieuDaXoaGanDay setActiveKey={setActiveKey} />;
      case "vai-tro":
        return (
          <VaiTro
            isHasRole={isHasRole}
            setActiveKey={setActiveKey}
            setOpenKeys={setActiveKey}
            // children={Children}
            selectedColor={selectedColor}
            setData={setData}
          />
        );
      case "chi-tiet-vai-tro":
        return (
          <ChiTietVaiTro
            isHasRole={isHasRole}
            setOpenKeys={setActiveKey}
            setActiveKey={setActiveKey}
            selectedColor={selectedColor}
            record={data}
          />
        );
      case "them-moi-vai-tro":
        return (
          <ThemMoiVaiTro
            setActiveKey={setActiveKey}
            selectedColor={selectedColor}
          ></ThemMoiVaiTro>
        );
      case "quan-ly-nhan-vien":
        return (
          <QuanlyNhanvien
            setActiveKey={setActiveKey}
            selectedColor={selectedColor}
            setOpenKeys={setActiveKey}
            record={data}
          ></QuanlyNhanvien>
        );

      case "sua-vai-tro":
        return (
          <SuaVaiTro
            setActiveKey={setActiveKey}
            selectedColor={selectedColor}
            record={data}
            setData={setData}
          />
        );
      case "nguoi-dung":
        return (
          <NguoiDung selectedColor={selectedColor} isHasRole={isHasRole} />
        );
      case "quan-ly-cuoc-hop":
        return (
          <QuanLyCuocHop
            isHasRole={isHasRole}
            setActiveKey={setActiveKey}
            setOpenKeys={setActiveKey}
            // children={Children}
            selectedColor={selectedColor}
          />
        );
      case "cai-dat":
        return (
          <CaiDat
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            isHasRole={isHasRole}
          />
        );
      case "quan-ly-du-lieu-da-xoa-gan-day":
        return (
          <QuanLyDuLieuDaXoaGanDay
            setActiveKey={setActiveKey}
            selectedColor={selectedColor}
          ></QuanLyDuLieuDaXoaGanDay>
        );
      case "quy-trinh-xoa-gan-day":
        return (
          <QuyTrinhDaXoaGanDay
            setActiveKey={setActiveKey}
            selectedColor={selectedColor}
          ></QuyTrinhDaXoaGanDay>
        );
      case "tai-lieu-da-xoa-gan-day":
        return (
          <TaiLieuDaXoaGanDay
            selectedColor={selectedColor}
            setActiveKey={setActiveKey}
          ></TaiLieuDaXoaGanDay>
        );
      case "cuoc-hop-da-xoa-gan-day":
        return (
          <CuocHopDaXoaGanDay
            selectedColor={selectedColor}
            setActiveKey={setActiveKey}
          ></CuocHopDaXoaGanDay>
        );
        case "chi-tiet-theo-danh-sach":
          return (
            <ListEpProvider>
              <ChiTietTheoDanhSach 
                selectedColor={selectedColor} 
                isHasRole={isHasRole} 
                setActiveKey={setActiveKey} 
                setOpenKeys={setActiveKey}
                item={idProject} 
                setIdProject={setIdProject}
                />
            </ListEpProvider>
            )

      case "xem-chi-tiet-nhiem-vu":
        return <Xemchitiet setActiveKey={setActiveKey} />;
        case "xem-chi-tiet-theo-danh-sach":
          return (
            <ListEpProvider>
            <Chitietcv 
              setActiveKey={setActiveKey} 
            />
            </ListEpProvider>
          )
      case "chi-tiet-theo-quy-trinh":
        return (
          <ChiTietTheoQuyTrinh
            isHasRole={isHasRole}
            setActiveKey={setActiveKey}
            setOpenKeys={setActiveKey}
            selectedColor={selectedColor}
          ></ChiTietTheoQuyTrinh>
        );
      case "chi-tiet-cuoc-hop":
        return (
          <DetailMeeting
            setActiveKey={setActiveKey}
            selectedColor={selectedColor}
          ></DetailMeeting>
        );

      default:
        return <></>;
        break;
    }
  };
  //fake login
  const handleLogin = (e:any) => {
    switch (e.target.value) {
      case '0':
        LOGIN('http://210.245.108.202:3000/api/qlc/employee/login',{
          account:'duonghiepit1@gmail.com',
          password:'123123a',
          type:1
        })
        .then(res =>{
          setCookie('inForUser',res?.data);     
        })
        break;
      case '1':
        LOGIN('http://210.245.108.202:3000/api/qlc/employee/login',{
          account:'0998765432',
          password:'123123a',
          type:1
        })
        .then(res =>{
          setCookie('inForUser',res?.data);     
        })
        break;
      case '2':
        LOGIN('http://210.245.108.202:3000/api/qlc/employee/login',{
          account:'0998765434',
          password:'123123a',
          type:1
        })
        .then(res =>{
          setCookie('inForUser',res?.data);     
        })
        break;
      case '3':
        LOGIN('http://210.245.108.202:3000/api/qlc/employee/login',{
          account:'0998765435',
          password:'123123a',
          type:1
        })
        .then(res =>{
          setCookie('inForUser',res?.data);     
        })
        break;
      case '4':
        LOGIN('http://210.245.108.202:3000/api/qlc/employee/login',{
          account:'0998765436',
          password:'123123a',
          type:1
        })
        .then(res =>{
          setCookie('inForUser',res?.data);     
        })
        break;
      default:
        break;
    }
  }
  return (
    <div>
      <RoleMeetingContext.Provider value={{role,SetRole}}>
          <div>
            <select onChange={handleLogin}>
              <option value={0}>Công ty</option>
              <option value={1}>Nhân viên 2</option>
              <option value={2}>Nhân viên 3</option>
              <option value={3}>Nhân viên 4</option>
              <option value={4}>Nhân viên 5</option>
            </select>
          </div> 
        <Children />
      </RoleMeetingContext.Provider>
    </div>
  );
}
