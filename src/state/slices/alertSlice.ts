import {createSlice} from '@reduxjs/toolkit';

const alertSlice = createSlice({
  name: 'alert',
  initialState: {message: ''},
  reducers: {
    setAlert(state, action) {
      state.message = action.payload;
    },
  },
});

export const {setAlert} = alertSlice.actions;

export default alertSlice.reducer;
