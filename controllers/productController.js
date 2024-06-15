const { Product } = require('../models/productModels.js');

// Mendefinisikan fungsi getProduct untuk mengambil produk
const getProduct = async (req, res) => {
    try {
        // Menggunakan metode findAll dari model Product
        const products = await Product.findAll({
            attributes: ['id', 'title', 'description', 'price', 'imageUrl', 'quantity']
        });

       res.status(200).json({products})
    } catch (error) {
        console.error('Error while fetching products:', error);
        throw error;
    }
};

// Mengekspor fungsi getProduct untuk digunakan di tempat lain
module.exports = {
    getProduct
};
