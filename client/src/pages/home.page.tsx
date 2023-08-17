import React, { useEffect, useState } from "react";
import Navbar from "../components/header.component";
import Announcement from "../components/anonouncement.component";
import Slider from "../components/slider.component";
import Categories from "../components/categories.component";
import Products, { IProduct } from "../components/products.component";
import Newsletter from "../components/newsletter.component";
import FooterComponent from "../components/footer.component";
import WishlistSnackbar from "../utils/snackbar.popup";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";



const Home: React.FC = () => {
    const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
    const [liked, setLiked] = useState<boolean>(false);
    const [product, setProduct] = useState<IProduct | null>(null);

    const navigate = useNavigate();
    const wishlistProducts = useAppSelector((state) => state.wishlist.products);

    useEffect(() => {
        const isProductInWishlist = wishlistProducts.some(
            (wishlistProduct) => wishlistProduct._id === product?._id
        );
        setLiked(isProductInWishlist);
    }, [wishlistProducts, product?._id]);

    useEffect(() => {
        if (liked) {
            setSnackbarOpen(true);
        }
    }, [liked]);

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <Announcement />
            <Navbar />
            <Slider />
            <Categories />
            <Products />
            {snackbarOpen && (
                <WishlistSnackbar
                    open={snackbarOpen}
                    onClose={handleCloseSnackbar}
                    onGoToWishlist={() => navigate("/cabinet/wishlist")}
                />
            )}
            <Newsletter />
            <FooterComponent />
        </>
    );
};

export default Home;
