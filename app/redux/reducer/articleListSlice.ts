import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Company {
    id: number;
    logo: string;
    name: string;
    status: "Active" | "Inactive";
}

interface Writer {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    type: "Writer" | "Editor";
    status: "Active" | "Inactive";
};

interface Editor {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    type: "Writer" | "Editor";
    status: "Active" | "Inactive";
};

interface Article {
    id: number;
    image: string;
    title: string;
    link: string;
    status: "Published" | "For Edit";
    writer: Writer;
    editor: Editor;
    company: Company;
};

interface ArticleListState {
    data: Article[];
    loading: boolean;
    error: string | null,
  }

const initialState: ArticleListState = {
    data: [],
    loading: false,
    error: null,
  };

  const articleListSlice = createSlice({
    name: "articleList",
    initialState,
    reducers: {
      setArticles: (state, action: PayloadAction<Article[]>) => { // ✅ Correct Type
        state.data = action.payload;
      },
      setLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
      },
      setError: (state, action: PayloadAction<string | null>) => {
        state.error = action.payload;
      },
    },
  });

  export const { 
    setArticles, 
    setLoading, 
    setError,
  } = articleListSlice.actions;

  export default articleListSlice.reducer;