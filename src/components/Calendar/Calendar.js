import React from 'react';
import { MODE, MONTH, WEEKDAY } from './constants';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import classNames from 'classnames';
import './calendar.scss';

class Calendar extends React.Component {
    state = {
        mode: MODE.DAY,
        date: moment(),
    }
    constructor(props) {
        super(props);
        const { value } = props;
        this.state.date = moment(value);
    }
    handlePrevClick = se => {
        const { mode, date } = this.state;
        let prevDate;
        mode === MODE.DAY && (prevDate = date.subtract(1, 'month'));
        mode === MODE.MONTH && (prevDate = date.subtract(1, 'year'));
        mode === MODE.YEAR && (prevDate = date.subtract(10, 'year'));
        this.setState({
            date: prevDate
        });
    }
    handleNextClick = se => {
        const { mode, date } = this.state;
        let nextDate;
        mode === MODE.DAY && (nextDate = date.add(1, 'month'));
        mode === MODE.MONTH && (nextDate = date.add(1, 'year'));
        mode === MODE.YEAR && (nextDate = date.add(10, 'year'));
        this.setState({
            date: nextDate
        });
    }
    handleModeChange = () => {
        const { mode } = this.state;
        this.setState({
            mode: (mode + 1) % 3
        })
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
                    onClick={ this.handleModeChange }
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
    renderYearFace = mmt => {
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
            yearFace.push(<div className={ style }>{ year }</div>)
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
    renderMonthFace = mmt => {
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
                                return <div className={ style }>{ month }</div>
                            }
                        )
                    }
                </div>
            </>
        )
    }
    renderDayFace = mmt => {
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
            dayFace.push(
                <div key={ `prev-month-${date}` } className={ prevMonthStyle }>{ date }</div>
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
            dayFace.push(
                <div key={ date } className={ style }>{ date }</div>
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
            dayFace.push(
                <div key={ `next-month-${date}` } className={ nextMonthStyle }>{ date }</div>
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