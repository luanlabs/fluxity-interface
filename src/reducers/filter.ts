import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilterTokens } from 'src/constants/types';

interface FilterState {
  filteredValues: IFilterTokens;
}

const initialState: FilterState = {
  filteredValues: {
    tokens: [],
    showSentStreams: false,
    showReceivedStreams: false,
  },
};

const filter = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterValues: (state, action: PayloadAction<IFilterTokens>) => {
      state.filteredValues = action.payload;
    },
  },
});

export const { setFilterValues } = filter.actions;
export default filter.reducer;
