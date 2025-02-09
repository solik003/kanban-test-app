
export interface Card {
    id: string;
    title: string;
    description: string;
    listId: string;
    oldListId?: string;
}

export interface List {
    id: string;
    title: string;
    cards: Card[];
    boardId: string;
    cardsCount: number;
    canCreateCard: boolean;
}

export interface Board {
    id: string;
    name: string;
    listsCount: number;
}

export interface KanbanListProps {
    list: List;
}

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
export interface KanbanCardProps {
    card: Card;
    index: number;
}


export interface KanbanBoardProps {
    // id: string;
}


export interface KanbanModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    card?: Card,
    listId: string;
}


export interface BoardItemProps {
    board: Board;
}

export interface BoardTableProps {
    boards: Board[];
}

export interface CreateUpdateBoardModalProps {
    open: boolean;
    board: Board | null;
    setOpen: (open: boolean) => void;
}

export interface BoardsState {
    items: Record<string, Board>;
    loading: boolean;
    error: string | null;
    deleteLoading: Record<string, boolean>;
    updateLoading: boolean;
    createLoading: boolean
}

export interface ListProps {
    list: { id: string; name: string };
}

export interface ListsState {
    items: Record<string, List>;
    loading: boolean;
    error: string | null;
    createLoading: boolean;
    updateLoading: boolean;
    deleteLoading: Record<string, boolean>;
}

export interface CardsState {
    items: Record<string, Card>;
    loading: boolean;
    error: string | null;
    createLoading: boolean;
    updateLoading: boolean;
    deleteLoading: Record<string, boolean>;
    loadingLists: Record<string, boolean>;
    pendingMoves: Record<string, boolean>;
}

