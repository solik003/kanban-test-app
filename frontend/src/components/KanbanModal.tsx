
import React, { useState } from 'react';
import { Modal, Button, Grid, TextField, IconButton } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import CancelIcon from '@mui/icons-material/Cancel';
import CloseIcon from '@mui/icons-material/Close';
import { ModalProps } from '../types';

const KanbanModal: React.FC<ModalProps> = ({
    open,
    setOpen,
    cardTitle,
    cardDesc,
    type,
    listID,
    cardID,
    onAddCard,
    onDeleteCard,
    onUpdateCard,
}) => {
    const [title, setTitle] = useState<string>(cardTitle ?? '');
    const [desc, setDesc] = useState<string>(cardDesc ?? '');

    const handleCloseModal = () => {
        setOpen(false);
    };

    const handleAddCard = () => {
        if (title && desc) {
            setTitle('');
            setDesc('');
            onAddCard(listID, title, desc);
            handleCloseModal();
        }
    };

    const handleDeleteCard = () => {
        if (cardID) {
            onDeleteCard(listID, cardID);
        }
    };

    const handleUpdateCard = () => {
        if (cardID) {
            onUpdateCard(listID, cardID, title, desc);
            handleCloseModal();
        }
    };

    return (
        <Modal open={open} onClose={handleCloseModal}>
            <Grid container direction="column" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 500, maxWidth: '90vw', backgroundColor: '#fff', padding: 2 }}>
                <TextField
                    sx={{ marginBottom: 2, width: 220 }}
                    placeholder="Enter a card title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    error={title === ''}
                    label="Title"
                    helperText={title === '' ? 'Enter a card title!' : ' '}
                />

                <IconButton sx={{ position: 'absolute', right: 8, top: 8 }} onClick={handleCloseModal}>
                    <CloseIcon />
                </IconButton>

                <TextField
                    sx={{ marginBottom: 2 }}
                    placeholder="Enter a card description"
                    value={desc}
                    onChange={(event) => setDesc(event.target.value)}
                    helperText={desc === '' ? 'Enter a card description!' : ' '}
                    error={desc === ''}
                    label="Description"
                    variant="outlined"
                    multiline
                    fullWidth
                />

                <Grid container justifyContent="space-between" alignItems="center" sx={{ display: 'flex', paddingTop: 2 }}>
                    <Button
                        onClick={handleDeleteCard}
                        variant="text"
                        color="secondary"
                        startIcon={<DeleteIcon />}
                        disabled={type === 'ADD_CARD'}
                    >
                        Delete
                    </Button>

                    <Grid item>
                        <Button onClick={handleCloseModal} variant="text" startIcon={<CancelIcon />}>
                            Cancel
                        </Button>

                        <Button
                            onClick={type === 'UPDATE_CARD' ? handleUpdateCard : handleAddCard}
                            variant="text"
                            color="primary"
                            startIcon={<SaveIcon />}
                            disabled={title === '' || desc === ''}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Modal>
    );
};

export default KanbanModal;
