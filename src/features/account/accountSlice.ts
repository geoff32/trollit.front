import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { authenticate } from '../authentication/authenticationSlice';
import { fetchCreateAccount } from './accountApi';
import { CreateAccount } from './models';

export interface AccountState {
  status?: 'created' | 'loading' | 'failed';
}

const initialState: AccountState = {
};

export const createAccountAsync = createAsyncThunk(
  'account/createAccount',
  async (account: CreateAccount, { dispatch }) => {
    const { account: { userName, troll } } = await fetchCreateAccount(account);

    dispatch(authenticate({ userName, troll }));
  }
);

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    resetAccount: (state) => {
      state.status = initialState.status
    }
  },
  extraReducers: (builder) => {
    builder
      // createAccount
      .addCase(createAccountAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createAccountAsync.fulfilled, (state, action) => {
        state.status = 'created';
      })
      .addCase(createAccountAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { resetAccount } = accountSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAccountStatus = (state: RootState) => state.account.status;

export default accountSlice.reducer;
