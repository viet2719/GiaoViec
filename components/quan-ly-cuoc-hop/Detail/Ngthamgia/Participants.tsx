"use client"

import React, { useEffect, useState } from 'react';
import ParticipantsList from './Dulieu';
import { POST } from '@/pages/api/auth';
import { message } from 'antd';

const App = ({
    data,
    setReload
}:{
    data:any
    setReload:Function
}) => {
    const [participants, setParticipants] = useState<any[]>([]);
    useEffect(()=>{
        setParticipants(data?.name_take_in)
    },[data])
    const handleRemove = (index:number) => {
        if(data?.id_take_in?.length <= 1){
            message.warning('Cần ít nhất một người tham gia!')
        }else{
            data?.id_take_in?.splice(index,1)
            POST(`meetings/chi-tiet-cuoc-hop/${data?.id}/sua-thanh-vien-cuoc-hop`,{
                staff_take_in: data?.id_take_in?.join(',')
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
            <ParticipantsList data={data} participants={participants} onRemove={handleRemove} />
        </div>
    );
};

export default App;
