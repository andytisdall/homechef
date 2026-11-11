import {createSlice} from '@reduxjs/toolkit';

const errorSlice = createSlice({
  name: 'error',
  initialState: {message: ''},
  reducers: {
    setError(state, action) {
      state.message = action.payload;
    },
  },
});

export const {setError} = errorSlice.actions;

export default errorSlice.reducer;
