import { SET_SIDEBAR } from '../constants';

const initialSideBarState = {
  isOpen: false,
};

type ActionSideBar = {
  type: typeof SET_SIDEBAR;
  payload: boolean;
};

const sideBarReducer = (
  state = initialSideBarState,
  action: ActionSideBar
): typeof initialSideBarState => {
  switch (action.type) {
    case SET_SIDEBAR:
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    default:
      return state;
  }
};

export default sideBarReducer;
