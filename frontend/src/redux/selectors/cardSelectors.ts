import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

const selectCardsState = (state: RootState) => state.cards;


export const selectCardsForList = (listId: string) =>
    createSelector(selectCardsState, (cardsState) =>
        Object.values(cardsState.items).filter((card) => card.listId === listId)
    );


export const selectIsLoadingList = (listId: string) =>
    createSelector(selectCardsState, (cardsState) => cardsState.loadingLists[listId]);


export const selectIsCreating = createSelector(selectCardsState, (cardsState) => cardsState.createLoading);


export const selectIsUpdating = createSelector(selectCardsState, (cardsState) => cardsState.updateLoading);


export const selectIsDeleting = (cardId: string) =>
    createSelector(selectCardsState, (cardsState) => cardsState.deleteLoading[cardId]);


export const selectIsMoving = (cardId: string) =>
    createSelector(selectCardsState, (cardsState) => cardsState.pendingMoves[cardId]);