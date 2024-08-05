import React, { useState } from 'react';
import Image from 'next/image';
import styles from './Danh_gia_du_an.module.css';
import Chamnv from './Bacham/Nhiemvu/Chamnv';
import { Input, Modal, Select } from 'antd';
import { Stage, Task } from '@/store/actions/stagesActions';
import { includes } from 'lodash';

export default function Drag({
  stages,
  setActiveKey,
  setOpenKeys,
  selectedColor,
  isHasRole,
}: {
  stages: Stage[];
  isHasRole: boolean;
  setActiveKey: Function;
  setOpenKeys: Function;
  selectedColor: string;
}) {
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [allowDropData, setAllowDropData] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [draggedData, setDraggedData] = useState(null);

  const allowDrop = (ev: any) => {
    ev.preventDefault();
  };
  const dragEnter = (ev: any) => {
    ev.preventDefault();
    setDraggedData(null);
    setAllowDropData(true);
  };

  const dragLeave = (ev: any) => {
    ev.preventDefault();
    setDraggedData(null);
    setAllowDropData(false);
  };
  const drag = (ev: any) => {
    ev.dataTransfer.setData('text', (ev.target as HTMLImageElement).id);
  };

  const drop = (ev: any) => {
    ev.preventDefault();
    setDraggedData(null);
    setAllowDropData(false);

    const data = ev.dataTransfer.getData('text');
    const droppedElement = document.getElementById(data);

    if (droppedElement) {
      ev.currentTarget.appendChild(droppedElement);
      // Kiểm tra khi nào nên hiển thị modal
      if (ev.currentTarget.id === 'success') {
        setShowModal1(true);
      }
      if (ev.currentTarget.id.includes('stage')) {
        setShowModal2(true);
      }
      if (ev.currentTarget.id.includes('stage1')) {
        setShowModal2(true);
      }
      if (ev.currentTarget.id === 'fail') {
        setShowModal3(true);
      }
    }
    if (droppedElement && allowDropData) {
      ev.currentTarget.appendChild(droppedElement);
      // Reset trạng thái allowDropData để ngăn không cho thả tiếp tục
      setAllowDropData(false);
    }
  };
  const handleConfirm1 = () => {
    // Xác nhận hoàn thành nhiệm vụ
    // Sau khi xác nhận, reset trạng thái allowDropData để ngăn không cho thả tiếp tục

    setShowModal1(false);
  };
  const handleConfirm2 = () => {
    // Xác nhận hoàn thành nhiệm vụ
    // Sau khi xác nhận, reset trạng thái allowDropData để ngăn không cho thả tiếp tục

    setShowModal2(false);
  };
  const handleConfirm3 = () => {
    // Xác nhận hoàn thành nhiệm vụ
    // Sau khi xác nhận, reset trạng thái allowDropData để ngăn không cho thả tiếp tục
    setShowModal3(false);
  };
  const handleCancel1 = (ev: any) => {
    // Hủy thao tác và reset trạng thái về trạng thái trước đó
    if (draggedData) {
      const sourceElement = document.getElementById(draggedData);
      if (sourceElement) {
        ev.currentTarget.appendChild(sourceElement);
      }
    }
    setAllowDropData(true);
    setShowModal1(false);
  };
  const handleCancel2 = (ev: any) => {
    // Hủy thao tác và reset trạng thái về trạng thái trước đó
    if (draggedData) {
      const sourceElement = document.getElementById(draggedData);
      if (sourceElement) {
        ev.currentTarget.appendChild(sourceElement);
      }
    }
    setAllowDropData(false);
    setShowModal2(false);
  };
  const handleCancel3 = (ev: any) => {
    // Hủy thao tác và reset trạng thái về trạng thái trước đó
    if (draggedData) {
      const sourceElement = document.getElementById(draggedData);
      if (sourceElement) {
        ev.currentTarget.appendChild(sourceElement);
      }
    }
    setAllowDropData(false);
    setShowModal3(false);
  };

  const onClick = (info: any) => {
    localStorage.setItem('task_id', info.id);
    setActiveKey(info?.key);
    info?.key === 'trang-chu' ? setOpenKeys([]) : null;
  };
  const onChange = (value: string) => {};

  const onSearch = (value: string) => {};

  // Filter `option.label` match the user type `input`
  const filterOption: any = (
    input: string,
    option: { label: string; value: string }
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  return (
    <div>
      {stages.map((stageObj, index) => (
        <div
          key={index}
          id={`stage${index}`}
          onDrop={drop}
          onDragOver={allowDrop}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          style={{
            float: 'left',
            width: `calc(100% / ${stages.length + 2})`,
            height: '1000px',
            backgroundColor: dragOver ? 'lightgray' : 'white',
            border: '1px solid #ccc',
          }}
        >
          {stageObj.stageMission?.map((stageMission: Task, stageIndex) => (
            <div key={stageIndex}>
              {/* Render các phần tử trong stageMission */}
              <div
                draggable
                onDragStart={drag}
                id={`drag${stageIndex + 1}`}
                className="first"
              >
                <div className={styles.mission}>
                  <div className={styles.name_mission}>
                    <div
                      style={{ fontWeight: 'bold', cursor: 'pointer' }}
                      key={'xem-chi-tiet-nhiem-vu'}
                      onClick={() =>
                        onClick({
                          key: 'xem-chi-tiet-nhiem-vu',
                          id: stageMission.id,
                        })
                      }
                    >
                      {stageMission.name_misssion}
                    </div>
                    <Chamnv task={stageMission} />
                  </div>
                  <div>
                    <span>{stageMission.misssion_description || ''}</span>
                    <div className={styles.cart_eva}>
                      <span>Thẻ dự án</span>
                      <span style={{ color: 'blue', cursor: 'pointer' }}>
                        Chờ đánh giá
                      </span>
                    </div>
                  </div>
                  <div className={styles.name_tvth}>
                    <Image
                      unoptimized
                      width={18}
                      height={18}
                      alt=""
                      src="https://hungha365.com/storageimage/GV/Group 626671.png"
                    />
                    <span>Tên thành viên thực hiện</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
      <div
        id="success"
        onDrop={drop}
        onDragOver={allowDrop}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        style={{
          float: 'left',
          width: `calc(100% / ${stages.length + 2})`,
          height: '1000px',
          backgroundColor: dragOver ? 'lightgray' : 'white',
          border: '1px solid #ccc',
        }}
      ></div>
      <div
        id="fail"
        onDrop={drop}
        onDragOver={allowDrop}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        style={{
          float: 'left',
          width: `calc(100% / ${stages.length + 2})`,
          height: '1000px',
          backgroundColor: dragOver ? 'lightgray' : 'white',
          border: '1px solid #ccc',
        }}
      ></div>

      {showModal1 && (
        <Modal open={showModal1} onCancel={() => setShowModal1(false)}>
          <div className={styles.modal_modal}>
            <h2 className={styles._modal}>Chuyển tới giai đoạn hoàn thành</h2>
            <p className={styles.p}>Xác nhận hoàn thành nhiệm vụ này?</p>
            <div className={styles.btn_modal}>
              <button onClick={handleCancel1}>Hủy</button>
              <button onClick={handleConfirm1}>Đồng ý</button>
            </div>
          </div>
        </Modal>
      )}
      {showModal2 && (
        <Modal open={showModal2} onCancel={() => setShowModal2(false)}>
          <div className={styles.modal_modal}>
            <h2 className={styles._modal}>Chuyển tới Giai đoạn 1</h2>
            <p>Giao lại cho :</p>
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={filterOption}
              options={[
                {
                  value: 'jack',
                  label: 'Jack',
                },
                {
                  value: 'lucy',
                  label: 'Lucy',
                },
                {
                  value: 'tom',
                  label: 'Tom',
                },
              ]}
            />
            <div>
              <p>Thời lượng</p>
              <Input prefix="24" suffix="Giờ" disabled />
            </div>
            <div className={styles.btn_modal}>
              <button onClick={handleCancel2}>Hủy</button>
              <button onClick={handleConfirm2}>Đồng ý</button>
            </div>
          </div>
        </Modal>
      )}
      {showModal3 && (
        <Modal open={showModal3} onCancel={() => setShowModal3(false)}>
          <div className={styles.modal_modal}>
            <h2 className={styles._modal}>Đánh dấu nhiệm vụ thất bại</h2>
            <p className={styles.p}>Đánh dấu thất bại nhiệm vụ này?</p>
            <div className={styles.btn_modal}>
              <button onClick={handleCancel3}>Hủy</button>
              <button onClick={handleConfirm3}>Đồng ý</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
