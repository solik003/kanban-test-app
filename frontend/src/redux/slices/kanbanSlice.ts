import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { KanbanState } from '../../types';

const initialState: KanbanState = {
  lists: [
    {
      id: '1',
      title: 'To Do',
      cards: [
        { id: 'c1', title: 'Task 1', desc: 'Description of task 1' },
        { id: 'c2', title: 'Task 2', desc: 'Description of task 2' }
      ]
    },
    {
      id: '2',
      title: 'In Progress',
      cards: [
        { id: 'c3', title: 'Task 3', desc: 'Working on task 3' }
      ]
    },
    {
      id: '3',
      title: 'Done',
      cards: [
        { id: 'c4', title: 'Task 4', desc: 'Completed task 4' }
      ]
    }
  ],
};

const kanbanSlice = createSlice({
  name: 'kanban',
  initialState,
  reducers: {
    addCard: (state, action) => {
      const { listID, title, desc } = action.payload;
      const list = state.lists.find(list => list.id === listID);
      if (list) {
        list.cards.push({
          id: new Date().toISOString(),
          title,
          desc
        });
      }
    },
    deleteCard: (state, action: PayloadAction<string>) => {
      state.lists = state.lists.map((list) => {
        return {
          ...list,
          cards: list.cards.filter((card) => card.id !== action.payload),
        }
      });
    },

    updateCard: (state, action: PayloadAction<{ listID: string; cardID: string; title: string; desc: string }>) => {
      const { listID, cardID, title, desc } = action.payload;

      const listIndex = state.lists.findIndex(list => list.id === listID);

      if (listIndex !== -1) {
        const cardIndex = state.lists[listIndex].cards.findIndex(card => card.id === cardID);
        if (cardIndex !== -1) {
          state.lists[listIndex].cards[cardIndex].title = title;
          state.lists[listIndex].cards[cardIndex].desc = desc;
        }
      }
    },
  }
});

export const { addCard, deleteCard, updateCard } = kanbanSlice.actions;
export default kanbanSlice.reducer;


