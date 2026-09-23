// export default courseSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// GET all courses
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    const res = await api.get("/courses");
    return res.data;
  }
);

// ADD course
export const addCourse = createAsyncThunk(
  "courses/addCourse",
  async (data) => {
    const res = await api.post("/courses", data);
    return res.data;
  }
);

// DELETE course
export const deleteCourse = createAsyncThunk(
  "courses/deleteCourse",
  async (id) => {
    await api.delete(`/courses/${id}`);
    return id;
  }
);

// UPDATE course (NEW)
export const updateCourse = createAsyncThunk(
  "courses/updateCourse",
  async ({ id, data }) => {
    const res = await api.put(`/courses/${id}`, data);
    return res.data;
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    list: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.list = action.payload;
      })

      // ADD
      .addCase(addCourse.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // DELETE
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (course) => course._id !== action.payload
        );
      })

      // UPDATE (IMPORTANT PART)
      .addCase(updateCourse.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (course) => course._id === action.payload._id
        );

        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  }
});

export default courseSlice.reducer;