import {configureStore} from '@reduxjs/toolkit';

import {rtkQueryErrorLogger} from './middleware/errorHandler';
import errorReducer from './slices/errorSlice';
import alertReducer from './slices/alertSlice';
import {api} from './api';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    error: errorReducer,
    alert: alertReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(rtkQueryErrorLogger).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
