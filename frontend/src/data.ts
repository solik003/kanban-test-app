import { KanbanBoardProps } from "./types";


export const initialBoard: KanbanBoardProps['board'] = {
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
    ]
};
