const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const productSchema = new Schema({
  product: {
    brand: String,
    name: String,
    poll: Number,
    category: String,
    price: Number,
    rating: String,
    description: String,
    image_link: String,
    api_featured_image: String,
  },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  dealer: { type: Schema.Types.ObjectId, ref: "Dealer" },
});

module.exports = model("Product", productSchema);
