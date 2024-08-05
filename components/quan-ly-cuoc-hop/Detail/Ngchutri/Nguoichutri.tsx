"use client"

import React, { useState, useEffect } from 'react';
import BossList from './Dulieu';
import { POST } from '@/pages/api/auth';
import _ from 'lodash';
import { Select, message } from 'antd';

const App = ({
    data,
    setReload
}:{
    data:any
    setReload:Function
}) => {
    const [boss, setBoss] = useState<any[]>([]);
    useEffect(()=>{
        setBoss(data?.name_owner)
    },[data])
    const handleRemove = (index: any) => {               
        if(data?.id_owner?.length <= 1){
            message.warning('Cần ít nhất một người chủ trì!')
        }else{
            data?.id_owner?.splice(index,1)
            POST(`meetings/chi-tiet-cuoc-hop/${data?.id}/sua-thanh-vien-cuoc-hop`,{
                staff_owner: data?.id_owner?.join(',')
            })
            .then(res => {
                if(res){
                    message.success('Gỡ thành công!')
                    setReload(true)
                }
            })
        }
    };

    return (
        <div>
            <BossList data={data} boss={boss} onRemove={handleRemove} />
        </div>
    );
};

export default App;
