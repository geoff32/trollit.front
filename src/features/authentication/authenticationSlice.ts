import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchSignIn, fetchSignOut, fetchValidate } from './authenticationApi';
import { User } from './models/User';

export interface AuthenticationState {
  user?: User;
  status: 'authenticated' | 'not authenticated' | 'loading' | 'failed';
}

const initialState: AuthenticationState = {
  status: 'not authenticated',
};

export const signInAsync = createAsyncThunk(
  'authentication/signIn',
  async (user: { username: string, password: string}) => {
    const response = await fetchSignIn(user);
    // The value we return becomes the `fulfilled` action payload
    return response.user;
  }
);

export const validateAsync = createAsyncThunk(
  'authentication/validate',
  async () => {
    const response = await fetchValidate();

    return response.user;
  }
);

export const signOutAsync = createAsyncThunk(
  'authentication/signOut',
  async () => await fetchSignOut()
);

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.status = 'authenticated';
        state.user = action.payload;
      })
      .addCase(signInAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(validateAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(validateAsync.fulfilled, (state, action) => {
        state.status = 'authenticated';
        state.user = action.payload;
      })
      .addCase(validateAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.user = undefined;
        state.status = 'not authenticated';
      })
      .addCase(signOutAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state: RootState) => state.authentication.user;
export const selectUserStatus = (state: RootState) => state.authentication.status;

export default authenticationSlice.reducer;
