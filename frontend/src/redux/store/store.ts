import { configureStore } from '@reduxjs/toolkit';
import kanbanReducer from '../slices/kanbanSlice'


export const store = configureStore({
    reducer: {
        kanban: kanbanReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;