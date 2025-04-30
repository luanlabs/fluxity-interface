import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IRequests {
  count: number;
}
const initialState: IRequests = { count: 0 };

export const requests = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    updateRequest: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
  },
});

export const { updateRequest } = requests.actions;

export default requests.reducer;
