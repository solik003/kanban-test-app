import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Board, BoardsState } from "../../types";

const initialState: BoardsState = {
    items: {},
    loading: false,
    error: null,
    deleteLoading: {},
    updateLoading: false,
    createLoading: false
};

const API_BASE_URL = import.meta?.env?.REACT_APP_API_URL || "http://localhost:3000/api";

export const fetchBoards = createAsyncThunk<Board[]>("boards/fetchBoards", async () => {
    const response = await fetch(`${API_BASE_URL}/boards`);
    if (!response.ok) {
        throw new Error("Failed to fetch boards");
    }
    return response.json();
});


export const fetchBoardById = createAsyncThunk<Board, string>("boards/fetchBoardById", async (id) => {
    const response = await fetch(`${API_BASE_URL}/boards/${id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch boards");
    }
    return response.json();
});

export const createBoard = createAsyncThunk<Board, Partial<Board>>(
    "boards/createBoard",
    async (boardData) => {
        const response = await fetch(`${API_BASE_URL}/boards`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(boardData),
        });
        if (!response.ok) {
            throw new Error("Failed to fetch boards");
        }
        return response.json();
    }
);

export const updateBoard = createAsyncThunk<Board, { id: string; updatedBoard: Partial<Board> }>(
    "boards/updateBoard",
    async ({ id, updatedBoard }) => {
        const response = await fetch(`${API_BASE_URL}/boards/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedBoard),
        });
        if (!response.ok) {
            throw new Error(`Failed to update board with ID: ${id}`);
        }
        return response.json();
    }
);

export const deleteBoard = createAsyncThunk<string, string>(
    "boards/deleteBoard",
    async (boardId) => {
        const response = await fetch(`${API_BASE_URL}/boards/${boardId}`, { method: "DELETE" });
        if (!response.ok) {
            throw new Error(`Failed to delete board with ID: ${boardId}`);
        }

        return boardId;
    }
);


const boardsSlice = createSlice({
    name: "boards",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBoards.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBoards.fulfilled, (state, action: PayloadAction<Board[]>) => {
                state.loading = false;
                state.items = action.payload.reduce((acc, board) => {
                    acc[board.id] = board;
                    return acc;
                }, {} as Record<string, Board>);
            })
            .addCase(fetchBoards.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch boards";
            })
            .addCase(fetchBoardById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBoardById.fulfilled, (state, action: PayloadAction<Board>) => {
                state.loading = false;
                state.items[action.payload.id] = action.payload;
            })
            .addCase(fetchBoardById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch board by id";
            })
            .addCase(createBoard.fulfilled, (state, action: PayloadAction<Board>) => {
                state.items[action.payload.id] = action.payload;
                state.createLoading = false;
                state.error = null;
            })
            .addCase(createBoard.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createBoard.rejected, (state) => {
                state.createLoading = false;
            })
            .addCase(updateBoard.pending, (state) => {
                state.updateLoading = true;
                state.error = null;
            })
            .addCase(updateBoard.rejected, (state) => {
                state.updateLoading = false;
            })
            .addCase(updateBoard.fulfilled, (state, action: PayloadAction<Board>) => {
                state.items[action.payload.id] = action.payload;
                state.updateLoading = false;
            })
            .addCase(deleteBoard.pending, (state, action) => {
                state.deleteLoading[action.meta.arg] = true;
                state.error = null;
            })
            .addCase(deleteBoard.rejected, (state, action) => {
                delete state.deleteLoading[action.meta.arg];
                state.error = action.error.message || "Failed to delete board";
            })
            .addCase(deleteBoard.fulfilled, (state, action: PayloadAction<string>) => {
                delete state.items[action.payload];
                delete state.deleteLoading[action.payload];
            });
    },
});

export default boardsSlice.reducer;