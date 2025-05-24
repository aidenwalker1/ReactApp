// store.ts
import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FoodCSVData, User } from './DataInterfaces';
import {v4 as uuidv4} from 'uuid';
import Papa from 'papaparse';

const user:User = {id:uuidv4(), habits:[],diets:[],username:''+uuidv4(), selectedDiet:null}

const userSlice = createSlice({
  name: 'user',
  initialState: { latest: user },
  reducers: {
    saveUser: (state, action: PayloadAction<User>) => {
      state.latest = action.payload;
    },
  },
});


const foodData:FoodCSVData[] = []

const foodDataSlice = createSlice({
  name: 'foodData',
  initialState: { latest: foodData },
  reducers: {
    saveFoodData: (state, action: PayloadAction<FoodCSVData[]>) => {
      state.latest = action.payload;
    },
  },
});

export const { saveUser } = userSlice.actions;
export const {saveFoodData} = foodDataSlice.actions

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    foodData: foodDataSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;