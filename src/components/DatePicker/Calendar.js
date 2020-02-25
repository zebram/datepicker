import React from 'react';
import { MODE, MONTH, WEEKDAY, DATE_FMT } from './constants';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import classNames from 'classnames';
import './calendar.scss';

class Calendar extends React.Component {
    state = {
        mode: MODE.DAY,
        selectedDate: moment().format(DATE_FMT),
        date: moment().format(DATE_FMT),
    }
    static getDerivedStateFromProps(props, state) {
        const { value } = props;
        const { selectedDate } = state;
        if( value && value !== selectedDate ) {
            return Object.assign({}, state, {
                selectedDate: value,
                date: value,
            });
        }
        else {
            return null
        }
    }
    handlePrevClick = se => {
        const { mode, date } = this.state;
        const mmt = moment(date, DATE_FMT);
        let prevMmt;
        mode === MODE.DAY && (prevMmt = mmt.subtract(1, 'month'));
        mode === MODE.MONTH && (prevMmt = mmt.subtract(1, 'year'));
        mode === MODE.YEAR && (prevMmt = mmt.subtract(10, 'year'));
        this.setState({
            date: prevMmt.format(DATE_FMT),
        });
    }
    handleNextClick = se => {
        const { mode, date } = this.state;
        const mmt = moment(date, DATE_FMT);
        let nextMmt;
        mode === MODE.DAY && (nextMmt = mmt.add(1, 'month'));
        mode === MODE.MONTH && (nextMmt = mmt.add(1, 'year'));
        mode === MODE.YEAR && (nextMmt = mmt.add(10, 'year'));
        this.setState({
            date: nextMmt.format(DATE_FMT),
        });
    }
    handleModeChange = nextMode => {
        const { mode } = this.state;
        nextMode === undefined && (nextMode = (mode + 1) % 3);
        this.setState({
            mode: nextMode
        })
    }
    handleItemClick = value => {
        const { onSelect } = this.props;
        const { mode } = this.state;
        let close = false;
        switch(mode) {
            case MODE.YEAR:
                this.handleModeChange(MODE.MONTH);
            break;
            case MODE.MONTH:
                this.handleModeChange(MODE.DAY);
            break;
            case MODE.DAY:
                close = true;
            break;
            default:
        }
        onSelect(value, close);
    }
    getDaysOfMonth = (month, isLeapYear) => {
        let days = 31;
        switch(month){
            case MONTH.FEB:
                days = isLeapYear ? 29 : 28;
            break;
            case MONTH.APR:
            case MONTH.JUN:
            case MONTH.SEP:
            case MONTH.NOV:
                days = 30;
            break;
            default:
            break;
        }
        return days;
    }
    renderControl = title => {
        return (
            <div className="control">
                <FontAwesome 
                    className="icon" 
                    name="chevron-left"
                    onClick={ this.handlePrevClick }
                />
                <span 
                    className="icon mode-btn"
                    onClick={ () => this.handleModeChange() }
                >
                    { title }
                </span>
                <FontAwesome 
                    className="icon" 
                    name="chevron-right"
                    onClick={ this.handleNextClick }
                /> 
            </div>
        )
    }
    renderYearFace = date => {
        const mmt = moment(date, DATE_FMT);
        const { value } = this.props;
        const selectedDate = moment(value);
        const year = mmt.get('year');
        var yearFace = [];
        const min = Math.floor(year/10) * 10 - 1;
        const max = (Math.floor(year/10) + 1) * 10;
        const title = `${min}-${max}`;
        for(let year = min; year <= max; year++) {
            let style = classNames({
                "item": true,
                "year-item": true,
                "outside": year === min || year === max,
                "selected": selectedDate.get('year') === year,
            });
            let value = `${year}-${mmt.format('MM-DD')}`;
            yearFace.push(
                <div 
                    key={ `year-${year}` }
                    className={ style }
                    onClick={ () => this.handleItemClick(value) }
                >
                    { year }
                </div>
            )
        }

        return (
            <>
                { this.renderControl(title) }
                <div className="calendar-body">
                    { yearFace }
                </div>
            </>
        )
    }
    renderMonthFace = date => {
        const mmt = moment(date, DATE_FMT);
        const { value } = this.props;
        const selectedDate = moment(value);
        const title = mmt.format('YYYY');
        return (
            <>
                { this.renderControl(title) }
                <div className="calendar-body">
                    {
                        Object.keys(MONTH).map(
                            month => {
                                let style = classNames({
                                    "item": true,
                                    "month-item": true,
                                    "selected": selectedDate.get('year') === mmt.get('year') && selectedDate.get('month') === MONTH[month],
                                });
                                let value = `${mmt.get('year')}-${MONTH[month] + 1}-${mmt.get('date')}`;
                                return (
                                    <div 
                                        key={ `month-${month}` }
                                        className={ style }
                                        onClick={ () => this.handleItemClick(value) }
                                    >
                                        { month }
                                    </div>
                                )
                            }
                        )
                    }
                </div>
            </>
        )
    }
    renderDayFace = date => {
        const mmt = moment(date, DATE_FMT);
        var dayFace = [];
        const { value } = this.props;
        const selectedDate = moment(value);
        const title = mmt.format('MMM YYYY');
        const aMonthBeforeMmt = mmt.clone().subtract(1, 'month');
        const daysOfCurrMonth = this.getDaysOfMonth(mmt.get('month'), mmt.get('year')%4 === 0);
        const daysOfPrevMonth = this.getDaysOfMonth(aMonthBeforeMmt.get('month'), aMonthBeforeMmt.get('year')%4 === 0);

        //weekday header
        for(let d = WEEKDAY.Su; d <= WEEKDAY.Sa; d++) {
            let hdrStyle = classNames({
                "day-item": true,
                "hdr": true,
                "holiday": d === WEEKDAY.Su || d === WEEKDAY.Sa, 
            })
            let header = Object.keys(WEEKDAY)[d];
            dayFace.push(
                <div key={ header} className={ hdrStyle }>{ header }</div>
            )
        }
        
        const currDate = mmt.get('date');
        const daysFromLastMonth = mmt.subtract(currDate - 1, 'day').get('day');

        //prev month
        for(let date = daysOfPrevMonth - daysFromLastMonth + 1; date <= daysOfPrevMonth; date++){
            let prevMonthStyle = classNames({
                "item": true,
                "day-item": true,
                "outside": true,
                "selected": selectedDate.format('YYYY-MM') === aMonthBeforeMmt.format('YYYY-MM') && selectedDate.get('date') === date,
            });
            let value = `${aMonthBeforeMmt.format('YYYY-MM')}-${date}`;
            dayFace.push(
                <div 
                    key={ `prev-month-${date}` } 
                    className={ prevMonthStyle }
                    onClick={ () => this.handleItemClick(value) }
                >
                    { date }
                </div>
            )
        }

        //curr month
        const today = moment();
        for(let date = 1; date <= daysOfCurrMonth; date++){
            let style = classNames({
                "item": true,
                "day-item": true,
                "today": today.format('YYYY-MM') === mmt.format('YYYY-MM') && today.get('date') === date,
                "selected": selectedDate.format('YYYY-MM') === mmt.format('YYYY-MM') && selectedDate.get('date') === date,
            });
            let value = `${mmt.format('YYYY-MM')}-${date}`;
            dayFace.push(
                <div 
                    key={ `curr-month-${date}` } 
                    className={ style }
                    onClick={ () => this.handleItemClick(value) }
                >
                    { date }
                </div>
            )
        }

        //next month
        const aMonthAftMmt = mmt.clone().add(1, 'month');
        const daysFromNextMonth =  7 * 6 - (daysOfCurrMonth + daysFromLastMonth);
        for(let date = 1; date <= daysFromNextMonth; date++){
            let nextMonthStyle = classNames({
                "item": true,
                "day-item": true,
                "outside": true,
                "selected": selectedDate.format('YYYY-MM') === aMonthAftMmt.format('YYYY-MM') && selectedDate.get('date') === date,
            });
            let value = `${aMonthAftMmt.format('YYYY-MM')}-${date}`;
            dayFace.push(
                <div 
                    key={ `next-month-${date}` } 
                    className={ nextMonthStyle }
                    onClick={ () => this.handleItemClick(value) }
                >
                    { date }
                </div>
            )
        }

        return (
            <>
                { this.renderControl(title) }
                <div className="calendar-body">
                    { dayFace }
                </div>
            </>
        )
    }
    render() {
        const { mode, date } = this.state;
        let renderCalendarBody;
        switch(mode) {
            case MODE.YEAR: 
                renderCalendarBody = this.renderYearFace
                break;
            case MODE.MONTH:
                renderCalendarBody = this.renderMonthFace
                break;
            case MODE.DAY:
                renderCalendarBody = this.renderDayFace
                break;
            default:
                break;
        }
        return (
            <div className="calendar">
                { renderCalendarBody(date) }
            </div>
        );
    }
}

export default Calendar;