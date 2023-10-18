import { PER_LIMIT } from "../../const";
import { request } from "../../server/request";

export const fetchUsers = (page = 1) => {
  return async (dispatch) => {
    dispatch({ type: "USER_LOADING" });
    let { data } = await request.get("user", {
      params: { limit: PER_LIMIT, page },
    });
    dispatch({ type: "GET_USERS", payload: data });
    console.log(data);
  };
};


export const deleteUserAction = (id) => {
  return async (dispatch) => {
    dispatch({ type: "DELETE_CATEGORY" });
    await request.delete(`user/${id}`);
    dispatch(fetchUsers());
  };
};