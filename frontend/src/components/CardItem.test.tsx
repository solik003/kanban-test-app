
import { render, screen, fireEvent } from '@testing-library/react';
import { CardItem } from './CardItem';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { deleteCard } from '../redux/slices/cardSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../redux/hooks', () => ({
    useAppDispatch: jest.fn(),
    useAppSelector: jest.fn(),
}));


jest.mock('react-beautiful-dnd', () => ({
    Draggable: ({ children }: { children: Function }) => children({}),
}));


jest.mock('src/constants', () => ({
    ENVIRONMENT: 'development',
}));

const mockStore = configureStore({
    reducer: {
        card: jest.fn(),
    },
});

describe('CardItem Component', () => {
    const mockDispatch = jest.fn();
    const mockUseAppSelector = useAppSelector as jest.Mock;
    const mockUseAppDispatch = useAppDispatch as jest.Mock;

    beforeEach(() => {
        mockUseAppDispatch.mockReturnValue(mockDispatch);
        mockUseAppSelector.mockReturnValue(false);
    });

    const card = {
        id: '1',
        title: 'Test Card',
        description: 'Test Description',
        listId: '1',
    };

    it('should render card with title and description', () => {
        render(
            <Provider store={mockStore}>
                <MemoryRouter>
                    <CardItem card={card} index={0} />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('Test Card')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('should open modal when edit button is clicked', () => {
        render(
            <Provider store={mockStore}>
                <MemoryRouter>
                    <CardItem card={card} index={0} />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.click(screen.getByText('Edit'));

        expect(screen.getByText('Edit Card')).toBeInTheDocument();
    });

    it('should dispatch deleteCard action when delete button is clicked', () => {
        render(
            <Provider store={mockStore}>
                <MemoryRouter>
                    <CardItem card={card} index={0} />
                </MemoryRouter>
            </Provider>
        );

        fireEvent.click(screen.getByText('Delete'));

        expect(mockDispatch).toHaveBeenCalledWith(deleteCard(card.id));
    });
});
