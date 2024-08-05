import React, { useState } from 'react';
import Image from 'next/image';

import { POST, GET_EXCEL } from '@/pages/api/auth';

export default function Excel({ id }: { id: number }) {
  // const [data, setData] = useState([
  //     ['STT', 'Tên cuộc họp', 'Nội dung cuộc họp', 'Thời gian bắt đầu',
  //         'Thời lượng', 'Địa điểm', 'Bộ phận tham gia',
  //         'Chủ trì cuộc họp', 'Thư ký cuộc họp'],

  //     ['John', '30', 'New York'],
  //     ['Jane', '25', 'Los Angeles'],
  //     ['Doe', '40', 'Chicago']
  // ]);

  // const exportToExcel = (data: any[][], filename: string) => {
  //     const ws = XLSX.utils.aoa_to_sheet(data);
  //     const wb = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  //     XLSX.writeFile(wb, filename);
  // };

  const handleExportExcel = () => {
    // POST_EXCEL(`meetings/chi-tiet-cuoc-hop/${window.sessionStorage.getItem('id_chi_tiet_cuoc_hop')}/export-excel`)
    // .then(res=>{
    //     if(res){
    //         console.log(typeof(res?.data));
    //     }
    // })
  };
  return (
    <div>
      <p
        //onClick={() => exportToExcel(data, 'meeting_data.xlsx')}
        onClick={handleExportExcel}
        style={{ margin: '0' }}
      >
        <a
          href={GET_EXCEL(`meetings/chi-tiet-cuoc-hop/${id}/export-excel`)}
          style={{ color: 'black', textDecoration: 'none' }}
        >
          <Image
            unoptimized
            width={16}
            height={19}
            alt=""
            src="https://hungha365.com/storageimage/GV/export_ex.png"
            style={{ marginRight: '10px' }}
          />
          Xuất thông tin ra excel
        </a>
      </p>
    </div>
  );
}
