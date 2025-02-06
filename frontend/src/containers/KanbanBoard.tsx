import React from 'react';
import { Stack, Typography } from '@mui/material';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import KanbanList from '../components/KanbanList';
import { KanbanBoardProps } from '../types';
import { deleteCard, updateCard } from '../redux/slices/kanbanSlice';
import { useDispatch, useSelector } from 'react-redux';

const KanbanBoard: React.FC<KanbanBoardProps> = ({ boardId }) => {
    const dispatch = useDispatch();

    const lists = useSelector((state: any) => state.kanban.lists);

    const handleDeleteCard = (cardID: string) => {
        dispatch(deleteCard(cardID));
    };

    const handleUpdateCard = (listID: string, cardID: string, title: string, desc: string) => {
        dispatch(updateCard({
            cardID, title, desc,
            listID
        }));
    };

    const handleSort = (result: DropResult) => { };

    return (
        <Stack direction="column">
            <Typography variant="h3" component="h1">
                React Kanban
            </Typography>

            <DragDropContext onDragEnd={handleSort}>
                <Stack direction="row">
                    {lists.map(({ id, title, cards }) => (
                        <KanbanList
                            key={id}
                            listID={id}
                            title={title}
                            cards={cards}
                            onDeleteCard={handleDeleteCard}
                            onUpdateCard={handleUpdateCard}
                        />
                    ))}
                </Stack>
            </DragDropContext>
        </Stack>
    );
};

export default KanbanBoard;