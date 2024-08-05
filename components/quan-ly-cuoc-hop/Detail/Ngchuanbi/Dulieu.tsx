import React, { useState } from 'react';
import styles from '../Detail.module.css';
import Image from 'next/image';
import { getCurrentID, getType } from '@/pages/api/auth';

interface PrepareListProps {
  prepare: any[];
  onRemove: (id: number) => void;
}

const PrepareList = ({
  data,
  prepare,
  onRemove,
}: {
  data: any;
  prepare: any;
  onRemove: Function;
}) => {
  const admin = getType() === '1';
  const userOwn = getCurrentID();
  const remove = (index: number) => {
    if (admin || data?.staff_owner?.includes(userOwn.toString())) {
      return (
        <button className={styles.sp_remove} onClick={() => onRemove(index)}>
          Gỡ bỏ
        </button>
      );
    }
  };

  return (
    <div className={styles.meet_ifmt_tv}>
      <div className={styles.title_detl_meet}>
        <h4>NGƯỜI THAM CHUẨN BỊ CUỘC HỌP</h4>
      </div>
      <div className={styles.detl_infm_meet}>
        <div className={styles.bptg_met}>
          <div className={styles.detl_infm_meet} style={{ padding: '0' }}>
            {prepare?.map((prepare: any, index: number) => (
              <div key={prepare.id} className={styles.ctch_met}>
                <div className={styles.meet_ng}>
                  <div className={styles.detl_fulln}>
                    <Image
                      unoptimized
                      width={30}
                      height={30}
                      src={
                        'https://hungha365.com/storageimage/GV/Group 626671.png'
                      }
                      alt=""
                    />
                    {prepare}
                  </div>
                  {remove(index)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrepareList;
