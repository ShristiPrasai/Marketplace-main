import mongoose from 'mongoose';

// Schema for the 'product' collection
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please Enter Product Name"]
        },
        description: {
            type: String,
            required: [true, "Please Enter Product Description"]
        },
        price: {
            type: Number,
            required: [true, "Please Enter Product Price"]
        },
        quantity: {
            type: Number,
            required: [true, "Please Enter Product Quantity"],
            default: 1
        },
        category: {
            type: String,
            required: [true, "Please Enter Product Category"]
        }
    },
    {
        timestamps: true
    }
);

// Model for the 'product' collection
const Product = mongoose.model('Product', productSchema, 'product');

// Schema for the 'categories' collection
const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please Enter Category Name"]
        }
    }
);

// Model for the 'categories' collection
const Category = mongoose.model('Category', categorySchema, 'categories');

export default { Product, Category };
