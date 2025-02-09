
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { Card, KanbanModalProps } from '../types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectIsCreating, selectIsUpdating } from '../redux/selectors/cardSelectors';
import { createCard, updateCard } from '../redux/slices/cardSlice';

export const ListModal: React.FC<KanbanModalProps> = ({
    open,
    setOpen,
    card,
    listId
}) => {
    const isCreating = useAppSelector(selectIsCreating);
    const isUpdating = useAppSelector(selectIsUpdating);

    const dispatch = useAppDispatch();

    const handleCreate = async (newCard: Partial<Card>): Promise<Card> => {
        return dispatch(createCard(newCard)).unwrap();
    };

    const handleUpdate = async (updatedCard: Partial<Card>): Promise<Card> => {
        if (card) {
            return dispatch(updateCard({ id: card.id, updatedCard })).unwrap()
        }
        return Promise.reject()
    };

    const { control, handleSubmit, reset } = useForm({
        defaultValues: { ...card || { listId } },
    });

    const onFormSubmit = (data: Partial<Card>) => {
        const promise = card ? handleUpdate({
            title: data.title,
            description: data.description
        }) : handleCreate({
            title: data.title,
            description: data.description,
            listId
        });

        promise.then(() => {
            setOpen(false);
            reset();
        })
    };

    const onCancel = () => {
        setOpen(false);
        reset();
    }

    return (
        <Dialog open={open} onClose={() => onCancel()}>
            <DialogTitle>{card ? 'Edit Card' : 'Add New Card'}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onFormSubmit)}>
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
                        name="description"
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
                        <Button onClick={() => onCancel()} color="primary">
                            Cancel
                        </Button>
                        <Button loading={isUpdating || isCreating} type="submit" color="primary">
                            {card ? 'Save' : 'Add'}
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};