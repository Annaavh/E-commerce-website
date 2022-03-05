const initialState = {
  cartItems: ["item"],
};

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_TO_CART": {
      return {
        ...state,
        cartItems: [...state.cartItems, payload],
      };
    }
    case "DELETE_FROM_CART": {
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== payload.id)
      }
    }
    default:
      return state;
  }
};
