import {
  ADD_STAGE_SUCCESS,
  FETCH_STAGES_SUCCESS,
  DEL_STAGE_SUCCESS,
  ADD_TASK_SUCCESS,
  EDIT_STAGE_SUCCESS,
  MOVE_TASK_SUCCESS,
} from '../constants';
import { Stage, Task } from '../actions/stagesActions';

export interface StagesState {
  stages: Stage[];
}

const initialStagesState: StagesState = {
  stages: [],
};

type ActionStages = {
  type:
    | typeof ADD_STAGE_SUCCESS
    | typeof FETCH_STAGES_SUCCESS
    | typeof DEL_STAGE_SUCCESS
    | typeof ADD_TASK_SUCCESS
    | typeof EDIT_STAGE_SUCCESS
    | typeof MOVE_TASK_SUCCESS;
  payload: Stage | Stage[] | Task;
};

const stagesReducer = (
  state: StagesState = initialStagesState,
  action: ActionStages
): StagesState => {
  switch (action.type) {
    case ADD_STAGE_SUCCESS:
      return {
        ...state,
        stages: [...state.stages, action.payload as Stage],
      };
    case EDIT_STAGE_SUCCESS:
      const updatedStage = action.payload as Stage;
      return {
        ...state,
        stages: state.stages.map((stage: Stage) =>
          stage.id === updatedStage?.id ? updatedStage : stage
        ),
      };
    case FETCH_STAGES_SUCCESS:
      return {
        ...state,
        stages: action.payload as Stage[],
      };
    case DEL_STAGE_SUCCESS:
      return {
        ...state,
        stages: state.stages.filter(
          (stage) => stage.id !== (action.payload as any)
        ),
      };

    //add task to stage 1 in process
    case ADD_TASK_SUCCESS:
      const { taskData } = action.payload as any;

      const updatedStages = [...state.stages];
      const firstStageIndex = 0; // Chỉ mục của giai đoạn đầu tiên trong mảng stages

      const newTask: Task = {
        // Tạo một nhiệm vụ mới với dữ liệu từ action.payload.task
        // Nếu bạn muốn áp dụng giá trị mặc định cho các trường khác, hãy thay đổi dữ liệu ở đây
        ...taskData,
      };

      updatedStages[firstStageIndex] = {
        ...updatedStages[firstStageIndex],
        stageMission: [
          // Thêm nhiệm vụ mới vào mảng stageMission của giai đoạn đầu tiên
          ...updatedStages[firstStageIndex].stageMission,
          newTask,
        ],
      };

      return {
        ...state,
        stages: updatedStages,
      };
    case MOVE_TASK_SUCCESS:
      const { sourceStageId, destinationStageId, draggableId } =
        action.payload as any;

      const upStages = [...state.stages];

      const sourceStageIndex = upStages.findIndex(
        (stage) => stage.id === sourceStageId
      );
      const destinationStageIndex = upStages.findIndex(
        (stage) => stage.id === destinationStageId
      );

      if (sourceStageIndex === -1 || destinationStageIndex === -1) {
        return state; // Không tìm thấy giai đoạn nguồn hoặc giai đoạn đích, không thực hiện thay đổi
      }

      const sourceStage = upStages[sourceStageIndex];
      const destinationStage = upStages[destinationStageIndex];

      const taskIndex = sourceStage.stageMission.findIndex(
        (task: Task) => task.id === draggableId
      );

      if (taskIndex === -1) {
        return state; // Không tìm thấy nhiệm vụ, không thực hiện thay đổi
      }

      const task = sourceStage.stageMission[taskIndex];

      const updatedSourceStage = {
        ...sourceStage,
        stageMission: sourceStage.stageMission.filter(
          (task: Task) => task.id !== draggableId
        ),
      };

      const updatedDestinationStage = {
        ...destinationStage,
        stageMission: destinationStage.stageMission.concat(task),
      };

      const updStages = [...upStages];
      updStages[sourceStageIndex] = updatedSourceStage;
      updStages[destinationStageIndex] = updatedDestinationStage;

      return {
        ...state,
        stages: updStages,
      };
    default:
      return state;
  }
};

export default stagesReducer;
