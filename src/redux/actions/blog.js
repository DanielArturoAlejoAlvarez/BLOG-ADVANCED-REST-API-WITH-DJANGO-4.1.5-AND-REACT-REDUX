import { 
    GET_BLOG_FAIL,
    GET_BLOG_LIST_FAIL, 
    GET_BLOG_LIST_SUCCESS, 
    GET_BLOG_SUCCESS
} from "redux/types/blog"

import axios from 'axios'



export const get_blog_list = () => async (dispatch) => {
    const config = {
        headers: {
          Accept: 'application/json'
        }
      };
  
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/blog/`,
        config
      );
      
      if (resp.status === 200) {
        dispatch({
          type: GET_BLOG_LIST_SUCCESS,
          payload: resp.data
        });
      } else {
        dispatch({
          type: GET_BLOG_LIST_FAIL
        });
      }
    } catch (error) {
      dispatch({
        type: GET_BLOG_LIST_FAIL
      });
    }
  };
  

export const get_blog_list_page = (p)=> async (dispatch)=>{
    const config = {
        headers: {
            Accept: 'application/json'
        }
    }

    try {
        const resp = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/?p=${p}`, config)
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

export const get_blog = (slug)=> async (dispatch)=>{
    const config = {
        headers: {
            Accept: 'application/json'
        }
    }

    try {
        const resp = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/${slug}`, config)
        if (resp.status === 200) {
            dispatch({
                type: GET_BLOG_SUCCESS,
                payload: resp.data
            })
        }else{
            dispatch({
                type: GET_BLOG_FAIL
            })
        }
    } catch (error) {
        console.log(error)
        dispatch({
            type: GET_BLOG_FAIL
        })
    }
}