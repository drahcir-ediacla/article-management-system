import { axiosInstance } from "@/app/_lib/axiosInstance";
import { setArticles, setLoading, setError } from "../reducer/articleListSlice";
import { AppDispatch } from "../store";

export const getArticles = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axiosInstance.get('/api/article');
    dispatch(setArticles(response.data));
  } catch (error) {
    console.error("Error fetching articles:", error);
    dispatch(setError('Error fetching articles.'));
  } finally {
    dispatch(setLoading(false));
  }
};
