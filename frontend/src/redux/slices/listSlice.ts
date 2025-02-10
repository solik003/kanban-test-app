import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { List, ListsState } from "../../types";

const API_BASE_URL = import.meta?.env?.REACT_APP_API_URL || "http://localhost:3000/api";

const initialState: ListsState = {
    items: {},
    loading: false,
    error: null,
    createLoading: false,
    updateLoading: false,
    deleteLoading: {},
};

export const loadListsForBoard = createAsyncThunk<List[], string>(
    "lists/loadListsForBoard",
    async (boardId) => {
        const response = await fetch(`${API_BASE_URL}/lists?boardId=${boardId}`);
        if (!response.ok) throw new Error("Failed to fetch lists.");
        return response.json();
    }
);

export const createList = createAsyncThunk<List, { name: string; boardId: string }>(
    "lists/createList",
    async (listData) => {
        const response = await fetch(`${API_BASE_URL}/lists`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(listData),
        });
        if (!response.ok) throw new Error("Failed to create list.");
        return response.json();
    }
);

export const updateList = createAsyncThunk<List, { id: string; name: string }>(
    "lists/updateList",
    async ({ id, name }) => {
        const response = await fetch(`${API_BASE_URL}/lists/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
        });
        if (!response.ok) throw new Error("Failed to update list.");
        return response.json();
    }
);

export const deleteList = createAsyncThunk<string, string>(
    "lists/deleteList",
    async (id) => {
        await fetch(`${API_BASE_URL}/lists/${id}`, { method: "DELETE" });
        return id;
    }
);

const listsSlice = createSlice({
    name: "lists",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadListsForBoard.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadListsForBoard.fulfilled, (state, action: PayloadAction<List[]>) => {
                action.payload.forEach((list) => {
                    state.items[list.id] = list;
                });
                state.loading = false;
            })
            .addCase(loadListsForBoard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Failed to load lists";
            })

            .addCase(createList.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createList.fulfilled, (state, action: PayloadAction<List>) => {
                state.items[action.payload.id] = action.payload;
                state.createLoading = false;
            })
            .addCase(createList.rejected, (state) => {
                state.createLoading = false;
            })


            .addCase(updateList.pending, (state) => {
                state.updateLoading = true;
            })
            .addCase(updateList.fulfilled, (state, action: PayloadAction<List>) => {
                state.items[action.payload.id] = action.payload;
                state.updateLoading = false;
            })
            .addCase(updateList.rejected, (state) => {
                state.updateLoading = false;
            })


            .addCase(deleteList.pending, (state, action) => {
                state.deleteLoading[action.meta.arg] = true;
            })
            .addCase(deleteList.fulfilled, (state, action: PayloadAction<string>) => {
                delete state.items[action.payload];
                delete state.deleteLoading[action.payload];
            })
            .addCase(deleteList.rejected, (state, action) => {
                delete state.deleteLoading[action.meta.arg];
                state.error = action.error.message ?? "Failed to delete list";
            });
    },
});

export default listsSlice.reducer;