import React from 'react';
import './App.css';
import Calendar from './components/Calendar';
import DatePicker from './components/DatePicker';

function App() {
  return (
    <div className="App">
      <h1>Task 1. Calendar Component</h1>
      <div className="task">
        <Calendar />
      </div>
      <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
            <tr>
              <td>value</td>
              <td>String</td>
              <td>today in 'YYYY-MM-DD' format</td>
              <td>selected date in Calendar</td>
            </tr>
            <tr>
              <td>onSelect</td>
              <td>function(value)</td>
              <td></td>
              <td>on date select callback</td>
            </tr>
          </tbody>
        </table>
      <h1>Task 2. DatePicker Component</h1>
      <div className="task">
        <DatePicker />
      </div>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
          <tr>
            <td>date</td>
            <td>String</td>
            <td>today in 'YYYY-MM-DD' format</td>
            <td>selected date in Calendar</td>
          </tr>
          <tr>
            <td>onSelect</td>
            <td>function(value)</td>
            <td></td>
            <td>on date select callback</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
