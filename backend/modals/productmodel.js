const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    partNumber: {
        type: String,
        required: true,
        unique: true
    },
    brandName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    images: {
        type: [String], // Array of image URLs
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
