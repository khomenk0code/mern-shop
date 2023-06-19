import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../components/products.component";

interface UpdateProductQuantityPayload {
    productId: string;
    quantity: number;
    color: string;
    size: string;
}
interface removeProductPayload {
    productId: string;
    color?: string;
    size?: string;
}

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [] as IProduct[],
        quantity: 0,
        total: 0,
    },
    reducers: {
        addProduct: (state, action: PayloadAction<any>) => {
            const { price, quantity } = action.payload;
            state.quantity += quantity;
            state.products.push(action.payload);
            state.total += price * quantity;
        },
        removeProduct: (
            state,
            action: PayloadAction<removeProductPayload>
        ) => {
            const { productId, color, size } = action.payload;
            const productIndex = state.products.findIndex((product) => {
                if (product._id === productId) {
                    if (color === undefined && size === undefined) {
                        return true;
                    } else {
                        return (
                            product.color.includes(color || "") &&
                            product.size.includes(size || "")
                        );
                    }
                }
                return false;
            });

            if (productIndex !== -1) {
                const removedProduct = state.products[productIndex];
                const removedQuantity = removedProduct.quantity;

                if (removedQuantity === 1) {
                    state.quantity -= 1;
                }

                state.total -= removedProduct.price * removedQuantity;
                state.products.splice(productIndex, 1);
            }
        },

        updateQuantity: (
            state,
            action: PayloadAction<UpdateProductQuantityPayload>
        ) => {
            const { productId, color, size, quantity } = action.payload;
            state.products = state.products.map((product) => {
                if (product._id === productId) {
                    const hasMatchingColor = color
                        ? product.color.includes(color)
                        : true;
                    const hasMatchingSize = size
                        ? product.size.includes(size)
                        : true;

                    if (hasMatchingColor && hasMatchingSize) {
                        const oldQuantity = product.quantity;
                        const pricePerUnit = product.price;

                        if (oldQuantity === 1 && quantity < 1) {
                            if (state.quantity > 0) {
                                state.quantity -= 1;
                            }
                        } else {
                            const priceDiff = (quantity - oldQuantity) * pricePerUnit;
                            state.quantity += quantity - oldQuantity;
                            state.total += priceDiff;
                        }

                        return {
                            ...product,
                            quantity: Math.max(1, quantity),
                        };
                    }
                }
                return product;
            });
        },

        clearCart: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
    },
});

export const { addProduct, removeProduct, updateQuantity, clearCart } =
    cartSlice.actions;
export default cartSlice.reducer;
