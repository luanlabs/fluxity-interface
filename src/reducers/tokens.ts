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

    loadClaimedTokens: (state, action: PayloadAction<IToken[]>) => {
      for (let i = 0; i < action.payload.length; ++i) {
        let index = state.findIndex(
          (token) =>
            token.symbol === action.payload[i].symbol &&
            token.address === action.payload[i].address,
        );
        state[index] = action.payload[i];
      }
    },

    clearTokenBalances: (state) => {
      for (let i = 0; i < state.length; ++i) {
        state[i].balance = '0';
      }
    },
  },
});

export const { loadTokens, loadClaimedTokens, clearTokenBalances } = tokens.actions;

export default tokens.reducer;
