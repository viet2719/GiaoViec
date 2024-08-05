import {
  ADD_OPTION_SUCCESS,
  DEL_OPTION_SUCCESS,
  FETCH_OPTIONS_SUCCESS,
  ADD_OPTION_FAILURE,
} from '../constants';
import { POST } from '@/pages/api/auth';
import { Dispatch } from 'redux';
import { RootState } from '../reducers';
import { ThunkDispatch } from 'redux-thunk';
import { message } from 'antd';

//quy trình
export interface Option {
  id: string;
  type_option: string;
  name_option: string;
  with_stage: string;
  des_option: string;
  is_required: string;
}

export interface AddOptionSuccessAction {
  type: typeof ADD_OPTION_SUCCESS;
  payload: Option;
}

export interface FetchOptionsSuccessAction {
  type: typeof FETCH_OPTIONS_SUCCESS;
  payload: Option[];
}

export interface AddOptionFailureAction {
  type: typeof ADD_OPTION_FAILURE;
}

export interface DelOptionSuccessAction {
  type: typeof DEL_OPTION_SUCCESS;
  payload: string; // Kiểu dữ liệu của payload là chuỗi (string)
}

export interface CloseOptionSuccessAction {
  type: typeof DEL_OPTION_SUCCESS;
  payload: string; // Kiểu dữ liệu của payload là chuỗi (string)
}

export const addOptionSuccess = (
  optionData: Option
): AddOptionSuccessAction => ({
  type: ADD_OPTION_SUCCESS,
  payload: optionData,
});

export const fetchOptionsSuccess = (
  optionsData: Option[]
): FetchOptionsSuccessAction => ({
  type: FETCH_OPTIONS_SUCCESS,
  payload: optionsData,
});

export const addOptionFailure = (): AddOptionFailureAction => ({
  type: ADD_OPTION_FAILURE,
});
export const addOption = (idProcess: string, optionData: Option) => {
  return async (
    dispatch: ThunkDispatch<
      RootState,
      undefined,
      AddOptionSuccessAction | FetchOptionsSuccessAction
    >
  ) => {
    try {
      const response = await POST(
        `projects/chi-tiet-du-an-theo-quy-trinh/${idProcess}/add-option`,
        optionData
      );
      const newOption = response?.data.processOption;
      dispatch(addOptionSuccess(newOption));
      if (response.result) {
        message.success('Thêm tùy chỉnh thành công');
        // Gọi lại dữ liệu danh sách tiến trình
        dispatch(fetchOptions(idProcess) as any);
      } else {
        alert('Thêm tùy chỉnh thất bại');
        dispatch(addOptionFailure() as any);
      }
    } catch (error) {
      alert('Thêm tùy chỉnh thất bại');
      dispatch(addOptionFailure() as any);
    }
  };
};

export const fetchOptions = (idProcess: any) => {
  return (dispatch: Dispatch<FetchOptionsSuccessAction>) => {
    POST(`projects/chi-tiet-du-an-theo-quy-trinh/${idProcess}/option`)
      .then((res) => {
        dispatch(fetchOptionsSuccess(res.data.processOption));
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const delOptionSuccess = (optionId: string): DelOptionSuccessAction => ({
  type: DEL_OPTION_SUCCESS,
  payload: optionId, // Truyền stageId (chuỗi) vào payload
});
export const delOption = (optionId: string) => {
  return (
    dispatch: ThunkDispatch<
      RootState,
      undefined,
      | AddOptionSuccessAction
      | FetchOptionsSuccessAction
      | DelOptionSuccessAction
    >
  ) => {
    // Gọi API để xóa giai đoạn
    POST(
      `projects/chi-tiet-du-an-theo-quy-trinh/delete-option/${optionId}`,
      null
    )
      .then((response) => {
        if (response.result) {
          message.success('Xóa tùy chỉnh thành công');
          dispatch(delOptionSuccess(optionId));
        } else {
          alert('Xóa quy trình thất bại');
        }
      })
      .catch((error) => {
        alert('Xóa quy trình thất bại');
      });
  };
};

export const closeOption = (optionId: string) => {
  return (
    dispatch: ThunkDispatch<
      RootState,
      undefined,
      | AddOptionSuccessAction
      | FetchOptionsSuccessAction
      | DelOptionSuccessAction
      | CloseOptionSuccessAction
    >
  ) => {
    // Gọi API để xóa giai đoạn
    POST(`projects/chi-tiet-du-an-theo-quy-trinh/${optionId}/switch`, null)
      .then((response) => {
        if (response.result) {
          alert('Đóng quy trình thành công');
          dispatch(delOptionSuccess(optionId));
        } else {
          alert('Đóng quy trình thất bại');
        }
      })
      .catch((error) => {
        alert('Đóng quy trình thất bại');
      });
  };
};
