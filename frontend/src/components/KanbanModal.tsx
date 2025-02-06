
import React, { useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { KanbanModalProps } from '../types';

const KanbanModal: React.FC<KanbanModalProps> = ({
    open,
    setOpen,
    cardTitle,
    cardDesc,
    onUpdateCard,
    onAddCard,
    type,
}) => {
    const { control, handleSubmit, setValue } = useForm({
        defaultValues: {
            title: cardTitle,
            desc: cardDesc,
        },
    });

    useEffect(() => {
        setValue('title', cardTitle);
        setValue('desc', cardDesc);
    }, [cardTitle, cardDesc, setValue]);

    const onSubmit = (data: { title: string; desc: string }) => {
        if (type === 'ADD_CARD' && onAddCard) {
            onAddCard(data.title, data.desc);
            setOpen(false);
        } else {
            onUpdateCard(data.title, data.desc);
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>{type === 'ADD_CARD' ? 'Add New Card' : 'Edit Card'}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                autoFocus
                                margin="dense"
                                label="Title"
                                fullWidth
                                required
                            />
                        )}
                    />
                    <Controller
                        name="desc"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="dense"
                                label="Description"
                                fullWidth
                                required
                            />
                        )}
                    />
                    <DialogActions>
                        <Button onClick={() => setOpen(false)} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            {type === 'ADD_CARD' ? 'Add' : 'Save'}
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default KanbanModal;