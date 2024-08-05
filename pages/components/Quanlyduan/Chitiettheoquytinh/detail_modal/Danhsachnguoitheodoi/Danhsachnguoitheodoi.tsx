'use client';
import React, { useEffect, useState } from 'react';
import { Input, List, Modal } from 'antd';
import Image from 'next/image';
import { Follow, delFollow, fetchStages } from '@/store/actions/stagesActions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/reducers';

const { Search } = Input;
const ListFollower = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const follows = useSelector((state: RootState) => state.follows.follows);
  const processId = localStorage.getItem('process_id');
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    const filteredFollows = follows.filter(
      (element) => element._id !== (id as any)
    );
    const idString = filteredFollows.map((element) => element._id).join(',');
    dispatch(delFollow(id as any, processId as any, idString as any) as any);
  };
  return (
    <>
      <p className="cv_dot" onClick={showModal} style={{ margin: 0 }}>
        <Image
          width={18}
          height={18}
          alt=""
          src="https://hungha365.com/storageimage/GV/img_ntd.png"
          style={{ marginRight: 10 }}
        />
        Danh sách người theo dõi
      </p>
      <Modal
        title="Danh sách người theo dõi"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Search placeholder="Tìm kiếm người theo dõi" />
        <List
          style={{ border: 'none' }}
          size="small"
          bordered
          dataSource={follows}
          renderItem={(item: any, index) => (
            <List.Item>
              <div>
                <Image unoptimized width={24} height={24} alt="" src={''} />
                <span>{item.userName}</span>
              </div>
              <button onClick={() => handleDelete(item._id)}>Xóa</button>
            </List.Item>
          )}
        />
      </Modal>
    </>
  );
};
export default ListFollower;
