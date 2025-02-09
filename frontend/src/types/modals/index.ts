import { Board, Card } from "..";

export interface ModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    cardTitle?: string;
    cardDesc?: string;
    type: string;
    listId: string;
    cardId?: string;
    onAddCard: (listId: string, title: string, text: string) => void;
    onDeleteCard: (listId: string, cardId: string) => void;
    onUpdateCard: (listId: string, cardId: string, title: string, text: string) => void;
}

export interface ListModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    card?: Card,
    listId: string;
}

export interface CreateUpdateBoardModalProps {
    open: boolean;
    board: Board | null;
    setOpen: (open: boolean) => void;
}