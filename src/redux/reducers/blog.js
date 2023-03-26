import {
  GET_BLOG_FAIL,
  GET_BLOG_LIST_CATEGORIES_FAIL,
  GET_BLOG_LIST_CATEGORIES_SUCCESS,
  GET_BLOG_LIST_FAIL,
  GET_BLOG_LIST_SUCCESS,
  GET_BLOG_SUCCESS
} from "redux/types/blog";

const initialState = {
  blog_list: null,
  blog_category_list: null,
  post: null,
  count: null,
  next: null,
  previous: null
};

export default function blog(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_BLOG_LIST_SUCCESS:
      return {
        ...state,
        blog_list: payload.results.posts,
        count: payload.count,
        next: payload.next,
        previous: payload.previous
      };
    case GET_BLOG_LIST_FAIL:
      return {
        ...state,
        blog_list: null,
        count: null,
        next: null,
        previous: null
      };
    case GET_BLOG_SUCCESS:
      return {
        ...state,
        post: payload.post
      };
    case GET_BLOG_FAIL:
      return {
        ...state,
        post: null
      };
    case GET_BLOG_LIST_CATEGORIES_SUCCESS:
      return {
        ...state,
        blog_category_list: payload.results.posts,
        count: payload.count,
        next: payload.next,
        previous: payload.previous
      };
    case GET_BLOG_LIST_CATEGORIES_FAIL:
      return {
        ...state,
        blog_category_list: null,
        count: null,
        next: null,
        previous: null
      };

    default:
      return state;
  }
}
