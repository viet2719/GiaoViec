"use client"

import React, { useEffect, useState } from 'react';
import SecretaryList from './app';
import { message } from 'antd';
import { POST } from '@/pages/api/auth';
import { da } from 'date-fns/locale';

const App = ({
    data,
    setReload
}:{
    data:any
    setReload:Function
}) => {
    const [secretaries, setSecretaries] = useState<any[]>([]);
    useEffect(()=>{
        setSecretaries(data?.name_ecretary)
    },[data])
    const handleRemove = (index: any) => {
        if(data?.id_ecretary?.length !== 0){
            data?.id_ecretary?.splice(index,1)
            POST(`meetings/chi-tiet-cuoc-hop/${data?.id}/sua-thanh-vien-cuoc-hop`,{
                staff_ecretary: data?.id_ecretary?.join(',')
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
            <SecretaryList data={data} secretaries={secretaries} onRemove={handleRemove} />
        </div>
    );
};

export default App;
