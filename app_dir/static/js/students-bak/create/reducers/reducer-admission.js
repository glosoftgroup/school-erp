export default function (state = [], action) {
    switch (action.type) {
        case 'ADMISSION_SELECTED':
            return action.payload;
            break;
    }
    return state;
}