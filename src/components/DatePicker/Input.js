import React from 'react';
import { DATE_FMT } from './constants';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import './input.scss';

class Input extends React.Component {
    state = {
        selectedDate: null,
        date: null,
    }
    static getDerivedStateFromProps(props, state) {
        const { value } = props;
        const { selectedDate } = state;
        let newState = null;
        if( value !== selectedDate ) {
            newState =  {
                selectedDate: moment(value).format(DATE_FMT),
                date: moment(value).format(DATE_FMT),
            }
        }
        return newState;

    }
    handleChange = se => {
        const { onSelect } = this.props;
        const input = se.target;
        this.setState({
            date: input.value,
        });
        if (input.checkValidity()) {
            if(moment(input.value).isValid()) {
                onSelect(input.value);
            }
            else {
                input.setCustomValidity("Invalid Date");
                input.reportValidity();
            }
        }
        else {
            input.setCustomValidity("");
            input.reportValidity();
        }
    }
    render() {
        const { date } = this.state;
        const { onIconClick } = this.props;
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
                    value={ date }
                    pattern="\d{4}-\d{2}-\d{2}"
                    title={ DATE_FMT }
                    onChange={ this.handleChange }
                    
                />
            </div>
        );
    }
}

export default Input;