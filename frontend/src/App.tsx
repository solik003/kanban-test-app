import React, { useState } from 'react';
import KanbanBoard from './containers/KanbanBoard';
import { initialBoard } from './data';

const App: React.FC = () => {
  const [board, setBoard] = useState(initialBoard);

  const sort = () => { };

  return (
    <div style={{ padding: 20 }}>
      <KanbanBoard board={board} sort={sort} />
    </div>
  );
};

export default App;

