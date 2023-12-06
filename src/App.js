// App.js
import React from 'react';
import ProjectBoard from './ProjectBoard';
import ResponsiveGrid from './ProjectBoardCards';

function App() {
  return (
    <div className="App">
      <ProjectBoard />
      <ResponsiveGrid />
    </div>
  );
}

export default App;
