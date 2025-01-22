const mongoose = require('mongoose');

const Product = require('./models/Product');

const products = [
    {
        name: "I Phone 16 Pro",
        img: "https://www.designinfo.in/wp-content/uploads/2024/09/Apple-iPhone-16-Pro-128GB-Natural-Titanium-6-485x485-optimized.webp",
        price: 120000,
        desc: "Very Costly"
    },
    {
        name: "Macbook M4 Pro",
        img: "https://photos5.appleinsider.com/gallery/60842-125275-60106-123358-60078-123295-59304-121043-000-lede-M4-MacBook-Pro-xl-xl-xl-xl.jpg",
        price: 200000,
        desc: "Aukaat ke bahar"
    },
    {
        name: "Apple Watch Ultra 2",
        img: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MXTT3ref_VW_34FR+watch-case-49-titanium-natural-ultra2_VW_34FR+watch-face-49-trail-ultra2_VW_34FR_GEO_IN?wid=752&hei=720&bgc=fafafa&trim=1&fmt=p-jpg&qlt=80&.v=Nmc3Z3VDZU5tSWtGTUh0STBHdXhFbmpDV2hhem5qNnpDenFtKzI1OXdzYkpncG05NXptdno5VmVNOFY1RGFaTE96dTRSSXdkWit3NnU2Q1orZWxLbVJjU2hUMWxocXcxbUF2c0Zrbk5pNWxQRFYxUUNxcXo1R1JmVUNGRExieW5lQmd0L3dGbTZoRzhHVWNnbzJ3Q2djKzNTbk5oNWNKTXhGZnI1Vm1GbjNSQUM0VzY0ZFZ0S21LTGc3Snk3TVBjOWE5RkJ2dEY1c1pRZkdGUUtnZHBSUXZSVnhvdlcwYzFyZG43STFrb1h0cw",
        price: 50000,
        desc: "Costly"
    },
    {
        name: "I Pad Pro M4",
        img: "https://www.q3tech.com/wp-content/uploads/2024/05/Apple-m4-chip.png",
        price: 100000,
        desc: "Costly"
    },
    {
        name: "Airpods Pro 2",
        img: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FV1_FMT_WHH?wid=752&hei=636&fmt=jpeg&qlt=90&.v=1725492498882",
        price: 20000,
        desc: "Very Cheap"
    },
]

//Promise ki chaining se bachne ke liye async await use krna hai
//Mongoose methods always returns a promise
async function seedDB() {
    await Product.deleteMany({}); //Taaki same items dobara seed na ho jae
    await Product.insertMany(products);
    console.log("Data Seeded Successfully!");
}

module.exports = seedDB;