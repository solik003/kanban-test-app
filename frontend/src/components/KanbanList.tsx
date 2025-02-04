import React from 'react';
import { Grid, Typography } from '@mui/material';
import { Droppable } from 'react-beautiful-dnd';

import KanbanCard from './KanbanCard';
import { KanbanListProps } from '../types';


const KanbanList: React.FC<KanbanListProps> = ({ listID, title, cards, onDeleteCard, onUpdateCard }) => {
  return (
    <Grid
      item
      sx={{
        position: 'relative',
        backgroundColor: '#ebecf0',
        borderRadius: 3,
        padding: 2,
        margin: 2,
        flex: '0 0 auto',
        minWidth: 300,
        display: 'flex',
        flexDirection: 'row'
      }}
    >
      <Droppable droppableId={String(listID)} direction="horizontal">
        {(provided) => (
          <Grid item {...provided.droppableProps} ref={provided.innerRef}>
            <Typography
              sx={{
                padding: '4px 8px',
              }}
              variant="h6"
              component="h3"
              gutterBottom
            >
              {title}
            </Typography>

            <Grid item sx={{ display: 'flex', flexDirection: 'row', gap: 2, overflowX: 'auto', maxWidth: '100%' }}>
              {cards.map((card, index) => (
                <KanbanCard
                  key={card.id}
                  card={card}
                  listID={listID}
                  index={index}
                  onDeleteCard={onDeleteCard}
                  onUpdateCard={onUpdateCard}
                />
              ))}
              {provided.placeholder}
            </Grid>
          </Grid>
        )}
      </Droppable>
    </Grid>
  );
};
export default KanbanList;
