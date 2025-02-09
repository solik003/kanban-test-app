
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Skeleton, Stack, Typography } from '@mui/material';
import { Droppable } from 'react-beautiful-dnd';

import { KanbanCard } from './KanbanCard';
import { KanbanModal } from './KanbanModal';
import { KanbanListProps } from '../types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectCardsForList, selectIsLoadingList } from '../redux/selectors/cardSelectors';
import { loadCardsForList } from '../redux/slices/cardSlice';

export const KanbanList: React.FC<KanbanListProps> = ({ list }) => {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const cards = useAppSelector(selectCardsForList(list.id));
  const isLoading = useAppSelector(selectIsLoadingList(list.id));

  const skeletonCards = useMemo(() => {
    return [...Array(list.cardsCount)];
  }, [list.cardsCount])

  useEffect(() => {
    dispatch(loadCardsForList(list.id));
  }, [dispatch, list.id]);

  const handleOpenModal = () => {
    setOpen(true);
  };

  return (
    <Droppable droppableId={String(list.id)}>
      {(provided) => (
        <Stack
          ref={provided.innerRef}
          {...provided.droppableProps}
          sx={{
            backgroundColor: '#ebecf0',
            borderRadius: 3,
            padding: 2,
            margin: 2,
            minWidth: 300,
            flexDirection: 'column',
            height: '100vh'
          }}
        >
          <Stack>
            <Typography variant="h6" component="h3" gutterBottom>
              {list.title}
            </Typography>
            <Stack direction="column" spacing={2}>
              {isLoading && list.cardsCount > 0 && cards.length === 0 ? (
                skeletonCards.map((_, i) => (
                  <Skeleton
                    key={i}
                    variant="rectangular"
                    width="100%"
                    height={140}
                    sx={{
                      my: 1,
                      borderRadius: 1
                    }}
                  />
                ))
              ) : (
                cards.map((card, index) => (
                  <KanbanCard
                    key={card.id}
                    card={card}
                    index={index}
                  />
                ))
              )}
              {provided.placeholder}
            </Stack>
          </Stack>
          {list.canCreateCard && <>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 1 }}
              onClick={handleOpenModal}
            >
              Add New Card
            </Button>

            <KanbanModal
              open={open}
              listId={list.id}
              setOpen={setOpen}
            />
          </>}

        </Stack>
      )}
    </Droppable>
  );
};