import { combineReducers } from 'redux';

import pagesReducer from 'state/slices/pages';

const rootReducer = combineReducers({
  pages: pagesReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
