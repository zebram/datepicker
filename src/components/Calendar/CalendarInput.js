import React from 'react';
import { DATE_FMT } from './constants';
import FontAwesome from 'react-fontawesome';
import './calendar-input.scss';

function CalendarInput(props) {
    const { value, onIconClick, onSelect } = props;

    function handleChange(se){
        const input = se.target;
        if (input.checkValidity()) {
            onSelect(input.value);
        }
        else {
            input.reportValidity();
        }
    }

    return (
        <div className="calendar-input">
            <FontAwesome 
                className="icon" 
                name="calendar"
                onClick={ onIconClick }
            /> 
            <input 
                type="text" 
                placeholder={ DATE_FMT }
                defaultValue={ value }
                pattern="\d{4}-\d{2}-\d{2}"
                title={ DATE_FMT }
                onChange={ handleChange }
            />
        </div>
    );
}

export default CalendarInput;