const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const productSchema = new Schema({
  brand: { type: String },
  name: { type: String },
  description: { type: String },
  category: { type: String },
  price: Number,
  rating: Number,
  image_link: { type: String },
  poll: Number,
  tag_list: [String],

  cool: [{ type: Schema.Types.ObjectId, ref: "User" }],
  warm: [{ type: Schema.Types.ObjectId, ref: "User" }],
  neutral: [{ type: Schema.Types.ObjectId, ref: "User" }],
  // poll.count
});

module.exports = model("Product", productSchema);
