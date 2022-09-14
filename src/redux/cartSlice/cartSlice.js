import { createSlice } from "@reduxjs/toolkit";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const initialState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  number: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingIndex >= 0) {
        state.cartItems[existingIndex] = {
          ...state.cartItems[existingIndex],
          count: action.payload.count,
        };
        // toast.info("Increased product quantity", {
        //     position: "bottom-left",
        // });
      } else {
        let tempProductItem = { ...action.payload };
        state.cartItems.push(tempProductItem);
        // toast.success("Product added to cart", {
        //     position: "bottom-left",
        // });
      }
      state.number = action.payload.count;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      localStorage.setItem("number", JSON.stringify(state.number));
    },
    decreaseCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
        // toast.info("Decreased product quantity", {
        //     position: "bottom-left",
        // });
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        state.cartItems = nextCartItems;
        // toast.error("Product removed from cart", {
        //     position: "bottom-left",
        // });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getTotals(state, action) {
      let { total } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, count } = cartItem;
          const itemTotal = price * count;
          cartTotal.total += itemTotal;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.cartTotalAmount = total;
    },
    removeFromCart(state, action) {
      state.cartItems.map((cartItem) => {
        if (cartItem.id === action.payload) {
          const nextCartItems = state.cartItems.filter(
            (item) => item.id !== cartItem.id
          );
          state.cartItems = nextCartItems;
          // toast.error("Product removed from cart", {
          //     position: "bottom-left",
          // });
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        return state;
      });
    },
    clearCart(state, action) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      // toast.error("Cart cleared", { position: "bottom-left" });
    },
  },
});
export const { addToCart, decreaseCart, getTotals, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
