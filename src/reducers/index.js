import { UPDATE_DATE } from '../actions';
import moment from 'moment';
import { DATE_FMT } from '../components/CalendarInput/constants';

const initialState = {
    date: moment().format(DATE_FMT),
};

export default function(state = initialState, action) {
    switch(action.type) {
        case UPDATE_DATE:
            return Object.assign({}, state, {
                date: moment(action.data.date).format(DATE_FMT)
            })
        default:
            return state;
    }
}
