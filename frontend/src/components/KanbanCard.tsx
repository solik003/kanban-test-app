import React, { useState } from 'react';
import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Draggable } from 'react-beautiful-dnd';
import KanbanModal from './KanbanModal';
import { KanbanCardProps } from '../types';



const KanbanCard: React.FC<KanbanCardProps> = ({ listID, card, index, onDeleteCard, onUpdateCard }) => {
    const [open, setOpen] = useState(false);
    const [cardTitle, setCardTitle] = useState(card.title);
    const [cardText, setCardText] = useState(card.text);

    const handleOpenModal = () => {
        setOpen(true);
    };

    const handleDeleteCard = () => {
        onDeleteCard(listID, card.id);
    };

    const handleUpdateCard = (updatedTitle: string, updatedText: string) => {
        setCardTitle(updatedTitle);
        setCardText(updatedText);
        onUpdateCard(listID, card.id, updatedTitle, updatedText);
        setOpen(false);
    };

    return (
        <Grid item>
            <Draggable draggableId={String(card.id)} index={index}>
                {(provided) => (
                    <Grid ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <Card style={{ marginBottom: 8, transition: 'all .4s' }}>
                            <CardContent>
                                <Typography variant="h6" component="h4" gutterBottom>
                                    {cardTitle}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    {cardText}
                                </Typography>
                            </CardContent>

                            <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Button
                                    color="primary"
                                    size="small"
                                    startIcon={<EditIcon />}
                                    onMouseDown={handleOpenModal}
                                >
                                    Edit
                                </Button>

                                <Button
                                    color="secondary"
                                    size="small"
                                    startIcon={<DeleteIcon />}
                                    onClick={handleDeleteCard}
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
                cardTitle={cardTitle}
                cardDesc={cardText}
                type="UPDATE_CARD"
                onAddCard={() => { }}
                onDeleteCard={handleDeleteCard}
                onUpdateCard={handleUpdateCard}
            />
        </Grid>
    );
};

export default KanbanCard;