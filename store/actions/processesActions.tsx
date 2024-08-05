import {
  FETCH_PROCESSES_SUCCESS,
  ADD_PROCESS_SUCCESS,
  DEL_PROCESS_SUCCESS,
  ADD_PROCESS_FAILURE,
  EDIT_PROCESS_FAILURE,
  EDIT_PROCESS_SUCCESS,
} from '../constants';
import { POST } from '@/pages/api/auth';
import { Dispatch } from 'redux';
import { RootState } from '../reducers';
import { ThunkDispatch } from 'redux-thunk';
import { message } from 'antd';

//quy trình
export interface Process {
  process_id: string;
  process_name: string;
  process_description: string;
  time_in: string;
  time_out: string;
  date_start: string;
  date_end: string;
  process_card: string;
  process_management: string;
  process_follow: string;
  process_member: string;
  process_evaluate: string;
  process_failure: string;
}

export interface AddProcessSuccessAction {
  type: typeof ADD_PROCESS_SUCCESS;
  payload: Process;
}

export interface FetchProcessesSuccessAction {
  type: typeof FETCH_PROCESSES_SUCCESS;
  payload: Process[];
}

export interface AddProcessFailureAction {
  type: typeof ADD_PROCESS_FAILURE;
}

export interface EditProcessSuccessAction {
  type: typeof EDIT_PROCESS_SUCCESS;
  payload: Process;
}

export interface EditProcessFailureAction {
  type: typeof EDIT_PROCESS_FAILURE;
}

export interface DelProcessSuccessAction {
  type: typeof DEL_PROCESS_SUCCESS;
  payload: string; // Kiểu dữ liệu của payload là chuỗi (string)
}

export interface CloseProcessSuccessAction {
  type: typeof DEL_PROCESS_SUCCESS;
  payload: string; // Kiểu dữ liệu của payload là chuỗi (string)
}

export const addProcessSuccess = (
  processData: Process
): AddProcessSuccessAction => ({
  type: ADD_PROCESS_SUCCESS,
  payload: processData,
});

export const fetchProcessesSuccess = (
  processesData: Process[]
): FetchProcessesSuccessAction => ({
  type: FETCH_PROCESSES_SUCCESS,
  payload: processesData,
});

export const addProcessFailure = (): AddProcessFailureAction => ({
  type: ADD_PROCESS_FAILURE,
});
export const addProcess = (processData: Process) => {
  return async (
    dispatch: ThunkDispatch<
      RootState,
      undefined,
      AddProcessSuccessAction | FetchProcessesSuccessAction
    >
  ) => {
    try {
      const response = await POST(
        'projects/quan-ly-du-an-theo-quy-trinh/them-quy-trinh',
        processData
      );
      const newProcess = response?.data.process;
      dispatch(addProcessSuccess(newProcess));
      if (response.result) {
        message.success('Thêm quy trình thành công');
        // Gọi lại dữ liệu danh sách tiến trình
        dispatch(fetchProcesses());
      } else {
        alert('Thêm quy trình thất bại');
        dispatch(addProcessFailure() as any);
      }
    } catch (error) {
      alert('Thêm quy trình thất bại');
      dispatch(addProcessFailure() as any);
    }
  };
};

export const editProcessSuccess = (
  processData: Process
): EditProcessSuccessAction => ({
  type: EDIT_PROCESS_SUCCESS,
  payload: processData,
});

export const editProcessFailure = (): EditProcessFailureAction => ({
  type: EDIT_PROCESS_FAILURE,
});
export const editProcess = (processData: Process) => {
  return async (
    dispatch: ThunkDispatch<
      RootState,
      undefined,
      EditProcessSuccessAction | FetchProcessesSuccessAction
    >
  ) => {
    try {
      const response = await POST(
        `projects/chi-tiet-du-an-theo-quy-trinh/${processData.process_id}/edit`,
        processData
      );
      const newProcess = response?.data.newProcess;
      dispatch(editProcessSuccess(newProcess));
      if (response.result) {
        alert('Sửa quy trình thành công');
        // Gọi lại dữ liệu danh sách tiến trình
        dispatch(fetchProcesses());
      } else {
        alert('Sửa quy trình thất bại');
        dispatch(editProcessFailure() as any);
      }
    } catch (error) {
      alert('Sửa quy trình thất bại');
      dispatch(editProcessFailure() as any);
    }
  };
};

export const fetchProcesses = () => {
  return (dispatch: Dispatch<FetchProcessesSuccessAction>) => {
    POST('projects/quan-ly-du-an-theo-quy-trinh')
      .then((res) => {
        dispatch(fetchProcessesSuccess(res.data.process));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const delProcessSuccess = (
  processId: string
): DelProcessSuccessAction => ({
  type: DEL_PROCESS_SUCCESS,
  payload: processId, // Truyền stageId (chuỗi) vào payload
});
export const delProcess = (processId: string) => {
  return (
    dispatch: ThunkDispatch<
      RootState,
      undefined,
      | AddProcessSuccessAction
      | FetchProcessesSuccessAction
      | DelProcessSuccessAction
    >
  ) => {
    // Gọi API để xóa giai đoạn
    POST(`projects/chi-tiet-du-an-theo-quy-trinh/${processId}/delete`, null)
      .then((response) => {
        if (response.result) {
          message.success('Xóa quy trình thành công');
          dispatch(delProcessSuccess(processId));
        } else {
          alert('Xóa quy trình thất bại');
        }
      })
      .catch((error) => {
        alert('Xóa quy trình thất bại');
      });
  };
};

export const closeProcess = (processId: string) => {
  return (
    dispatch: ThunkDispatch<
      RootState,
      undefined,
      | AddProcessSuccessAction
      | FetchProcessesSuccessAction
      | DelProcessSuccessAction
      | CloseProcessSuccessAction
    >
  ) => {
    // Gọi API để xóa giai đoạn
    POST(`projects/chi-tiet-du-an-theo-quy-trinh/${processId}/switch`, null)
      .then((response) => {
        if (response.result) {
          alert('Đóng quy trình thành công');
          dispatch(delProcessSuccess(processId));
        } else {
          alert('Đóng quy trình thất bại');
        }
      })
      .catch((error) => {
        alert('Đóng quy trình thất bại');
      });
  };
};
