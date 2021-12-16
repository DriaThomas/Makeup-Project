const express = require("express");
const app = express();
const router = require("express").Router({ mergeParams: true });
const mongoose = require("mongoose");
const Dealer = require("../models/Dealer.model");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const User = require("../models/User.model");
const Product = require("../models/Product.model");
const ProductsApi = require("../service/ProductApi");
const productsApi = new ProductsApi();
// const Review = require('../models/Review.model');

// ****************************************************************************************
// POST route to submit search query
// ****************************************************************************************
router.post("/", (req, res) => {
  const { name, brand, product_type, year_min, year_max, city, bodyStyle } =
    req.body;
  console.log("our queries", {
    name,
    brand,
    product_type,
    year_min,
    year_max,
    city,
    bodyStyle,
  });

  productsApi
    .getQueriedListings(
      name,
      product_type,
      brand,
      year_min,
      year_max,
      city,
      bodyStyle
    )
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
// router.post("/details/:id/:isSaved?", isLoggedIn, (req, res, next) => {
//   const { name, brand, year_min, year_max, city, bodyStyle } = req.body;
//   console.log("our queries", {
//     name,
//     brand,
//     year_min,
//     year_max,
//     city,
//     bodyStyle,
//   });

//   productsApi
//     .getVehicleDetails(name, brand, year_min, year_max, city, bodyStyle)
//     .then((vehiclesProducts) => {
//       const records = vehiclesProducts.data;
//       // const suvCars = records.filter((car) => car.brand === "covergirl");
//       res.status(200).render("vehicles/vehicle-details", {
//         // vehiclesFromApi: records,
//         vehicle: vehicleFromAPI.data,
//         // suvCars: suvCars,
//       });
//     })
//     .catch((err) => {
//       console.log("Error appaeared during getting cars from API", err);
//       res.render("vehicles/vehicle-details", {
//         errorMessage:
//           "Oops, something went wrong,\ntry one more time, please 😔",
//       });
//     });
// });

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

// ****************************************************************************************
// POST route to get the details of selected vehicle and render details page
// ****************************************************************************************
// router.post("/details/:vin/:isSaved?", isLoggedIn, (req, res, next) => {
//   let { _id } = req.session.user;
//   const dealerLink = req.body.dealerLink
//     ? req.body.dealerLink
//     : req.session.dealerLinkFromGlobalScope;
//   const { vin, isSaved } = req.params;
//   const errorDeletion = req.session?.errorDeletion;
//   productsApi.getVehicleDetails(vin).then((vehicleFromAPI) => {
//     const dealerName = vehicleFromAPI.data.dealerName;
//     Dealer.find({ dealerName: dealerName })
//       .populate({
//         path: "reviews",
//         populate: {
//           path: "user_id",
//         },
//       })
//       .then((foundDealerFromDB) => {
//         const foundDealer = JSON.parse(JSON.stringify(foundDealerFromDB));
//         const preparedDelaerLink = dealerLink?.startsWith(`http`)
//           ? dealerLink
//           : `https://${dealerLink}`;
//         res.status(200).render("vehicles/vehicle-details", {
//           currentActiveUserId: _id,
//           vehicle: vehicleFromAPI.data,
//           foundDealer: foundDealer,
//           dealerName: dealerName,
//           dealerLink: preparedDelaerLink,
//           isSaved: isSaved,
//           errorDeletion: errorDeletion,
//         });
//       });
//     delete req.session.errorDeletion;
//   });
// });

router.post("/details/:id", isLoggedIn, (req, res, next) => {
  console.log(productsApi.getVehicleDetails());
  ProductsApi.getVehicleDetails(id).then((productFromDB) => {
    res.render("products/details", productFromDB);
  });
  console
    .log("details products", { brand })
    .catch((error) =>
      console.log(
        "An error occurred while deleting a book from the database: ",
        error
      )
    ); // <--- .catch() - if some error happens handle it here
});

function deletePokemon() {
  let data = {
    _id: id,
  };
  fetch("https://web2-course-project-api-somrad.herokuapp.com/api/pokemons", {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(data),
  });
  console.log(data);
  console.log("pokemon deleted");
}

module.exports = router;
