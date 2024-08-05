"use client"

import React, { useEffect, useState } from 'react';
import PrepareList from './Dulieu';
import { POST } from '@/pages/api/auth';
import { message } from 'antd';

const App: React.FC<any> = ({
    data,
    setReload
}:{
    data:any
    setReload:Function
}) => {
    const [prepare, setPrepare] = useState<any[]>([]);
    useEffect(()=>{
        setPrepare(data?.name_preparation)
    },[data])
    const handleRemove = (index:number) => {
        if(data?.id_preparation?.length !== 0){
            data?.id_preparation?.splice(index,1)
            POST(`meetings/chi-tiet-cuoc-hop/${data?.id}/sua-thanh-vien-cuoc-hop`,{
                staff_preparationion: data?.id_preparation?.join(',')
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
            <PrepareList data={data} prepare={prepare} onRemove={handleRemove} />
        </div>
    );
};

export default App;
