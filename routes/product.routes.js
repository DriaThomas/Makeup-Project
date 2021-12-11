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
router.post("/details/:vin/:isSaved?", isLoggedIn, (req, res, next) => {
  let { _id } = req.session.user;
  const product_link = req.body.product_link
    ? req.body.product_link
    : req.session.product_linkFromGlobalScope;
  console.log("product detals", product_link);
  const { id, isSaved } = req.params;
  const errorDeletion = req.session?.errorDeletion;
  productsApi.getVehicleDetails(id).then((vehicleFromAPI) => {
    const dealerName = vehicleFromAPI.data.dealerName;
    Dealer.find({ dealerName: dealerName })
      .populate({
        path: "reviews",
        populate: {
          path: "user_id",
        },
      })
      .then((foundDealerFromDB) => {
        const foundDealer = JSON.parse(JSON.stringify(foundDealerFromDB));
        const preparedDelaerLink = product_link?.startsWith(`http`)
          ? product_link
          : `https://${product_link}`;
        res.status(200).render("vehicles/vehicle-details", {
          currentActiveUserId: _id,
          vehicle: vehicleFromAPI.data,
          foundDealer: foundDealer,
          dealerName: dealerName,
          dealerLink: preparedDelaerLink,
          isSaved: isSaved,
          errorDeletion: errorDeletion,
        });
        console.log("gro", productsApi.getVehicleDetails());
      });
    delete req.session.errorDeletion;
  });
});

// router.post("/details/:id/:isSaved?", isLoggedIn, (req, res, next) => {
//   const { name, brand, description } = req.body;
//   const obj = JSON.parse(JSON.stringify(req.body));
//   console.log("product details", obj);
//   res.render("vehicles/vehicle-details", obj);
// });
module.exports = router;
