import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store/store";


const selectListsState = (state: RootState) => state.lists;


export const selectListsForBoard = (boardId?: string) =>
    createSelector(selectListsState, (listsState) =>
        Object.values(listsState.items).filter((list) => list.boardId === boardId) || []
    );


export const selectIsLoadingLists = createSelector(selectListsState, (listsState) => listsState.loading);


export const selectIsCreatingList = createSelector(selectListsState, (listsState) => listsState.createLoading);


export const selectIsUpdatingList = createSelector(selectListsState, (listsState) => listsState.updateLoading);


export const selectIsDeletingList = (listId: string) =>
    createSelector(selectListsState, (listsState) => !!listsState.deleteLoading[listId]);