const mongoose = require('mongoose');
const Product = require('./models/Product');

const products = [
    {
        name: "Iphone 14pro",
        img: "https://plus.unsplash.com/premium_photo-1723826752957-0a9a82c2cc80?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNoYW5lbCUyMGhlZWx8ZW58MHx8MHx8fDA%3D",
        price: 130000,
        desc: "very costly,aukat se bahar hai lala"
    },
    {
        name: "MacBook",
        img: "https://plus.unsplash.com/premium_photo-1723826752957-0a9a82c2cc80?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNoYW5lbCUyMGhlZWx8ZW58MHx8MHx8fDA%3D",
        price: 150000,
        desc: "very costly,aukat se bahar hai nikal"
    },
    {
        name: "Gucci bag",
        img: "https://plus.unsplash.com/premium_photo-1723826752957-0a9a82c2cc80?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNoYW5lbCUyMGhlZWx8ZW58MHx8MHx8fDA%3D",
        price: 100000,
        desc: "very costly, Chhori na ho paiga tere se "
    },
    {
        name: "Chanel",
        img: "https://plus.unsplash.com/premium_photo-1723826752957-0a9a82c2cc80?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNoYW5lbCUyMGhlZWx8ZW58MHx8MHx8fDA%3D",
        price: 190000,
        desc: "very costly "
    },
    {
        name: "Chanel",
        img: "https://plus.unsplash.com/premium_photo-1723826752957-0a9a82c2cc80?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNoYW5lbCUyMGhlZWx8ZW58MHx8MHx8fDA%3D",
        price: 190000,
        desc: "very costly "
    }
];

async function seedDB() {
    await Product.insertMany(products);   
    console.log("data seeded successfully");
}

module.exports = seedDB;
