import React from 'react';
import './App.css';
import Calendar from './components/Calendar';
import DatePicker from './components/DatePicker';

function App() {
  return (
    <div className="App">
      <h1>Calendar</h1>
      <div className="task">
        <Calendar />
      </div>
      <h1>DatePicker</h1>
      <div className="task">
        <DatePicker />
      </div>
    </div>
  );
}

export default App;
