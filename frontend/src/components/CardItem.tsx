
import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, Skeleton, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Draggable } from 'react-beautiful-dnd';
import { ListModal } from './ListModal';
import { CardItemProps } from '../types';
import { selectIsDeleting, selectIsMoving } from '../redux/selectors/cardSelectors';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { deleteCard } from '../redux/slices/cardSlice';

export const CardItem: React.FC<CardItemProps> = ({ card, index }) => {
    const dispatch = useAppDispatch();
    const [open, setOpen] = useState(false);

    const handleOpenModal = () => {
        setOpen(true);
    };

    const handleDeleteCard = (id: string) => {
        dispatch(deleteCard(id));
    };

    const isDeleting = useAppSelector(selectIsDeleting(card.id));
    const isMoving = useAppSelector(selectIsMoving(card.id));

    return (
        <Stack>
            <Draggable draggableId={card.id} index={index}>
                {(provided) => (
                    <Stack ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Card sx={{
                            maxWidth: '300px',
                            marginBottom: 1,
                            transition: 'all .4s'
                        }}>
                            {isMoving ? (
                                <CardContent>
                                    <Skeleton variant="text" width="80%" height={30} />
                                    <Skeleton variant="text" width="90%" height={20} />
                                </CardContent>
                            ) : (
                                <CardContent>
                                    <Typography noWrap variant="h6" component="h4" gutterBottom>
                                        {card.title}
                                    </Typography>
                                    <Typography noWrap variant="body2" component="p">
                                        {card.description}
                                    </Typography>
                                </CardContent>
                            )}

                            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button
                                    color="primary"
                                    size="small"
                                    startIcon={<EditIcon />}
                                    onMouseDown={() => handleOpenModal()}
                                >
                                    Edit
                                </Button>

                                <Button
                                    loading={isDeleting}
                                    color="secondary"
                                    size="small"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => handleDeleteCard(card.id)}
                                >
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Stack>
                )}
            </Draggable>

            <ListModal
                open={open}
                setOpen={setOpen}
                card={card}
                listId={card.listId}
            />
        </Stack>
    );
};
