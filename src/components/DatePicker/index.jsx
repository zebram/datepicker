import React from 'react';
import { connect } from 'react-redux';
import { updateDate } from '../../actions';
import Input from './Input';
import Calendar from '../Calendar';
import Modal from '../Modal';
import './date-picker.scss';

class DatePicker extends React.Component {
    state = {
        open: false,
    };
    handleIconClick = se => {
        const { open } = this.state;
        this.setState({ open: !open });
    }
    handleSelect = (value) => {
        const { updateDate } = this.props; 
        updateDate(value);
        this.setState({ open: false });
    }
    render() {
        const { open } = this.state;
        const { date } = this.props;
        return (
            <div className="date-picker">
                <Input
                    value={ date }
                    onIconClick={ this.handleIconClick }
                    onSelect={ this.handleSelect }
                />
                <Modal
                    show={ open }
                    onClick={ () => this.setState({ open: false })}
                >
                    <Calendar 
                        value = { date }
                        onSelect = { this.handleSelect }
                    />
                </Modal>
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
)(DatePicker);