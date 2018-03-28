import {CHANGE_STATUS, TEST } from './types';

//export const fetchPosts = () => dispatch => {
//        fetch('https://jsonplaceholder.typicode.com/posts')
//            .then(res => res.json())
//            .then(data => dispatch({
//                type: FETCH_POSTS,
//                payload: data
//            }))
//}

export const changeStatus = (status) => dispatch => {
        dispatch({type:CHANGE_STATUS, payload:status})
}