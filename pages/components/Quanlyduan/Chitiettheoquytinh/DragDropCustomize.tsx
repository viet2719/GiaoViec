import {
  Stage,
  Task,
  addTask,
  fetchStages,
  moveTask,
} from '@/store/actions/stagesActions';
import { RootState } from '@/store/reducers';
import React, { useEffect, useState } from 'react';
import styles from './Danh_gia_du_an.module.css';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DragStart,
} from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import Giaidoan from './Bacham/Giaidoan/Giaidoan';
import Image from 'next/image';
import { Input, Modal } from 'antd';
import Bacham from './Bacham/HTTB/Bacham';
import Chamnv from './Bacham/Nhiemvu/Chamnv';
import SelectCustomize from '@/components/select/select';
function DragDropExample({
  setActiveKey,
  setOpenKeys,
  selectedColor,
  isHasRole,
}: {
  isHasRole: boolean;
  setActiveKey: Function;
  setOpenKeys: Function;
  selectedColor: string;
}) {
  const dispatch = useDispatch();
  const getStages = useSelector((state: RootState) => state.stages.stages);
  const [stages, setStages] = useState<Stage[]>([]);

  //to stage
  const [toStage, setToStage]: any = useState<Stage[]>([]);

  //có một sự kiện kéo thả đang diễn ra
  const [isDragInProgress, setIsDragInProgress] = useState(false);

  //danh sách nhân viên
  const [optionsMember, setOptionsMember] = useState([]);

  //option
  const [option, setOption] = useState([]);
  //id người nhận lại
  const [id, setId] = useState(''); //post
  const [listEmpIn, setListEmIn] = useState([]);
  const [time, setTime] = useState('');

  // đồng ý kéo thả sang giai đoạn mới hay không
  const [isAgree, setIsAgree] = useState(false);
  //status modal
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [dragDropDetails, setDragDropDetails] = useState<{
    destination: DropResult['destination'];
    source: DropResult['source'];
    draggableId: DropResult['draggableId'];
  } | null>(null);

  useEffect(() => {
    setStages(getStages); // Tạo bản sao mới của danh sách stages từ Redux'
  }, [getStages, stages]);

  useEffect(() => {
    const processId = localStorage.getItem('process_id');
    POST(`projects/chi-tiet-du-an-theo-quy-trinh/${processId}`).then((res) => {
      //member
      const stageMembers = toStage?.stage_member?.split(',');
      const filteredListMember = res?.data.listEp.filter((item: any) =>
        stageMembers?.includes(item._id.toString())
      );
      setOptionsMember(filteredListMember);
    });
  }, [toStage?.stage_member]);

  useEffect(() => {
    const destinationDroppableId = dragDropDetails?.destination?.droppableId;
    if (!_.isNil(destinationDroppableId)) {
      const processId = localStorage.getItem('process_id');
      POST(`projects/chi-tiet-du-an-theo-quy-trinh/${processId}/option`, {
        with_stage: destinationDroppableId,
      }).then((res) => {
        if (res?.result) {
          setOption(res.data.processOption);
        }
      });
    }
  }, [dragDropDetails?.destination?.droppableId]);

  useEffect(() => {
    if (isAgree && dragDropDetails) {
      const formData = new FormData();
      formData.append('missionStaffId', id);
      formData.append(
        'stageId',
        dragDropDetails?.destination?.droppableId as string
      );
      formData.append('time', time);
      formData.append('processOptionUpdate', '[1,2,3]');
      dispatch(
        moveTask(
          dragDropDetails.source.droppableId,
          dragDropDetails?.destination?.droppableId as string,
          dragDropDetails.draggableId,
          formData
        ) as any
      );
      setIsAgree(false);
    }
  }, [dispatch, dragDropDetails, id, isAgree, time]);

  const onDragStart = () => {
    setIsDragInProgress(true);
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      setIsDragInProgress(false);
      return;
    }

    if (
      result.destination &&
      result.source.droppableId !== result.destination.droppableId
    ) {
      // Hiển thị modal khi task được kéo sang stage khác
      if (destination?.droppableId === '111') {
        setShowModal1(true);
      } else if (destination?.droppableId === '222') {
        setShowModal3(true);
      } else {
        setShowModal(true);
      }
    } else {
      // Tiếp tục xử lý kéo thả
      // ...
    }

    const destinationStage = stages.find(
      (stage) => stage.id == destination.droppableId
    );
    setToStage(destinationStage as any);

    setDragDropDetails({ destination, source, draggableId });
  };

  const handleConfirm = (e: any) => {
    setShowModal(false);
    setShowModal1(false);
    setShowModal3(false);
    setIsAgree(true);
  };
  const handleModalCancel = (e: any) => {
    setShowModal(false);
    setShowModal1(false);
    setShowModal3(false);
    setIsAgree(false);
  };

  const onClick = (info: any) => {
    localStorage.setItem('task_id', info.id);
    setActiveKey(info?.key);
    info?.key === 'trang-chu' ? setOpenKeys([]) : null;
  };

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <table className={styles.table_main}>
        <thead>
          <tr>
            {stages.map((stage: Stage) => (
              <th key={stage.id}>
                <div className={styles.mul}>
                  <div className={styles.stage}>
                    <div className={styles.name_stage}>
                      <span style={{ fontWeight: 'bold' }}>{stage?.name}</span>
                      <Giaidoan stage={stage} />
                    </div>
                    <div className={styles.danh_gia}>
                      <div className={styles.abc_linh_colums}>
                        <span>0 Nhiệm vụ</span>.<span>0 Quá hạn</span>.
                        <span>Chưa đánh giá</span>
                      </div>
                      <div className={styles.item_work_time}>
                        <Image
                          unoptimized
                          width={25}
                          height={25}
                          alt=""
                          src="https://hungha365.com/storageimage/GV/anh101.png"
                        />
                        <span>{stage?.completion_time} Giờ</span>
                      </div>
                    </div>
                    <div className={styles.name_tvqt}>
                      <div id="name">
                        <Image
                          width={18}
                          height={18}
                          alt=""
                          src="https://hungha365.com/storageimage/GV/Group 626671.png"
                        />
                        <span>{stage.stage_member}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </th>
            ))}
            <th className={styles.complete}>
              <div className={styles.name_complete}>
                <span style={{ fontWeight: 'bold' }}>Hoàn Thành</span>
                <Bacham />
              </div>
              <div className={styles.nv_complete}>
                <div>
                  <span>0</span>.Nhiệm vụ hoàn thành
                </div>
              </div>
            </th>
            <th className={styles.failure}>
              <div className={styles.name_failure}>
                <span style={{ fontWeight: 'bold' }}>Thất Bại</span>
                <Bacham />
              </div>
              <div className={styles.nv_complete}>
                <div>
                  <span>0</span>.Nhiệm vụ thất bại
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {stages.map((sourceStage: Stage, sourceIndex) => (
              <td key={sourceStage.id}>
                <Droppable droppableId={sourceStage.id.toString()}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{
                        background: snapshot.isDraggingOver ? 'white' : 'white',
                        minHeight: 500,
                      }}
                    >
                      {sourceStage.stageMission?.map(
                        (task: Task, taskIndex) => (
                          <Draggable
                            key={task.id}
                            draggableId={task.id.toString()} // Thêm id của giai đoạn vào draggableId
                            index={taskIndex}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={styles.mission}
                              >
                                <div className={styles.name_mission}>
                                  <div
                                    style={{
                                      fontWeight: 'bold',
                                      cursor: 'pointer',
                                    }}
                                    key={'xem-chi-tiet-nhiem-vu'}
                                    onClick={() =>
                                      onClick({
                                        key: 'xem-chi-tiet-nhiem-vu',
                                        id: task.id,
                                      })
                                    }
                                  >
                                    {task.name_misssion}
                                  </div>
                                  <Chamnv task={task} />
                                </div>
                                <div>
                                  <span>{task.misssion_description || ''}</span>
                                  <div className={styles.cart_eva}>
                                    <span>Thẻ dự án</span>
                                    <span
                                      style={{
                                        color: 'blue',
                                        cursor: 'pointer',
                                      }}
                                    >
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
                                  <span>{task?.misssion_staff_name}</span>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        )
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </td>
            ))}
            {/* <td className={styles.complete} key="111">
              <Droppable droppableId="111">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      background: snapshot.isDraggingOver ? 'white' : 'white',
                      minHeight: 500,
                    }}
                  >
                    {sourceStage.stageMission?.map((task: Task, taskIndex) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()} // Thêm id của giai đoạn vào draggableId
                        index={taskIndex}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={styles.mission}
                          >
                            <div className={styles.name_mission}>
                              <div
                                style={{
                                  fontWeight: 'bold',
                                  cursor: 'pointer',
                                }}
                                key={'xem-chi-tiet-nhiem-vu'}
                                onClick={() =>
                                  onClick({
                                    key: 'xem-chi-tiet-nhiem-vu',
                                    id: task.id,
                                  })
                                }
                              >
                                {task.name_misssion}
                              </div>
                              <Chamnv task={task} />
                            </div>
                            <div>
                              <span>{task.misssion_description || ''}</span>
                              <div className={styles.cart_eva}>
                                <span>Thẻ dự án</span>
                                <span
                                  style={{
                                    color: 'blue',
                                    cursor: 'pointer',
                                  }}
                                >
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
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </td>
            <td className={styles.failure} key="222">
              <Droppable droppableId="222">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      background: snapshot.isDraggingOver ? 'white' : 'white',
                      minHeight: 500,
                    }}
                  >
                    {sourceStage.stageMission?.map((task: Task, taskIndex) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id.toString()} // Thêm id của giai đoạn vào draggableId
                        index={taskIndex}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={styles.mission}
                          >
                            <div className={styles.name_mission}>
                              <div
                                style={{
                                  fontWeight: 'bold',
                                  cursor: 'pointer',
                                }}
                                key={'xem-chi-tiet-nhiem-vu'}
                                onClick={() =>
                                  onClick({
                                    key: 'xem-chi-tiet-nhiem-vu',
                                    id: task.id,
                                  })
                                }
                              >
                                {task.name_misssion}
                              </div>
                              <Chamnv task={task} />
                            </div>
                            <div>
                              <span>{task.misssion_description || ''}</span>
                              <div className={styles.cart_eva}>
                                <span>Thẻ dự án</span>
                                <span
                                  style={{
                                    color: 'blue',
                                    cursor: 'pointer',
                                  }}
                                >
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
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </td> */}
          </tr>
        </tbody>
      </table>
      {showModal && dragDropDetails && (
        <Modal open={showModal} onCancel={handleModalCancel}>
          <div className={styles.modal_modal}>
            <h2 className={styles._modal}>Chuyển tới {toStage?.name}</h2>
            <p>Giao lại cho :</p>
            <div className={styles.select_frame}>
              <SelectCustomize
                data={optionsMember}
                onIdChange={(id: any) => setId(id)}
              />
            </div>
            <div style={{ marginTop: '20px' }}>
              <p>Thời lượng (Kỳ vọng: {toStage?.completion_time}h)</p>
              <Input
                defaultValue={toStage?.completion_time}
                suffix="Giờ"
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            {option.map((op: any, index) => (
              <div key={index} style={{ marginTop: '20px' }}>
                {op.type_option == 1 && (
                  <>
                    <p>{op.name_option}</p>
                    <Input
                      type="number"
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </>
                )}
                {op.type_option == 2 && (
                  <>
                    <p>{op.name_option}</p>
                    <Input
                      type="text"
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </>
                )}
                {op.type_option == 3 && (
                  <>
                    <p>{op.name_option}</p>
                    <Input
                      type="date"
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </>
                )}
                {op.type_option == 4 && (
                  <>
                    <p>{op.name_option}</p>
                    <div style={{ display: 'flex', gap: '20px' }}>
                      <Input
                        type="date"
                        onChange={(e) => setTime(e.target.value)}
                      />
                      <Input
                        type="time"
                        onChange={(e) => setTime(e.target.value)}
                      />
                    </div>
                  </>
                )}
                {op.type_option == 5 && (
                  <>
                    <p>{op.name_option}</p>
                    <Input
                      type="text"
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </>
                )}
                {op.type_option == 6 && (
                  <>
                    <p>{op.name_option}</p>
                    <Input
                      type="text"
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </>
                )}
                <></>
                <p></p>
              </div>
            ))}

            <div className={styles.btn_modal}>
              <button onClick={(e) => handleModalCancel(e)}>Hủy</button>
              <button onClick={(e) => handleConfirm(e)}>Đồng ý</button>
            </div>
          </div>
        </Modal>
      )}
      {showModal1 && dragDropDetails && (
        <Modal open={showModal1} onCancel={handleModalCancel}>
          <div className={styles.modal_modal}>
            <h2 className={styles._modal}>Chuyển tới giai đoạn hoàn thành</h2>
            <p className={styles.p}>Xác nhận hoàn thành nhiệm vụ này?</p>
            <div className={styles.btn_modal}>
              <button onClick={handleModalCancel}>Hủy</button>
              <button onClick={handleConfirm}>Đồng ý</button>
            </div>
          </div>
        </Modal>
      )}
      {showModal3 && (
        <Modal open={showModal3} onCancel={handleModalCancel}>
          <div className={styles.modal_modal}>
            <h2 className={styles._modal}>Đánh dấu nhiệm vụ thất bại</h2>
            <p className={styles.p}>Đánh dấu thất bại nhiệm vụ này?</p>
            <div className={styles.btn_modal}>
              <button onClick={handleModalCancel}>Hủy</button>
              <button onClick={handleConfirm}>Đồng ý</button>
            </div>
          </div>
        </Modal>
      )}
    </DragDropContext>
  );
}

export default DragDropExample;
