import axios from "axios"
import { 
    GET_BLOG_LIST_FAIL, 
    GET_BLOG_LIST_SUCCESS 
} from "redux/types/blog"



export const get_blog_list = ()=> async (dispatch)=>{
    const config = {
        headers: {
            Accept: "application/json"
        }
    }

    try {
        const resp = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/`, config)
        if (resp.status === 200) {
            dispatch({
                type: GET_BLOG_LIST_SUCCESS,
                payload: resp.data
            })
        }else{
            dispatch({
                type: GET_BLOG_LIST_FAIL
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: GET_BLOG_LIST_FAIL
        })
    }
}