import React from 'react';
import { connect } from 'react-redux';
import { updateDate } from '../../actions';
import Input from './Input';
import Calendar from './Calendar';

class CalendarInput extends React.Component {
    state = {
        open: false,
    };
    handleIconClick = se => {
        const { open } = this.state;
        this.setState({ open: !open });
    }
    handleSelect = value => {
        const { updateDate } = this.props; 
        this.setState({
            open: false,
        });
        updateDate(value);
    }
    render() {
        const { open } = this.state;
        const { date } = this.props;
        return (
            <div className="calendar-wrap">
                <Input
                    value={ date }
                    onIconClick={ this.handleIconClick }
                    onSelect={ this.handleSelect }
                />
                { 
                    open && (
                        <Calendar 
                            value = { date }
                            onSelect = { this.handleSelect }
                        />
                    ) 
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    date: state.date,
});
const mapDispatchToProps = { updateDate };
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CalendarInput);