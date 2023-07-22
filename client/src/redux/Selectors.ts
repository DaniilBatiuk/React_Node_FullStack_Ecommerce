import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

const myProductsSliceSelector = (state: RootState) => state.product;

export const filterMyProductSelector = (id: string) => createSelector(myProductsSliceSelector, (state) => {
    return state.products.filter(item => item.user._id === id);
})

