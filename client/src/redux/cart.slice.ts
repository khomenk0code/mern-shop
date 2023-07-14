import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../components/products.component";

interface CartState {
    products: IProduct[];
    quantity: number;
    total: number;
}

interface UpdateProductQuantityPayload {
    productId: string;
    quantity: number;
    color: string;
    size: string;
}

interface RemoveProductPayload {
    productId: string;
    color?: string;
    size?: string;
}

const initialState: CartState = {
    products: [],
    quantity: 0,
    total: 0,
};

const isMatchingProduct = (
    product: IProduct,
    productId: string,
    color?: string,
    size?: string
): boolean => {
    return (
        product._id === productId &&
        (color === undefined || product.color[0] === color) &&
        (size === undefined || product.size[0] === size)
    );
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<IProduct>) => {
            const product = action.payload;
            const existingProduct = state.products.find((p) =>
                isMatchingProduct(
                    p,
                    product._id,
                    product.color[0],
                    product.size[0]
                )
            );

            if (existingProduct) {
                existingProduct.quantity += product.quantity;
            } else {
                state.products.push(product);
            }

            state.quantity += product.quantity;
            state.total += product.price * product.quantity;
        },
        addProducts: (state, action: PayloadAction<IProduct[]>) => {
            const productsToAdd = action.payload;

            //проверить пейлоад если массив использовать форич если не массив а обьет добавить его в массив

            productsToAdd.forEach((product) => {
                const existingProduct = state.products.find((p) =>
                    isMatchingProduct(p, product._id, product.color[0], product.size[0])
                );

                if (existingProduct) {
                    existingProduct.quantity += product.quantity;
                } else {
                    state.products.push(product);
                }

                state.quantity += product.quantity;
                state.total += product.price * product.quantity;
            });
        },

        removeProduct: (state, action: PayloadAction<RemoveProductPayload>) => {
            const { productId, color, size } = action.payload;
            const productIndex = state.products.findIndex((product) =>
                isMatchingProduct(product, productId, color, size)
            );

            if (productIndex !== -1) {
                const removedProduct = state.products[productIndex];
                const removedQuantity = removedProduct.quantity;

                if (removedQuantity === 1) {
                    state.quantity -= 1;
                } else {
                    state.quantity -= removedQuantity;
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
            const product = state.products.find((p) =>
                isMatchingProduct(p, productId, color, size)
            );

            if (product) {
                const oldQuantity = product.quantity;
                const pricePerUnit = product.price;

                const priceDiff = (quantity - oldQuantity) * pricePerUnit;
                state.quantity += quantity - oldQuantity;
                state.total += priceDiff;

                product.quantity = Math.max(1, quantity);
            }
        },
        clearCart: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
    },
});

export const { addProduct, addProducts, removeProduct, updateQuantity, clearCart } =
    cartSlice.actions;

export default cartSlice.reducer;
