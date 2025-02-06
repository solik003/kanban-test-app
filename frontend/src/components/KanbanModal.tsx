
import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { KanbanModalProps } from '../types';

const KanbanModal: React.FC<KanbanModalProps> = ({ open, setOpen, cardTitle, cardDesc, onUpdateCard, onAddCard, type }) => {
    const [title, setTitle] = useState(cardTitle);
    const [desc, setDesc] = useState(cardDesc);

    const handleSave = () => {
        if (type === "ADD_CARD" && onAddCard) {
            onAddCard(title, desc);
            setOpen(false);
        } else {
            onUpdateCard(title, desc);
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>{type === "ADD_CARD" ? "Add New Card" : "Edit Card"}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Title"
                    fullWidth
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Description"
                    fullWidth
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    {type === "ADD_CARD" ? "Add" : "Save"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default KanbanModal;