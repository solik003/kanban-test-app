
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { BoardTableProps } from '../types';
import { BoardItem } from './BoardItem';


export const BoardTable: React.FC<BoardTableProps> = ({ boards }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Board Name</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {boards.map((board) => (
                        <BoardItem board={board}>
                        </BoardItem>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
