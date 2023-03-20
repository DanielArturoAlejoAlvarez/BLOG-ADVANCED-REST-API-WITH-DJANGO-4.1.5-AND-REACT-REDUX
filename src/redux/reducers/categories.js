import { 
    GET_CATEGORIES_FAIL, 
    GET_CATEGORIES_SUCCESS 
} from "redux/types/blog";

const initialState = {
    categories: null
}

export default function categories(state=initialState, action){
    const { type,payload } = action

    switch (type) {
        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: payload.categories
            }
        case GET_CATEGORIES_FAIL:
            return {
                ...state,
                categories: null
            }
    
        default: state
    }
}