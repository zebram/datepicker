import React from 'react';
import moment from 'moment';
 
const mode = {
    DAY: 0,
    MONTH: 1,
    YEAR: 2,
}
class Calendar extends React.Component {
    state = {
        open: false,
        date: null,
        mode: mode.DAY,
    }
    render() {
        return (
            <div>
                <input type="text" />
            </div>
        )
    }
}

export default Calendar;