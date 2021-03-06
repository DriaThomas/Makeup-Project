const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const dealerSchema = new Schema({
  userName: {
    type: String,
    ref: "User",
  },
  dealerUrl: {
    type: String,
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});

const Dealer = model("Dealer", dealerSchema);

module.exports = Dealer;
