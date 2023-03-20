import { 
    GET_BLOG_FAIL,
    GET_BLOG_LIST_FAIL,
    GET_BLOG_LIST_SUCCESS, GET_BLOG_SUCCESS 
} from "redux/types/blog";

const initialState = {
    blog_list: null,
    post: null,
    count: null,
    next: null,
    previous: null    
}

export default function blog(state=initialState, action){
    const {type,payload} = action

    switch (type) {
        case GET_BLOG_LIST_SUCCESS:
            return {
                ...state,
                blog_list: payload.results.posts,
                count: payload.count,
                next: payload.next,
                previous: payload.previous
            }
        
        default:
            return state
    }
}