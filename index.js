const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const {Product} = require("./models/productModels.js");
const ProductRoute = require('./routes/productRoutes.js')
dotenv.config()

const port = process.env.PORT || 3000;

const App = express();
App.use(express.json())
App.use(cors());



App.use(ProductRoute)

App.get('/', (req, res) => {
    res.send('Hello World!')
})

Product.sequelize.sync().then(() => {
    // Lanjutkan dengan menjalankan server atau rute-rute aplikasi
    App.listen(4000, () => {
        console.log('Server berjalan pada http://localhost:4000');
    });
}).catch(err => {
    console.error('Gagal melakukan sinkronisasi:', err);
});


