export const EDITABLE_SELECTED = 'EDITABLE_SELECTED'

// send payload={editable:true} will make form fields editable
export const selectEditable = (payload) => {
    return {
        type: EDITABLE_SELECTED,
        payload
    }
};
