import React, { useEffect, useMemo } from 'react';
import { ListItem } from '../components/ListItem';
import { KanbanBoardProps } from '../types';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectBoardById, selectBoardsError, selectIsLoadingBoards } from '../redux/selectors/boardSelectors';
import { fetchBoardById } from '../redux/slices/boardSlice';
import { selectIsLoadingLists, selectListsForBoard } from '../redux/selectors/listSelectors';
import { Button, CircularProgress, Skeleton, Stack, Typography } from '@mui/material';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { loadListsForBoard } from '../redux/slices/listSlice';
import { moveCard } from '../redux/slices/cardSlice';

export const KanbanBoard: React.FC<KanbanBoardProps> = () => {
    const { id: boardId } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const board = useAppSelector(selectBoardById(boardId));
    const lists = useAppSelector(selectListsForBoard(boardId));
    const isLoadingBoard = useAppSelector(selectIsLoadingBoards);
    const isLoadingLists = useAppSelector(selectIsLoadingLists);
    const error = useAppSelector(selectBoardsError);

    useEffect(() => {
        if (boardId && !board && !isLoadingBoard) {
            dispatch(fetchBoardById(boardId));
        }
    }, [boardId, board, isLoadingBoard]);

    useEffect(() => {
        if (boardId && board?.listsCount && !lists?.length && !isLoadingLists) {
            dispatch(loadListsForBoard(boardId));
        }
    }, [boardId, board, lists, isLoadingLists]);

    const skeletonLists = useMemo(() => {
        if (!board?.listsCount) {
            return [];
        }
        return [...Array(board?.listsCount)];
    }, [board?.listsCount]);

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const { draggableId: cardId, destination } = result;
        const newListId = destination.droppableId;

        dispatch(moveCard({ id: cardId, newListId }));
    };

    return (
        <Stack direction="column">
            {isLoadingBoard && (
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                    <CircularProgress />
                </Stack>
            )}
            {error && <Typography variant="h6" color="error">{error}</Typography>}

            <Typography variant="h3" component="h1">
                {board?.name}
            </Typography>

            <Stack direction="row">
                <DragDropContext onDragEnd={handleDragEnd}>
                    {
                        isLoadingLists && board?.listsCount && lists?.length === 0 ? (
                            skeletonLists.map((_, i) => (
                                <Skeleton key={i}
                                    variant="rectangular"
                                    width="300px"
                                    height={'100vh'}
                                    sx={{
                                        backgroundColor: '#ebecf0',
                                        borderRadius: 3,
                                        padding: 2,
                                        margin: 2,
                                        flexDirection: 'column',
                                    }} />
                            ))
                        ) : (
                            lists.map(list => (
                                <ListItem
                                    key={list.id}
                                    list={list}
                                />
                            ))
                        )
                    }
                </DragDropContext>
            </Stack>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/')}
                sx={{ alignSelf: 'flex-start', marginBottom: 2 }}
            >
                Back
            </Button>
        </Stack>
    );
};
