import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IResponseToken } from 'src/constants/types';

export interface IToken extends IResponseToken {
  balance: string;
}

const initialState: IToken[] = [];

export const tokens = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    loadTokens: (_, action: PayloadAction<IToken[]>) => {
      return action.payload;
    },
  },
});

export const { loadTokens } = tokens.actions;

export default tokens.reducer;
