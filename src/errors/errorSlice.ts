import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import * as uuid from 'uuid';

interface Error {
  id: string;
  title: string;
  detail: string;
}

export interface ErrorState {
  errors: Error[]
  status: 'success' | 'error';
}

const initialState: ErrorState = {
  errors: [],
  status: 'success',
};

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<Omit<Error, "id">>) => {
      state.status = "error";
      state.errors.push({ id: uuid.v4(), ...action.payload});
    },
    resetError: (state, action: PayloadAction<Error>) => {
      const errors = state.errors.filter(error =>
        error.id !== action.payload.id
      );

      state.status = errors ? "error" : "success";
      state.errors = errors;
    },
    resetAllError: (state) => {
      state.status = initialState.status;
      state.errors = initialState.errors;
    }
  },
});

export const { setError, resetError, resetAllError } = errorSlice.actions;

export const selectErrors = (state: RootState) => state.error.errors;

export default errorSlice.reducer;
