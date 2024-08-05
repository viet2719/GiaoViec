import {
  ADD_FOLLOW_SUCCESS,
  DEL_FOLLOW_SUCCESS,
  FETCH_FOLLOWS_SUCCESS,
} from '../constants';
import { Follow } from '../actions/stagesActions';

export interface FollowsState {
  follows: Follow[];
}

const initialFollowsState: FollowsState = {
  follows: [],
};

type ActionFollows = {
  type:
    | typeof ADD_FOLLOW_SUCCESS
    | typeof FETCH_FOLLOWS_SUCCESS
    | typeof DEL_FOLLOW_SUCCESS;
  payload: Follow | Follow[];
};

const followsReducer = (
  state: FollowsState = initialFollowsState,
  action: ActionFollows
): FollowsState => {
  switch (action.type) {
    case ADD_FOLLOW_SUCCESS:
      return {
        ...state,
        follows: [...state.follows, action.payload as Follow],
      };
    case FETCH_FOLLOWS_SUCCESS:
      return {
        ...state,
        follows: action.payload as Follow[],
      };
    case DEL_FOLLOW_SUCCESS:
      return {
        ...state,
        follows: state.follows.filter(
          (folow) => folow._id !== (action.payload as any)
        ),
      };
    default:
      return state;
  }
};

export default followsReducer;
