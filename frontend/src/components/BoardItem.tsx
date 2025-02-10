import { TableRow, TableCell, Button } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { BoardItemProps } from "../types"
import { useState } from "react";
import { deleteBoard } from "../redux/slices/boardSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { CreateUpdateBoardModal } from "./CreateUpdateBoardModal";
import { selectIsDeletingBoard } from "../redux/selectors/boardSelectors";


export const BoardItem: React.FC<BoardItemProps> = ({
    board
}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
    const deleteLoading = useAppSelector(selectIsDeletingBoard(board.id));

    const handleOpenUpdateModal = () => {
        setOpenUpdateModal(true);
    };

    const handleDelete = async () => {
        dispatch(deleteBoard(board.id))
    };

    const handleViewBoard = async () => {
        navigate(`/boards/${board.id}`);
    };

    return <TableRow key={board.id}>
        <TableCell sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>{board.name}</TableCell>
        <TableCell align="center" sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1 }}>
            <Link to={`/boards/${board.id}`}>
                <Button variant="outlined" onClick={() => handleViewBoard()}>
                    View Board
                </Button>
            </Link>
            <Button
                loading={deleteLoading}
                variant="contained"
                color="secondary"
                sx={{ marginLeft: 1 }}
                onClick={() => handleDelete()}
            >
                Delete
            </Button>
            <Button
                variant="contained"
                color="primary"
                sx={{ marginLeft: 1 }}
                onClick={() => handleOpenUpdateModal()}
            >
                Update Name
            </Button>
        </TableCell>
        <CreateUpdateBoardModal
            open={openUpdateModal}
            setOpen={setOpenUpdateModal}
            board={board}
        />
    </TableRow>
}