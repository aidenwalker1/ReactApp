// store.ts
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from './DataInterfaces';
import {v4 as uuidv4} from 'uuid';

const user:User = {habits:[],diets:[],username:''+uuidv4()}

const userSlice = createSlice({
  name: 'user',
  initialState: { latest: user },
  reducers: {
    saveUser: (state, action: PayloadAction<User>) => {
      state.latest = action.payload;
    },
  },
});

export const { saveUser } = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;