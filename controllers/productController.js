const { Product } = require('../models/productModels.js');

// Mendefinisikan fungsi getProduct untuk mengambil semua produk
const getProduct = async (req, res) => {
    try {
        // Menggunakan metode findAll dari model Product
        const products = await Product.findAll({
            attributes: ['id', 'title', 'description', 'price', 'imageUrl', 'quantity']
        });

        // Mengembalikan respons dengan status 200 dan data produk
        res.status(200).json({ products });
    } catch (error) {
        // Menangani dan mencetak kesalahan
        console.error('Error saat mengambil produk:', error);
        res.status(500).json({ message: 'Kesalahan server internal' });
    }
};

// Mendefinisikan fungsi getProductById untuk mengambil produk berdasarkan ID
const getProductById = async (req, res) => {
    const id = req.params.id; // Mengambil ID produk dari parameter URL
    try {
        // Menggunakan metode findOne dari model Product
        const product = await Product.findOne({
            where: {
                id: id
            },
            attributes: ['id', 'title', 'description', 'price', 'imageUrl', 'quantity']
        });

        // Jika produk tidak ditemukan, kembalikan respons 404
        if (!product) {
            return res.status(404).json({ message: 'Produk tidak ditemukan' });
        }

        // Mengembalikan respons dengan status 200 dan data produk
        return res.status(200).json(product);
    } catch (error) {
        // Menangani dan mencetak kesalahan
        console.error('Error saat mengambil produk:', error);
        return res.status(500).json({ message: 'Kesalahan server internal' });
    }
};

const deleteProductById = async (req, res) => {
    const id = req.params.id; // Mengambil ID produk dari parameter URL
    try {
        // Menggunakan metode findOne dari model Product
        const product = await Product.destroy({
            where: {
                id: id
            },
       });

        // Jika produk tidak ditemukan, kembalikan respons 404
        if (!product) {
            return res.status(404).json({ message: 'Produk tidak ditemukan' });
        }

        // Mengembalikan respons dengan status 200 dan data produk
        return res.status(200).json(product);
    } catch (error) {
        // Menangani dan mencetak kesalahan
        console.error('Error saat mengambil produk:', error);
        return res.status(500).json({ message: 'Kesalahan server internal' });
    }
};

const createProduct = async (req, res) => {
    const { title, description, price, imageUrl, quantity } = req.body;
    if (!title || !description || !price || !imageUrl || !quantity) {
        return res.status(400).json({ message: 'Semua kolom diperlukan' });
    }
    try {
        const newProduct = await Product.create({
            title,
            description,
            price,
            imageUrl,
            quantity
        });

        return res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error saat membuat produk:', error);
        return res.status(500).json({ message: 'Kesalahan server internal' });
    }
};

const updateProductById = async (req, res) => {
    const id = req.params.id;
    const { title, description, price, imageUrl, quantity } = req.body;
    try {
        const [updated] = await Product.update(
            { title, description, price, imageUrl, quantity },
            { where: { id: id } }
        );

        if (updated === 0) {
            return res.status(404).json({ message: 'Produk tidak ditemukan' });
        }

        const updatedProduct = await Product.findOne({ where: { id: id } });
        return res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error saat memperbarui produk:', error);
        return res.status(500).json({ message: 'Kesalahan server internal' });
    }
};



// Mengekspor fungsi-fungsi untuk digunakan di tempat lain
module.exports = {
    getProduct,
    getProductById,
    deleteProductById,
    createProduct,
    updateProductById
};
