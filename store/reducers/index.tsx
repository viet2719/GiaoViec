// file: reducers/index.ts

import { combineReducers } from 'redux';
import processesReducer, { ProcessesState } from './processesReducer';
import stagesReducer, { StagesState } from './stagesReducer';
import followsReducer, { FollowsState } from './followsReducer';
import optionsReducer, { OptionsState } from './optionsReducer';
import sideBarReducer from './sideBarReducer';
// import tasksReducer, { TasksState } from './tasksReducer';
export interface RootState {
  processes: ProcessesState;
  stages: StagesState;
  follows: FollowsState;
  options: OptionsState;
}

const rootReducer = combineReducers({
  processes: processesReducer,
  stages: stagesReducer,
  follows: followsReducer,
  options: optionsReducer,
  sideBar: sideBarReducer,
});

export default rootReducer;
