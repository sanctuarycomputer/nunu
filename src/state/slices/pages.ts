import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { Pages, HomePage } from 'lib/cms';

export const fetchHomePage = createAsyncThunk<HomePage>(
  'pages/fetchHomePageStatus',
  async (thunkAPI) => {
    return await Pages.fetchHomePage();
  }
);

type PagesState = {
  homePage: HomePage | null;
};

const initialState: PagesState = {
  homePage: null,
};

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHomePage.fulfilled, (state, { payload }) => {
      state.homePage = payload;
    });
  },
});

export default pagesSlice.reducer;
