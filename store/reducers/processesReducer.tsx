import {
  ADD_PROCESS_SUCCESS,
  DEL_PROCESS_SUCCESS,
  FETCH_PROCESSES_SUCCESS,
  ADD_PROCESS_FAILURE,
  EDIT_PROCESS_SUCCESS,
  EDIT_PROCESS_FAILURE
} from '../constants';
import { Process } from '../actions/processesActions';

export interface ProcessesState {
  processes: Process[];
  isProcessAdded: boolean;
  isProcessEdited: boolean;
}

const initialState: ProcessesState = {
  processes: [],
  isProcessAdded: false,
  isProcessEdited: false,
};

type Action = {
  type:
    | typeof ADD_PROCESS_SUCCESS
    | typeof FETCH_PROCESSES_SUCCESS
    | typeof DEL_PROCESS_SUCCESS
    | typeof ADD_PROCESS_FAILURE
    | typeof EDIT_PROCESS_SUCCESS
    | typeof EDIT_PROCESS_FAILURE
  payload: Process | Process[];
};

const processesReducer = (
  state: ProcessesState = initialState,
  action: Action
): ProcessesState => {
  switch (action.type) {
    case ADD_PROCESS_SUCCESS:
      return {
        ...state,
        processes: [...state.processes, action.payload as Process],
        isProcessAdded: true,
      };
    case ADD_PROCESS_FAILURE:
      return state; // Không thay đổi state khi thêm quy trình thất bại
    case EDIT_PROCESS_SUCCESS:
      const updatedStage = action.payload as Process;
      return {
        ...state,
        processes: state.processes.map((process: Process) =>
          process.process_id === updatedStage?.process_id
            ? updatedStage
            : process
        ),
        isProcessEdited: true,
      };
    case EDIT_PROCESS_FAILURE:
      return state; // Không thay đổi state khi thêm quy trình thất bại
    case FETCH_PROCESSES_SUCCESS:
      return {
        ...state,
        processes: action.payload as Process[],
        isProcessAdded: false,
      };
    case DEL_PROCESS_SUCCESS:
      return {
        ...state,
        processes: state.processes.filter(
          (process) => process.process_id !== (action.payload as any)
        ),
      };
    default:
      return state;
  }
};

export default processesReducer;
