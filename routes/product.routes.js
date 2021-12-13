const express = require("express");
const app = express();
const router = require("express").Router();
const mongoose = require("mongoose");
const Dealer = require("../models/Dealer.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");
const ProductsApi = require("../service/ProductApi");
const productsApi = new ProductsApi();
// const Review = require('../models/Review.model');

// ****************************************************************************************
// POST route to submit search query
// ****************************************************************************************
router.post("/", (req, res) => {
  const { name, brand, year_min, year_max, city, bodyStyle } = req.body;
  console.log("our queries", {
    name,
    brand,
    year_min,
    year_max,
    city,
    bodyStyle,
  });

  productsApi
    .getQueriedListings(name, brand, year_min, year_max, city, bodyStyle)
    .then((queriedVehicles) => {
      const records = queriedVehicles.data;
      // const suvCars = records.filter((car) => car.brand === "covergirl");
      res.status(200).render("vehicles/vehicles-list", {
        vehiclesFromApi: records,
        // suvCars: suvCars,
      });
    })
    .catch((err) => {
      console.log("Error appaeared during getting cars from API", err);
      res.render("vehicles/vehicles-list", {
        errorMessage:
          "Oops, something went wrong,\ntry one more time, please 😔",
      });
    });
});

// ****************************************************************************************
// POST route to get the details of selected vehicle and render details page
// ****************************************************************************************
router.post("/details/:id/:isSaved?", isLoggedIn, (req, res, next) => {
  const { name, brand, year_min, year_max, city, bodyStyle } = req.body;
  console.log("our queries", {
    name,
    brand,
    year_min,
    year_max,
    city,
    bodyStyle,
  });

  productsApi
    .getVehicleDetails(name, brand, year_min, year_max, city, bodyStyle)
    .then((vehiclesProducts) => {
      const records = vehiclesProducts.data;
      // const suvCars = records.filter((car) => car.brand === "covergirl");
      res.status(200).render("vehicles/vehicle-details", {
        vehiclesFromApi: records,
        // suvCars: suvCars,
      });
    })
    .catch((err) => {
      console.log("Error appaeared during getting cars from API", err);
      res.render("vehicles/vehicle-details", {
        errorMessage:
          "Oops, something went wrong,\ntry one more time, please 😔",
      });
    });
});

// const { id } = req.params;
// Post.findById(id)
//   .populate("author comments")
//   .then((post) => {
//     User.find().then((dbUsers) => {
//       console.log(post);
//       res.render("posts/details", { post, dbUsers });
//     });
//   });

// router.post("/details/:id/:isSaved?", isLoggedIn, (req, res, next) => {
//   const { name, brand, description } = req.body;
//   const obj = JSON.parse(JSON.stringify(req.body));
//   console.log("product details", obj);
//   res.render("vehicles/vehicle-details", obj);
// });
module.exports = router;
