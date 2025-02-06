
import React, { useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { Droppable } from 'react-beautiful-dnd';

import KanbanCard from './KanbanCard';
import KanbanModal from './KanbanModal';
import { KanbanListProps } from '../types';
import { useDispatch } from 'react-redux';
import { addCard } from '../redux/slices/kanbanSlice';

const KanbanList: React.FC<KanbanListProps> = ({ listID, title, cards, onDeleteCard, onUpdateCard }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');


  const handleOpenModal = () => {
    setNewTitle('');
    setNewDesc('');
    setOpen(true);
  };

  const handleAddNewCard = (newTitle: string, newDesc: string) => {
    if (newTitle && newDesc) {
      dispatch(addCard({
        listID: listID,
        title: newTitle,
        desc: newDesc
      }));
      setOpen(false);
    }
  };


  return (
    <Stack
      sx={{
        backgroundColor: '#ebecf0',
        borderRadius: 3,
        padding: 2,
        margin: 2,
        minWidth: 300,
        flexDirection: 'column',
      }}
    >
      <Droppable droppableId={String(listID)}>
        {(provided) => (
          <Stack {...provided.droppableProps} ref={provided.innerRef}>
            <Typography variant="h6" component="h3" gutterBottom>
              {title}
            </Typography>

            <Stack direction="column" spacing={2}>
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
            </Stack>
          </Stack>
        )}
      </Droppable>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: 8 }}
        onClick={handleOpenModal}
      >
        Add New Card
      </Button>


      <KanbanModal
        listID={listID}
        open={open}
        setOpen={setOpen}
        cardTitle={newTitle}
        cardDesc={newDesc}
        type="ADD_CARD"
        onAddCard={handleAddNewCard}
      />
    </Stack>
  );
};

export default KanbanList;