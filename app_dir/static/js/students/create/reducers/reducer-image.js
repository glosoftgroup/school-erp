export default function (state = null, action) {
    switch (action.type) {
        case 'IMAGE_SELECTED':
            return action.payload;
            break;
    }
    return state;
}