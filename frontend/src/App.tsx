import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import KanbanBoard from './containers/KanbanBoard';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div style={{ padding: 20 }}>
        <KanbanBoard boardId={"jhfjhfjhcjg"} />
      </div>
    </Provider>
  );
};

export default App;