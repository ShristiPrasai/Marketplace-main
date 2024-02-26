import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Product from './model/productmodel.mjs';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const uri = "mongodb+srv://ShristiPrasai:5K0v02sVblVJpSMf@cluster0.eyfarp5.mongodb.net/"

app.get('/', (req, res) => res.send('Marketplace App is Running!'));

app.get('/products', async (req, res, next) => {
    if (req.query.name) {
        try {
            const regex = new RegExp(req.query.name, 'i');
            const products = await Product.find({name: regex});
            return res.status(200).json(products);
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    } else {
        next();
    }
});

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.post('/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({message: `cannot find any product with ID ${id}`});
        }
        const updatedProduct = await Product.findByIdAndUpdate(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({message: `Cannot find any product with ID ${id}`});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.delete('/products', async (req, res) => {
    try {

        const products = await Product.deleteMany({});


        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

mongoose.connect(uri)
  .then(() => {
    console.log('Connected! to mongodb');
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
  })
  .catch(error => console.log(error));
