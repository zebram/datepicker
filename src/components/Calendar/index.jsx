import React from 'react';
import CalendarInput from './CalendarInput';
import CalendarBody from './Calendar';

class Calendar extends React.Component {
    state = {
        open: false,
        date: "1982-10-02",
    };
    handleIconClick = se => {
        const { open } = this.state;
        this.setState({ open: !open });
    }
    handleSelect = value => {
        this.setState({
            open: false,
            date: value,
        });
    }
    render() {
        const { open, date } = this.state;
        return (
            <div className="calendar-wrap">
                <CalendarInput
                    value={ date }
                    onIconClick={ this.handleIconClick }
                    onSelect={ this.handleSelect }
                />
                { 
                    open && (
                        <CalendarBody 
                            value = { date }
                            onSelect = { this.handleSelect }
                        />
                    ) 
                }
            </div>
        )
    }
}

export default Calendar;