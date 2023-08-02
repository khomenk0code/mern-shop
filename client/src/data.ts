export interface ISlide {
    id: number;
    img: string;
    title: string;
    desc: string;
    bg: string;
}

export const sliderItems = [
    {
        id: 1,
        img: "https://i.ibb.co/DG69bQ4/5.png",
        title: "SUMMER SALE",
        desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
        bg: "#f5fafd",
    },
    {
        id: 2,
        img: "https://i.ibb.co/DG69bQ4/2.png",
        title: "AUTUMN COLLECTION",
        desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
        bg: "#fcf1ed",
    },
    {
        id: 3,
        img: "https://i.ibb.co/cXFnLLV/3.png",
        title: "LOUNGEWEAR LOVE",
        desc: "DON'T COMPROMISE ON STYLE! GET FLAT 30% OFF FOR NEW ARRIVALS.",
        bg: "#fbf0f4",
    },
];

export interface ICategories {
    id: number;
    img: string;
    title: string;
    category: string;
}

export const categories = [
    {
        id: 1,
        img: "https://www.alpaca-onlineshop.com/1160031-large_default/basic-alpaca-coat-in-black-paco-long-swing-kuna-essentials.webp",
        title: "Outerwear Essentials",
        category: "outerwear",
    },
    {
        id: 2,
        img: "https://www.breakfastwithaudrey.com.au//wp-content/myuploads//2022/03/how-to-wear-activewear.jpg",
        title: "Active Lifestyle",
        category: "activewear",
    },
    {
        id: 3,
        img: "https://assets.vogue.com/photos/589113dfe8e3104f57c70d7f/master/w_2000,h_3000,c_limit/00-holding-mens-casual-trend.jpg",
        title: "Casual",
        category: "casualwear",
    },
];


