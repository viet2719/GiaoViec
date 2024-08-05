import {
  ADD_OPTION_SUCCESS,
  DEL_OPTION_SUCCESS,
  FETCH_OPTIONS_SUCCESS,
  ADD_OPTION_FAILURE,
} from '../constants';
import { Option } from '../actions/optionsAction';

export interface OptionsState {
  options: Option[];
  isOptionAdded: boolean;
}

const initialState: OptionsState = {
  options: [],
  isOptionAdded: false,
};

type Action = {
  type:
    | typeof ADD_OPTION_SUCCESS
    | typeof FETCH_OPTIONS_SUCCESS
    | typeof DEL_OPTION_SUCCESS
    | typeof ADD_OPTION_FAILURE;
  payload: Option | Option[];
};

const optionsReducer = (
  state: OptionsState = initialState,
  action: Action
): OptionsState => {
  switch (action.type) {
    case ADD_OPTION_SUCCESS:
      return {
        ...state,
        options: [...state.options, action.payload as Option],
        isOptionAdded: true,
      };
    case ADD_OPTION_FAILURE:
      return state; // Không thay đổi state khi thêm quy trình thất bại
    case FETCH_OPTIONS_SUCCESS:
      return {
        ...state,
        options: action.payload as Option[],
        isOptionAdded: false,
      };
    case DEL_OPTION_SUCCESS:
      return {
        ...state,
        options: state.options.filter(
          (option) => option.id !== (action.payload as any)
        ),
      };
    default:
      return state;
  }
};

export default optionsReducer;
