export const IMAGE_SELECTED = 'IMAGE_SELECTED'

export const selectImage = (image) => {
  console.log("You selected on user: ", image.avatar);
  return {
      type: IMAGE_SELECTED,
      payload: image
  }
}

export function saveImage(data) {
    return dispatch => {    
      dispatch(selectImage(data))
    }
}