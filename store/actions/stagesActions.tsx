import {
  FETCH_STAGES_SUCCESS,
  ADD_STAGE_SUCCESS,
  DEL_STAGE_SUCCESS,
  FETCH_FOLLOWS_SUCCESS,
  DEL_FOLLOW_SUCCESS,
  FETCH_TASKS_SUCCESS,
  ADD_TASK_SUCCESS,
  DEL_TASK_SUCCESS,
  EDIT_STAGE_SUCCESS,
  MOVE_TASK_SUCCESS,
} from '../constants';
import { POST } from '@/pages/api/auth';
import { Dispatch } from 'redux';
import { RootState } from '../reducers';
import { ThunkDispatch } from 'redux-thunk';
import { message } from 'antd';

//giai đoạn
export interface Stage {
  id: string;
  name: string;
  stage_management: string;
  stage_member: string;
  stage_evaluate: string;
  completion_time: string;
  status_completion_time: string;
  stageMission: Task[];
}

export interface Task {
  id: string;
  name_misssion: string;
  misssion_staff_id: string;
  misssion_staff_name: string;
  misssion_description: string;
  card: string;
}

export interface Follow {
  userName: string;
  _id: string;
}

export interface AddStageSuccessAction {
  type: typeof ADD_STAGE_SUCCESS;
  payload: Stage;
}

export interface EditStageSuccessAction {
  type: typeof EDIT_STAGE_SUCCESS;
  payload: Stage;
}

export interface AddTaskSuccessAction {
  type: typeof ADD_TASK_SUCCESS;
  payload: {
    taskData: Task;
  };
}

export interface MoveTaskSuccessAction {
  type: typeof MOVE_TASK_SUCCESS;
  payload: {
    sourceStageId: string;
    destinationStageId: string;
    draggableId: string;
  };
}

export interface FetchStagesSuccessAction {
  type: typeof FETCH_STAGES_SUCCESS;
  payload: Stage[];
}

export interface FetchFollowSuccessAction {
  type: typeof FETCH_FOLLOWS_SUCCESS;
  payload: Follow[];
}

export interface FetchTaskSuccessAction {
  type: typeof FETCH_TASKS_SUCCESS;
  payload: Task[];
}

export interface DelStageSuccessAction {
  type: typeof DEL_STAGE_SUCCESS;
  payload: string; // Kiểu dữ liệu của payload là chuỗi (string)
}

export interface DelFollowSuccessAction {
  type: typeof DEL_FOLLOW_SUCCESS;
  payload: string; // Kiểu dữ liệu của payload là chuỗi (string)
}

export interface DelTaskSuccessAction {
  type: typeof DEL_TASK_SUCCESS;
  payload: string; // Kiểu dữ liệu của payload là chuỗi (string)
}

export const addStageSuccess = (stageData: Stage): AddStageSuccessAction => ({
  type: ADD_STAGE_SUCCESS,
  payload: stageData,
});

export const addStage = (idProcess: string, stageData: Stage) => {
  return (
    dispatch: ThunkDispatch<
      RootState,
      undefined,
      AddStageSuccessAction | FetchStagesSuccessAction
    >
  ) => {
    // Gọi API để thêm mới tiến trình
    POST(
      `projects/chi-tiet-du-an-theo-quy-trinh/${idProcess}/add-stage`,
      stageData
    ).then((response) => {
      const newStage =
        response?.data.processStage || response?.data.processStages;
      message.success('Thêm mới giai đoạn thành công');
      dispatch(addStageSuccess(newStage));

      // Gọi lại dữ liệu danh sách tiến trình
      dispatch(fetchStages(idProcess) as any); // Sử dụng 'as any' tạm thời để tránh lỗi thiếu type
    });
  };
};
export const editStageSuccess = (stageData: Stage): EditStageSuccessAction => ({
  type: EDIT_STAGE_SUCCESS,
  payload: stageData,
});

export const editStage = (idProcess: string, stageData: Stage) => {
  return (
    dispatch: ThunkDispatch<
      RootState,
      undefined,
      EditStageSuccessAction | FetchStagesSuccessAction
    >
  ) => {
    // Gọi API để thêm mới tiến trình
    POST(
      `projects/chi-tiet-du-an-theo-quy-trinh/edit-stage/${stageData.id}`,
      stageData
    ).then((response) => {
      const editStage =
        response?.data.processStage || response?.data.newProcess;
      message.success('Chỉnh sửa giai đoạn thành công');
      dispatch(editStageSuccess(editStage));

      // Gọi lại dữ liệu danh sách tiến trình
      dispatch(fetchStages(idProcess) as any); // Sử dụng 'as any' tạm thời để tránh lỗi thiếu type
    });
  };
};

export const addTaskSuccess = (taskData: Task): AddTaskSuccessAction => {
  return {
    type: ADD_TASK_SUCCESS,
    payload: {
      taskData,
    },
  };
};

export const addTask = (idProcess: string, taskData: Task) => {
  return (dispatch: Dispatch<AddTaskSuccessAction>) => {
    // Gọi API để thêm nhiệm vụ
    POST(
      `projects/chi-tiet-du-an-theo-quy-trinh/${idProcess}/add-mission`,
      taskData
    )
      .then((response) => {
        if (response.result) {
          message.success('Thêm nhiệm vụ thành công');
          dispatch(addTaskSuccess(taskData));
          dispatch(fetchStages(idProcess) as any);
        } else {
          alert('Thêm nhiệm vụ thất bại');
        }
      })
      .catch((error) => {
        alert('Thêm nhiệm vụ thất bại');
      });
  };
};

export const moveTaskSuccess = (
  sourceStageId: string,
  destinationStageId: string,
  draggableId: string
): MoveTaskSuccessAction => ({
  type: MOVE_TASK_SUCCESS,
  payload: {
    sourceStageId,
    destinationStageId,
    draggableId,
  },
});

export const moveTask = (
  sourceStageId: string,
  destinationStageId: string,
  draggableId: string,
  formData: FormData
) => {
  return (
    dispatch: ThunkDispatch<RootState, undefined, MoveTaskSuccessAction>
  ) => {
    POST(
      `projects/chi-tiet-nhiem-vu/${draggableId}/cap-nhap-giai-doan-cho-nhiem-vu`,
      formData
    )
      .then((response) => {
        if (response.result) {
          dispatch(
            moveTaskSuccess(sourceStageId, destinationStageId, draggableId)
          );
          const idProcess = localStorage.getItem('process_id');
          dispatch(fetchStages(idProcess) as any);
          message.success('Chuyển nhiệm vụ thành công');
        } else {
          alert('Chuyển nhiệm vụ thất bại');
        }
      })
      .catch((error) => {
        alert('Chuyển nhiệm vụ thất bại');
      });
  };
};

export const fetchStagesSuccess = (
  stagesData: Stage[]
): FetchStagesSuccessAction => ({
  type: FETCH_STAGES_SUCCESS,
  payload: stagesData,
});

export const fetchFollowSuccess = (
  followData: Follow[]
): FetchFollowSuccessAction => ({
  type: FETCH_FOLLOWS_SUCCESS,
  payload: followData,
});

export const fetchTaskSuccess = (taskData: Task[]): FetchTaskSuccessAction => ({
  type: FETCH_TASKS_SUCCESS,
  payload: taskData,
});

export const fetchStages = (idProcess: any) => {
  return (dispatch: Dispatch<FetchStagesSuccessAction>) => {
    POST(`projects/chi-tiet-du-an-theo-quy-trinh/${idProcess}`)
      .then((res) => {
        dispatch(
          fetchStagesSuccess(res.data.processStage || res.data.processStages)
        );
        dispatch(fetchFollowSuccess(res.data.listFollow) as any);
        dispatch(
          fetchTaskSuccess(
            res.data.processStage.stageMission || res.data.stageMission
          ) as any
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const delStageSuccess = (stageId: string): DelStageSuccessAction => ({
  type: DEL_STAGE_SUCCESS,
  payload: stageId, // Truyền stageId (chuỗi) vào payload
});

export const delStage = (stageId: string) => {
  return (
    dispatch: ThunkDispatch<
      RootState,
      undefined,
      AddStageSuccessAction | FetchStagesSuccessAction | DelStageSuccessAction
    >
  ) => {
    // Gọi API để xóa giai đoạn
    POST(`projects/chi-tiet-du-an-theo-quy-trinh/${stageId}/delete-stage`, null)
      .then((response) => {
        if (response.result) {
          message.success('Xóa giai đoạn thành công');
          dispatch(delStageSuccess(stageId));
        } else {
          alert('Xóa giai đoạn thất bại');
        }
      })
      .catch((error) => {
        alert('Xóa giai đoạn thất bại');
      });
  };
};

const delFollowSuccess = (id: string): DelFollowSuccessAction => ({
  type: DEL_FOLLOW_SUCCESS,
  payload: id, // Truyền stageId (chuỗi) vào payload
});

export const delFollow = (id: string, idProcess: string, idString: string) => {
  return (
    dispatch: ThunkDispatch<
      RootState,
      undefined,
      AddStageSuccessAction | FetchStagesSuccessAction | DelStageSuccessAction
    >
  ) => {
    dispatch(delFollowSuccess(id) as any);
    POST(`projects/chi-tiet-du-an-theo-quy-trinh/${idProcess}/edit-follow`, {
      process_follow: idString ? idString : null,
    })
      .then((response) => {
        if (response.result) {
          message.success('Xóa người theo dõi thành công');
        } else {
          alert('Xóa người theo dõi thất bại');
        }
      })
      .catch((error) => {
        alert('Xóa người thất bại');
      });
  };
};

const delTaskSuccess = (taskId: string): DelTaskSuccessAction => ({
  type: DEL_TASK_SUCCESS,
  payload: taskId, // Truyền stageId (chuỗi) vào payload
});
export const delTask = (idProcess: string, taskId: string) => {
  return async (
    dispatch: ThunkDispatch<
      RootState,
      undefined,
      AddTaskSuccessAction | FetchStagesSuccessAction | DelTaskSuccessAction
    >
  ) => {
    // Gọi API để xóa giai đoạn
    try {
      const response = await POST(
        `projects/chi-tiet-du-an-theo-quy-trinh/${taskId}/delete-mission`,
        null
      );
      if (response.result) {
        message.success('Xóa nhiệm vụ thành công');
        dispatch(delTaskSuccess(taskId));
        await dispatch(fetchStages(idProcess) as any);
      } else {
        alert('Xóa nhiệm thất bại');
      }
    } catch (error) {
      alert('Xóa nhiệm vụ thất bại');
      console.error(error);
    }
  };
};
