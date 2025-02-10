import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Card, CardsState } from "../../types";

const API_BASE_URL = import.meta?.env?.REACT_APP_API_URL || "http://localhost:3000/api";


const initialState: CardsState = {
    items: {},
    loading: false,
    error: null,
    createLoading: false,
    updateLoading: false,
    deleteLoading: {},
    loadingLists: {},
    pendingMoves: {}
};

interface CardWithListId {
    cards: Card[],
    listId: string
}

export const loadCardsForList = createAsyncThunk<CardWithListId, string>(
    "cards/loadCardsForList",
    async (listId) => {
        const response = await fetch(`${API_BASE_URL}/cards?listId=${listId}`);
        if (!response.ok) {
            throw new Error("Failed to load cards");
        }
        const cards = await response.json();
        return {
            cards,
            listId
        } as CardWithListId;
    }
);


export const createCard = createAsyncThunk<Card, Partial<Card>>(
    "cards/createCard",
    async (cardData) => {
        const response = await fetch(`${API_BASE_URL}/cards`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cardData),
        });
        if (!response.ok) {
            throw new Error("Failed to create card");
        }
        return response.json();
    }
);

export const moveCard = createAsyncThunk<Card, { id: string; newListId: string }>(
    "cards/moveCard",
    async ({ id, newListId }) => {
        const response = await fetch(`${API_BASE_URL}/cards/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ listId: newListId }),
        });
        return response.json();
    }
);


export const updateCard = createAsyncThunk<Card, { id: string, updatedCard: Partial<Card> }>(
    "cards/updateCard",
    async ({ id, updatedCard }) => {
        const response = await fetch(`${API_BASE_URL}/cards/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedCard),
        });
        if (!response.ok) {
            throw new Error("Failed to update card");
        }
        return response.json();
    }
);


export const deleteCard = createAsyncThunk<string, string>(
    "cards/deleteCard",
    async (id) => {
        const response = await fetch(`${API_BASE_URL}/cards/${id}`, { method: "DELETE" });
        if (!response.ok) {
            throw new Error("Failed to delete card");
        }
        return id;
    }
);

const cardsSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadCardsForList.pending, (state, action) => {
                state.loadingLists[action.meta.arg] = true;
            })
            .addCase(loadCardsForList.fulfilled, (state, action: PayloadAction<CardWithListId>) => {
                action.payload.cards.forEach((card) => {
                    state.items[card.id] = card;
                });
                delete state.loadingLists[action.payload.listId];
            })
            .addCase(loadCardsForList.rejected, (state, action) => {
                delete state.loadingLists[action.meta.arg];
                state.error = action.error.message ?? "Failed to load cards";
            })

            .addCase(createCard.pending, (state) => {
                state.createLoading = true;
            })
            .addCase(createCard.fulfilled, (state, action: PayloadAction<Card>) => {
                state.items[action.payload.id] = action.payload;
                state.createLoading = false;
            })
            .addCase(createCard.rejected, (state) => {
                state.createLoading = false;
            })


            .addCase(updateCard.pending, (state) => {
                state.updateLoading = true;
            })
            .addCase(updateCard.fulfilled, (state, action: PayloadAction<Card>) => {
                state.items[action.payload.id] = action.payload;
                state.updateLoading = false;
            })
            .addCase(updateCard.rejected, (state) => {
                state.updateLoading = false;
            })

            .addCase(moveCard.pending, (state, action) => {
                state.pendingMoves[action.meta.arg.id] = true;

                const card = state.items[action.meta.arg.id];
                state.items[action.meta.arg.id] = {
                    ...card,
                    oldListId: card.listId,
                    listId: action.meta.arg.newListId
                };
            })
            .addCase(moveCard.fulfilled, (state, action: PayloadAction<Card>) => {
                state.items[action.payload.id] = action.payload;
                delete state.pendingMoves[action.payload.id];
            })
            .addCase(moveCard.rejected, (state, action) => {

                const card = state.items[action.meta.arg.id];
                state.items[action.meta.arg.id] = {
                    ...card,
                    listId: card.oldListId || card.listId
                };
                delete state.pendingMoves[action.meta.arg.id];
            })

            .addCase(deleteCard.pending, (state, action) => {
                state.deleteLoading[action.meta.arg] = true;
            })
            .addCase(deleteCard.fulfilled, (state, action: PayloadAction<string>) => {
                delete state.items[action.payload];
                delete state.deleteLoading[action.payload];
            })
            .addCase(deleteCard.rejected, (state, action) => {
                delete state.deleteLoading[action.meta.arg];
                state.error = action.error.message ?? "Failed to delete card";
            });
    },
});

export default cardsSlice.reducer;
