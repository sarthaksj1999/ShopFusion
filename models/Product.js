const mongoose = require('mongoose');
const Review = require('./Review');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },

    img: {
        type: String,
        trim: true
        // default: 
    },

    price: {
        type: Number,
        required: true,
        min: 0,
    },

    desc: {
        type: String,
        trim: true
    },

    avgRating: {
        type: Number,
        default: 0
    },

    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

//Middleware jo BTS mongodb operations karvane par use hota hai and iske andar pre and post middleware hote hai jo schema me lagte hai

productSchema.post('findOneAndDelete', async (product) => {
    if (product.reviews.length > 0) {
        await Review.deleteMany({ _id: { $in: product.reviews } })
    }
})

let Product = mongoose.model('Product', productSchema);

module.exports = Product;