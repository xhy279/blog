import { combineReducers } from "redux";
import PostReducer from './reducer_posts';
import { reducer as formReducer} from 'redux-form'; // name alias avoid namespace conflict

const rootReducer = combineReducers({
  posts: PostReducer,
  form: formReducer

});

export default rootReducer; 