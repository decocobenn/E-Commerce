import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct:(state, action)=> {
            const index = state.products.findIndex(function(product){
                    return  product._id === action.payload._id && product.color === action.payload.color && product.size === action.payload.size
            });
            if (index >= 0) {
                state.products[index].quantity += action.payload.quantity;
            } else {
                state.quantity += 1;
                state.products.push(action.payload)
            }
            state.total += action.payload.price * action.payload.quantity
        },
        removeProduct:(state, index)=> {
            state.total -= state.products[index.payload].quantity * state.products[index.payload].price;
            state.products.splice(index.payload, 1)
            state.quantity -= 1;
        }
    },
});

export const {addProduct, removeProduct} = cartSlice.actions;
export default cartSlice.reducer;
