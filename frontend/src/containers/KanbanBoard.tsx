import React from 'react';
import { Grid, Typography } from '@mui/material';
import { DragDropContext } from 'react-beautiful-dnd';
import KanbanList from '../components/KanbanList';
import { KanbanBoardProps } from '../types';

const KanbanBoard: React.FC<KanbanBoardProps> = ({ board }) => {
    const onDragEnd = (result: any) => { };

    const onDeleteCard = (listID: string, cardID: string) => { };

    const onUpdateCard = (listID: string, cardID: string, title: string, desc: string) => { };

    return (
        <Grid container>
            <Typography variant="h3" component="h1">
                React Trello Clone
            </Typography>

            <DragDropContext onDragEnd={onDragEnd}>
                <Grid item>
                    {board.lists.map(({ id, title, cards }) => (
                        <KanbanList
                            key={id}
                            listID={id}
                            title={title}
                            cards={cards}
                            onDeleteCard={onDeleteCard}
                            onUpdateCard={onUpdateCard}
                        />
                    ))}
                </Grid>
            </DragDropContext>
        </Grid>
    );
};

export default KanbanBoard;