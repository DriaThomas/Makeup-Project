// const { Schema, model } = require("mongoose");

// // TODO: Please make sure you edit the user model to whatever makes sense in this case
// const userSchema = new Schema({
//   // name: { type: String },
//   firstName: { type: String, required: true },
//   lastName: { type: String },

//   username: {
//     type: String,
//     unique: [true, "Username is already taken"],
//   },
//   email: {
//     type: String,
//     required: [true, "Please enter email"],
//     unique: [true, "Email is already registered"],
//     match: [
//       /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
//       "Please enter a valid email",
//     ],
//   },
//   password: { type: String },
//   friendCode: {
//     type: String,
//     match: [
//       /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
//       "Please enter a valid email",
//     ],
//   },
//   favoriteProduct: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: "Product",
//     },
//   ],
//   currentProduct: [{ type: Array }],
//   products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
//   savedproducts: [{ type: Object }],
//   undertone: {
//     type: String,
//     match: ["cool", "neutral", "warm"],
//   },
//   profilePic: { type: String, required: false },
//   collections: [{ type: Schema.Types.ObjectId, ref: "Collection" }],
// });

// const User = model("User", userSchema);

// module.exports = User;

const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  email: {
    type: String,
    unique: false,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  firstName: { type: String, required: true },
  lastName: { type: String },
  userName: { type: String },
  undertone: { type: String },
  currentVehicle: [{ type: Array }],
  collectionCreate: [{ type: Schema.Types.ObjectId, ref: "Collection" }],
  product: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  savedproducts: [{ type: Object }],
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  profilePic: { type: String, required: false },
});

const User = model("User", userSchema);

module.exports = User;
