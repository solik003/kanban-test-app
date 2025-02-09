
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import { Board, CreateUpdateBoardModalProps } from "../types";
import { Controller, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { createBoard, updateBoard } from "../redux/slices/boardSlice";
import { selectIsCreatingBoard, selectIsUpdatingBoard } from "../redux/selectors/boardSelectors";


export const CreateUpdateBoardModal: React.FC<CreateUpdateBoardModalProps> = ({
    open,
    setOpen,
    board,
}) => {

    const dispatch = useAppDispatch();

    const createLoading = useAppSelector(selectIsCreatingBoard);
    const updateLoading = useAppSelector(selectIsUpdatingBoard);

    const handleCreate = async (newBoard: Partial<Board>): Promise<Board> => {
        return dispatch(createBoard(newBoard)).unwrap();
    };

    const handleUpdate = async (updatedBoard: Partial<Board>): Promise<Board> => {
        if (board) {
            return dispatch(updateBoard({ id: board.id, updatedBoard })).unwrap()
        }
        return Promise.reject()
    };

    const { control, handleSubmit, reset } = useForm({
        defaultValues: board || {},
    });

    const onFormSubmit = (data: { name: string }) => {
        const promise = board ? handleUpdate({ name: data.name }) : handleCreate({ name: data.name });

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
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>{board ? 'Update Board Name' : 'Create Board'}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                autoFocus
                                margin="dense"
                                label="Board Name"
                                type="text"
                                required
                                fullWidth />
                        )}
                    />

                    <DialogActions>
                        <Button onClick={() => onCancel()} color="primary">
                            Cancel
                        </Button>
                        <Button loading={updateLoading || createLoading} type="submit" color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog >
    );
};

