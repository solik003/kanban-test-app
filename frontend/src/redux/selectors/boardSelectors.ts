import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

const selectBoardsState = (state: RootState) => state.boards;


export const selectBoardById = (boardId?: string) =>
    createSelector(selectBoardsState, (boardsState) => boardId ? boardsState.items[boardId] : null);


export const selectIsLoadingBoards = createSelector(selectBoardsState, (boardsState) => boardsState.loading);


export const selectIsCreatingBoard = createSelector(selectBoardsState, (boardsState) => boardsState.createLoading);


export const selectIsUpdatingBoard = createSelector(selectBoardsState, (boardsState) => boardsState.updateLoading);


export const selectIsDeletingBoard = (boardId: string) =>
    createSelector(selectBoardsState, (boardsState) => !!boardsState.deleteLoading[boardId]);


export const selectBoardsError = createSelector(selectBoardsState, (boardsState) => boardsState.error);
