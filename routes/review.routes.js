const express = require("express");
const app = express();
const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const Dealer = require("../models/Dealer.model");
const Review = require("../models/Review.model");

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

const ProductsApi = require("../service/ProductApi");
const productsApi = new ProductsApi();

// ****************************************************************************************
// GET route to render the form for adding review about a dealer
// ****************************************************************************************
router.post("/add-review/:dealerName/:id", isLoggedIn, (req, res) => {
  const { dealerLink } = req.body;
  req.session.dealerLinkFromGlobalScope = dealerLink;
  const { dealerName, id } = req.params;
  res.render("reviews/new-review", {
    dealerName,
    id,
  });
});

// ****************************************************************************************
// POST route to post a revireew
// ****************************************************************************************
router.post("/add-review", isLoggedIn, async (req, res) => {
  const { dealerName, reviewContent, id } = req.body;
  let { _id, firstName, lastName, vehicles, reviews } = req.session.user;
  const user_id = mongoose.Types.ObjectId(_id);
  try {
    const dealerInDb = await Dealer.findOne({ dealerName: dealerName });
    const createdReviewInDb = await Review.create({
      reviewContent,
      user_id,
      id,
    });
    if (!dealerInDb) {
      await Dealer.create({ dealerName: dealerName });
    }
    await Dealer.findByIdAndUpdate(dealerInDb.User_id, {
      $push: { reviews: createdReviewInDb._id },
    });
    res.redirect(307, `/product/details/${id}`);
  } catch (err) {
    console.log("Soemthing went wrong during posting the review:", err);
  }
});

// ****************************************************************************************
// GET route to delete a review if belongs to this user
// ****************************************************************************************
router.post("/delete/:reviewId/:id", isLoggedIn, async (req, res) => {
  let reviewFromDB;
  let reviewCreatorIdFromDB;
  const { _id } = req.session.user;
  let { reviewId, id } = req.params;
  const { dealerLink, dealerName } = req.body;
  req.session.dealerLinkFromGlobalScope = dealerLink;

  try {
    reviewId = mongoose.Types.ObjectId(reviewId);
    reviewFromDB = await Review.findById(reviewId);
    reviewCreatorIdFromDB = reviewFromDB.user_id.toString();
    if (_id === reviewCreatorIdFromDB) {
      await Review.findByIdAndRemove(reviewId);

      await Dealer.findOneAndUpdate(
        { dealerName: dealerName },
        {
          $pull: { reviews: reviewId },
        }
      );
    } else {
      req.session.errorDeletion =
        "You are not Authorized to Delete this review, you are not a creator of it....";
    }
  } catch (err) {
    console.log("Soemthing went wrong during deletion of the review:", err);
  }
  console.log("REDIRECTING DELETE");
  res.redirect(307, `/product/details/${id}`);
});

// ****************************************************************************************
// GET route to render the review for editing
// ****************************************************************************************
router.post("/edit/:reviewId/:dealerName/:id", (req, res) => {
  const { reviewId, dealerName, id } = req.params;
  const { dealerLink } = req.body;
  Review.findById(reviewId)
    .populate("user_id")
    .then((foundReview) => {
      console.log("My review:", foundReview);
      res.render("reviews/update-review-form", {
        foundReview: foundReview,
        dealerName: dealerName,
        reviewId: reviewId,
        id: id,
        dealerLink: dealerLink,
      });
    });
});

// ****************************************************************************************
// POST route to update the review
// ****************************************************************************************
router.post("/edit/:reviewId/:id", async (req, res) => {
  const { reviewId, id } = req.params;
  const { reviewContent, dealerLink } = req.body;
  req.session.dealerLinkFromGlobalScope = dealerLink;
  const { _id } = req.session.user;
  let reviewFromDB;
  let reviewCreatorIdFromDB;

  try {
    reviewFromDB = await Review.findById(reviewId);
    reviewCreatorIdFromDB = reviewFromDB.user_id.toString();
    if (_id === reviewCreatorIdFromDB) {
      await Review.findByIdAndUpdate(
        reviewId,
        { reviewContent: reviewContent },
        { new: true }
      );
    } else {
      req.session.errorDeletion =
        "You are not Authorized to EDIT this review, you are not a creator of it....";
    }
  } catch (err) {
    console.log("Soemthing went wrong during editing the review:", err);
  }
  console.log("REDIRECTING EDIT");
  res.redirect(307, `/product/details/${id}`);
});

module.exports = router;
