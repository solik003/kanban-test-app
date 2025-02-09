import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '../slices/boardSlice'
import cardReducer from '../slices/cardSlice'
import listReducer from '../slices/listSlice'

export const store = configureStore({
    reducer: {
        boards: boardReducer,
        cards: cardReducer,
        lists: listReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;