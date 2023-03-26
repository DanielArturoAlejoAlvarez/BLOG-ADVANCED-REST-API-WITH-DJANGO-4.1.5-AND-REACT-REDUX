import axios from "axios";
import { GET_CATEGORIES_FAIL, GET_CATEGORIES_SUCCESS } from "redux/types/blog";

export const get_categories = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json"
    }
  };

  try {
    const resp = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/category/categories`,
      config
    );
    if (resp.status === 200) {
      dispatch({
        type: GET_CATEGORIES_SUCCESS,
        payload: resp.data
      });
    } else {
      dispatch({
        type: GET_CATEGORIES_FAIL
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_CATEGORIES_FAIL
    });
  }
};
