import '../styles/globals.css';
import '../styles/globals2.css';
import '../styles/Tqt.css';
import '../styles/work_document.css';
import '../styles/box_home.css';
import '../styles/Layouts.css';
import '../styles/reponsive.css';
import '../styles/project_detail.css';
import '../styles/suaphanquyen.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/dscvlaplai.css';
import '../styles/Home.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/atd.css';
import { Component, useEffect, useState } from 'react';
import HomeLayout from '../components/Layout';
import type { AppProps } from 'next/app';
import { Button, MenuProps, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useSession } from 'next-auth/react';
import NhanVienLayout from '../components/Layout';
import { LOGIN, POST, getType } from '@/pages/api/auth';
import { setCookie } from 'cookies-next';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from '@/store/store';
import { type } from 'os';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import PreLogin from '@/components/pre-login/prelogin';
export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const tokenExists = Cookies.get('token_base365') !== undefined;
  const token = Cookies.get('token_base365');
  const role = Cookies.get('role');
  const [activeKey, setActiveKey]: any = useState('trang-chu');
  const [data, setData] = useState();
  const rootSubmenuKeys = [
    'quan-ly-du-an',
    'bao-cao',
    'quan-ly-tai-lieu',
    'quan-ly-phong-hop',
    'cong-viec-cua-toi',
    'du-lieu-xoa-gan-day',
    'phan-quyen',
    'chuyen-doi-so',
    'quan-ly-du-lieu-da-xoa-gan-day',
  ];
  const [openKeys, setOpenKeys]: any[] = useState([]);
  const [isHasRole, setIsHasRole]: any[] = useState(false);
  const [selectedColor, setSelectedColor] = useState();
  const [idProject, setIdProject] = useState();
  const [file, setFile] = useState();
  const [detailJob, setDetailJob] = useState();

  //useEffect
  useEffect(() => {
    setIsClient(true);
    if (tokenExists && router.pathname === '/') {
      if (Number(role) === 1) {
        router.push('/quan-ly-chung-cong-ty');
      } else {
        router.push('/quan-ly-chung-nhan-vien');
      }
    }
  }, [tokenExists, router, role]);

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys?.find((key) => openKeys?.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const fetchBGR = () => {
    POST('showConfigBackground').then((response: any) => {
      setSelectedColor(response?.list?.background);
    });
  };
  useEffect(() => {
    setIsHasRole(Number(role) === 1 ? true : false);
    fetchBGR();
  }, [role]);

  const LoadingComp = () => {
    return (
      <Spin
        indicator={<LoadingOutlined />}
        size="large"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
        }}
      />
    );
  };

  const homeStyles = {
    backgroundColor: selectedColor,
    // Thêm các kiểu khác theo ý muốn
  };

  return (
    <>
      {isClient && tokenExists ? (
        <Provider store={store}>
          <div className={selectedColor ? selectedColor : ''}>
            <HomeLayout
              activeKey={activeKey}
              setActiveKey={setActiveKey}
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              setOpenKeys={setOpenKeys}
              isHasRole={isHasRole}
              setIsHasRole={setIsHasRole}
              selectedColor={selectedColor}
              setData={setData}
              data={data}
              idProject={idProject}
              setIdProject={setIdProject}
              file={file}
              setFile={setFile}
              detailJob={detailJob}
              setDetailJob={setDetailJob}
            >
              <Component
                {...pageProps}
                activeKey={activeKey}
                setActiveKey={setActiveKey}
                isHasRole={isHasRole}
                setIsHasRole={setIsHasRole}
                setSelectedColor={setSelectedColor}
                selectedColor={selectedColor}
                setData={setData}
                data={data}
                idProject={idProject}
                setIdProject={setIdProject}
                file={file}
                setFile={setFile}
                detailJob={detailJob}
                setDetailJob={setDetailJob}
              />
            </HomeLayout>
          </div>
        </Provider>
      ) : (
        <PreLogin />
      )}
    </>
  );
}
