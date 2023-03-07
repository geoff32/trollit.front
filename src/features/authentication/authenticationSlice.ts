import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchSignIn, fetchSignOut, fetchValidate } from './authenticationApi';
import { User } from './models';

export interface AuthenticationState {
  user?: User;
  status: 'authenticated' | 'not authenticated' | 'loading' | 'failed';
}

const initialState: AuthenticationState = {
  status: 'not authenticated',
};

export const signInAsync = createAsyncThunk(
  'authentication/signIn',
  async (user: { username: string, password: string }, { dispatch }) => {
    const response = await fetchSignIn(user);
    dispatch(authenticate(response.user));
  }
);

export const validateAsync = createAsyncThunk(
  'authentication/validate',
  async (_, { dispatch }) => {
    const response = await fetchValidate();

    dispatch(authenticate(response.user));
  }
);

export const signOutAsync = createAsyncThunk(
  'authentication/signOut',
  async (_, { dispatch }) => {
    await fetchSignOut();

    dispatch(disauthenticate());
  }
);

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    authenticate: (state, action: PayloadAction<User>) => {
      state.status = "authenticated";
      state.user = action.payload;
    },
    disauthenticate: (state) => {
      state.status = "not authenticated";
      state.user = undefined;
    }
  },
  extraReducers: (builder) => {
    builder
      // signin
      .addCase(signInAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signInAsync.rejected, (state) => {
        state.status = 'failed';
      })
      // validate
      .addCase(validateAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(validateAsync.rejected, (state) => {
        state.status = 'failed';
      })
      //signout
      .addCase(signOutAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signOutAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { authenticate, disauthenticate } = authenticationSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUser = (state: RootState) => state.authentication.user;
export const selectUserStatus = (state: RootState) => state.authentication.status;

export default authenticationSlice.reducer;
