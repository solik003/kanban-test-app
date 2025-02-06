
import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Draggable } from 'react-beautiful-dnd';
import KanbanModal from './KanbanModal';
import { KanbanCardProps } from '../types';
import { useDispatch } from 'react-redux';
import { deleteCard, updateCard } from '../redux/slices/kanbanSlice';

const KanbanCard: React.FC<KanbanCardProps> = ({ listID, card, index }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [isAddingNew, setIsAddingNew] = useState(false);

    const handleOpenModal = (isNewCard: boolean) => {
        setIsAddingNew(isNewCard);
        setOpen(true);
    };

    const handleDeleteCard = (id: string) => {
        dispatch(deleteCard(id));
    };
    const handleUpdateCard = (updatedTitle: string, updatedDesc: string) => {
        if (card.id && updatedTitle && updatedDesc) {
            dispatch(updateCard({
                listID,
                cardID: card.id,
                title: updatedTitle,
                desc: updatedDesc,
            }));
            setOpen(false);
        }
    };

    return (
        <Grid item>
            <Draggable draggableId={String(card.id)} index={index}>
                {(provided) => (
                    <Grid ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Card style={{ marginBottom: 8, transition: 'all .4s' }}>
                            <CardContent>
                                <Typography variant="h6" component="h4" gutterBottom>
                                    {card.title}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {card.desc}
                                </Typography>
                            </CardContent>

                            <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button
                                    color="primary"
                                    size="small"
                                    startIcon={<EditIcon />}
                                    onMouseDown={() => handleOpenModal(false)}
                                >
                                    Edit
                                </Button>

                                <Button
                                    color="secondary"
                                    size="small"
                                    startIcon={<DeleteIcon />}
                                    onClick={() => handleDeleteCard(card.id)}
                                >
                                    Delete
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                )}
            </Draggable>

            <KanbanModal
                listID={listID}
                cardID={card.id}
                open={open}
                setOpen={setOpen}
                cardTitle={isAddingNew ? '' : card.title}
                cardDesc={isAddingNew ? '' : card.desc}
                type={isAddingNew ? "ADD_CARD" : "UPDATE_CARD"}
                onDeleteCard={handleDeleteCard}
                onUpdateCard={handleUpdateCard}
            />
        </Grid>
    );
};

export default KanbanCard;
