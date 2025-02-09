
import React, { useState, useEffect, useMemo } from "react";
import { Button, Typography } from "@mui/material";
import { Snackbar, Alert } from "@mui/material";
import { BoardTable } from "../components/BoardTable";
import { fetchBoards } from '../redux/slices/boardSlice';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { CreateUpdateBoardModal } from "../components/CreateUpdateBoardModal";

export const BoardList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector(state => state.boards);
  const boards = useMemo(() => Object.values(items), [items]);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchBoards())
  }, [dispatch]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Board List
      </Typography>

      {loading && <Typography variant="h6">Loading...</Typography>}
      {error && <Typography variant="h6" color="error">{error}</Typography>}

      <BoardTable boards={boards} />

      <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={() => setOpenModal(true)}>
        Add New Board
      </Button>

      <CreateUpdateBoardModal
        open={openModal}
        board={null}
        setOpen={setOpenModal}
      />

      <Snackbar
        open={Boolean(error)}
        autoHideDuration={4000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => { }} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};
