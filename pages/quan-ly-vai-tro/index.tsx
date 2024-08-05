import React, { useEffect, useState } from 'react';
import Vaitro from '@/components/phan-quyen/vai-tro/Vaitro';
import ChiTietVaiTro from '@/components/phan-quyen/vai-tro/ChiTietVaiTro';
import QuanlyNhanvien from '@/components/phan-quyen/vai-tro/QuanlyNhanvien';
import { POST } from '@/pages/api/auth';

export interface PostPageAProps {}

export default function VaiTro({
  // children,
  setActiveKey,
  setOpenKeys,
  selectedColor,
  isHasRole,
  setData,
}: {
  // children: any;
  isHasRole: boolean;
  setActiveKey: Function;
  setOpenKeys: Function;
  selectedColor: string;
  setData: any;
}) {
  const [apiData, setApiData] = useState();
  const [reload, setReLoad] = useState(false);

  const fetchApiData = () => {
    POST('roles/quan-ly-vai-tro?keywords=', {}).then((response) => {
      setApiData(response?.data);
    });
  };
  useEffect(() => {
    fetchApiData();
  }, [reload]);

  return (
    <div>
      <Vaitro
        data={apiData}
        reload={reload}
        setReLoad={setReLoad}
        isHasRole={isHasRole}
        setActiveKey={setActiveKey}
        setOpenKeys={setActiveKey}
        // children={Children}
        setData={setData}
        selectedColor={selectedColor}
      />
    </div>
  );
}
