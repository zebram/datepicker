import React from 'react';
import { connect } from 'react-redux';
import { updateDate } from '../../actions';
import CalendarInput from './CalendarInput';
import CalendarBody from './Calendar';

class Calendar extends React.Component {
    state = {
        open: false,
    };
    constructor(props){
        super(props);
    }
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

const mapStateToProps = state => ({
    date: state.date,
});
const mapDispatchToProps = { updateDate };
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Calendar);