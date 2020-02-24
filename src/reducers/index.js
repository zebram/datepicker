import { UPDATE_DATE } from '../actions';
import moment from 'moment';
import { DATE_FMT } from '../components/Calendar/constants';

const initialState = {
    date: moment().format(DATE_FMT),
};

export default function(state = initialState, action) {
    switch(action.type) {
        case UPDATE_DATE:
            return Object.assign({}, state, {
                date: action.data.date
            })
        default:
            return state;
    }
}
