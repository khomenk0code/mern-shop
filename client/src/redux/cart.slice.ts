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
        addProducts: (state, action: PayloadAction<IProduct[]>) => {
            const productsToAdd = action.payload;
            const updatedProducts = productsToAdd.reduce((updated, product) => {
                const existingProductIndex = updated.findIndex((p) =>
                    isMatchingProduct(p, product._id, product.color[0], product.size[0])
                );
                if (existingProductIndex !== -1) {
                    const existingProduct = updated[existingProductIndex];
                    const updatedProduct = {
                        ...existingProduct,
                        quantity: existingProduct.quantity + product.quantity,
                    };
                    return [
                        ...updated.slice(0, existingProductIndex),
                        updatedProduct,
                        ...updated.slice(existingProductIndex + 1),
                    ];
                } else {
                    return [...updated, product];
                }
            }, state.products);

            const updatedQuantity = state.quantity + productsToAdd.reduce(
                (acc, product) => acc + product.quantity,
                0
            );

            const updatedTotal = state.total + productsToAdd.reduce(
                (acc, product) => acc + product.price * product.quantity,
                0
            );

            return {
                ...state,
                products: updatedProducts,
                quantity: updatedQuantity,
                total: updatedTotal,
            };
        },

        removeProduct: (state, action: PayloadAction<RemoveProductPayload>) => {
            const { productId, color, size } = action.payload;
            const productIndex = state.products.findIndex((product) =>
                isMatchingProduct(product, productId, color, size)
            );

            if (productIndex !== -1) {
                const removedProduct = state.products[productIndex];
                const removedQuantity = removedProduct.quantity;

                const updatedQuantity = state.quantity - removedQuantity;
                const updatedTotal = state.total - removedProduct.price * removedQuantity;
                const updatedProducts = [
                    ...state.products.slice(0, productIndex),
                    ...state.products.slice(productIndex + 1),
                ];

                return {
                    ...state,
                    products: updatedProducts,
                    quantity: updatedQuantity,
                    total: updatedTotal,
                };
            }

            return state;
        },

        updateQuantity: (
            state,
            action: PayloadAction<UpdateProductQuantityPayload>
        ) => {
            const { productId, color, size, quantity } = action.payload;
            const updatedProducts = state.products.map((product) => {
                if (isMatchingProduct(product, productId, color, size)) {
                    const oldQuantity = product.quantity;
                    const pricePerUnit = product.price;
                    const priceDiff = (quantity - oldQuantity) * pricePerUnit;
                    const updatedQuantity = Math.max(1, quantity);
                    return {
                        ...product,
                        quantity: updatedQuantity,
                    };
                }
                return product;
            });

            const updatedQuantity = updatedProducts.reduce(
                (acc, product) => acc + product.quantity,
                0
            );
            const updatedTotal = updatedProducts.reduce(
                (acc, product) => acc + product.price * product.quantity,
                0
            );

            return {
                ...state,
                products: updatedProducts,
                quantity: updatedQuantity,
                total: updatedTotal,
            };
        },
        clearCart: () => initialState,
    },
});

export const {
    addProducts,
    removeProduct,
    updateQuantity,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
