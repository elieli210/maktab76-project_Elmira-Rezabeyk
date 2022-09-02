import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:300/orders";
const URL_delivered = "http://localhost:300/orders?delivered=true";
const URL_notdelivered = "http://localhost:300/orders?delivered=false";

const initialState = {
  order: [],
};

export const getOrder = createAsyncThunk(
  "order/getOrder",
  async (name, thunkAPI) => {
    try {
      const resp = await axios(URL);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
export const getDeliveredOrder = createAsyncThunk(
  "order/getOrder",
  async (name, thunkAPI) => {
    try {
      const resp = await axios(URL_delivered);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const getNotDeliveredOrder = createAsyncThunk(
  "order/getOrder",
  async (name, thunkAPI) => {
    try {
      const resp = await axios(URL_notdelivered);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getOrder.fulfilled, (state, action) => {
      state.order = action.payload;
    });
  },
});
export default orderSlice.reducer;