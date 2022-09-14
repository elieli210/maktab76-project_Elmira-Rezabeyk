// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const URL = "http://localhost:300/cardItems";

// const initialState = {
//   cardItems: [],
// };

// export const getCardItems = createAsyncThunk(
//   "cardItems/getCardItems",
//   async (name, thunkAPI) => {
//     try {
//       const resp = await axios(URL);
//       return resp.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue("something went wrong");
//     }
//   }
// );

// export const editCardItems = createAsyncThunk(
//   "cardItems/editCardItems",
//   ({ id, cartItems }) => {
//     return axios
//       .patch(`${URL}/${id}`, {
//         name: cartItems.name,
//         price: cartItems.price,
//         quantity: cartItems.quantity,
//       })
//       .then((res) => res.data);
//   }
// );

// export const cardItemsSlice = createSlice({
//   name: "cardItems",
//   initialState,
//   extraReducers: (builder) => {
//     builder.addCase(getCardItems.fulfilled, (state, action) => {
//       state.cardItems = action.payload;
//     });
//   },
// });
//export default cardItemsSlice.reducer;

