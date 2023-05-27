import React from 'react';
import Navbar from "../components/header.component";
import Announcement from "../components/anonouncement.component";
import Slider from "../components/slider.component";
import Categories from "../components/categories.component";
import Products from "../components/products.component";
import Newsletter from "../components/newsletter.component";
import Footer from "../components/footer";



const Home: React.FC = () => {
    return (
        <>
            <Announcement/>
            <Navbar/>
            <Slider/>
            <Categories/>
            <Products/>
            <Newsletter/>
            <Footer/>
        </>
    );
};

export default Home;
