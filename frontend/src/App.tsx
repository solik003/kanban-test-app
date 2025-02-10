import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import { KanbanBoard } from './containers/KanbanBoard';
import { BoardList } from './containers/BoardList';
import { HashRouter, Route, Routes } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<BoardList />} />
          <Route path="/boards" element={<BoardList />} />
          <Route path="/boards/:id" element={<KanbanBoard />} />
        </Routes>
      </HashRouter>
    </Provider>
  );
};

export default App;