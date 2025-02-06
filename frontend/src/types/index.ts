
export interface Card {
    id: string;
    title: string;
    desc: string;
}
export interface List {
    id: string;
    title: string;
    cards: Card[];
}
export interface KanbanListProps {
    listID: string;
    title: string;
    cards: Card[];
    onDeleteCard: (listID: string, cardID: string) => void;
    onUpdateCard: (listID: string, cardID: string, title: string, text: string) => void;
}
export interface ModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    cardTitle?: string;
    cardDesc?: string;
    type: string;
    listID: string;
    cardID?: string;
    onAddCard: (listID: string, title: string, text: string) => void;
    onDeleteCard: (listID: string, cardID: string) => void;
    onUpdateCard: (listID: string, cardID: string, title: string, text: string) => void;
}
export interface KanbanCardProps {
    listID: string;
    card: Card;
    index: number;
    onDeleteCard: (listID: string, cardID: string) => void;
    onUpdateCard: (listID: string, cardID: string, title: string, text: string) => void;
}


export interface KanbanBoardProps {
    boardId: string;
}

export interface KanbanState {
    lists: List[];
}

export interface KanbanModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    cardTitle: string;
    cardDesc: string;
    onUpdateCard: (updatedTitle: string, updatedDesc: string) => void;
    onAddCard?: (newTitle: string, newDesc: string) => void;
    onDeleteCard: (cardID: string) => void;
    listID: string;
    cardID: string;
    type: string;
}