import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

import listReducer from './slices/list';
import activeReducer from './slices/active';
import chatReducer from './slices/chat';
import authReducer from './slices/auth';

// import audioCallReducer from './slices/audioCall';
// import videoCallReducer from './slices/videoCall';



const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  //   whitelist: [],
  //   blacklist: [],
};

const rootReducer = combineReducers({
  list : listReducer,
  auth: authReducer,
  chat: chatReducer,
  active : activeReducer,
//   audioCall: audioCallReducer,
//   videoCall: videoCallReducer,
});

export { rootPersistConfig,rootReducer};