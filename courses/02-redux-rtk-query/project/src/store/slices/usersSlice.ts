import { mockApi } from "../../api/mockServer";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    return await mockApi.getUsers();
   
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Failed to fetch users' ;
      });
  },
});

export const usersReducer = usersSlice.reducer;