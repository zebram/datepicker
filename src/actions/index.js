export const UPDATE_DATE = 'UPDATE_DATE';

export function updateDate(date) {
    return {
        type: UPDATE_DATE,
        data: {
            date: date,
        }
    }
}