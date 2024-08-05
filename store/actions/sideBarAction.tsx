import { SET_SIDEBAR } from '../constants';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../reducers';

export interface SetSideBar {
  type: typeof SET_SIDEBAR;
  payload: boolean;
}

export const setSidebarSuccess = (isOpen: boolean): SetSideBar => ({
  type: SET_SIDEBAR,
  payload: isOpen,
});

export const setSideBar = (isOpen: boolean) => {
  return (dispatch: ThunkDispatch<RootState, undefined, SetSideBar>) => {
    dispatch(setSidebarSuccess(isOpen));
  };
};
