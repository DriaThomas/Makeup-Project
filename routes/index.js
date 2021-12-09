// const router = require("express").Router();

// /* GET about us page */
// router.get("/", (req, res, next) => {
//   res.render("", {});
// });

// module.exports = router;
const router = require("express").Router();
const Dealer = require("../models/Dealer.model");

const User = require("../models/User.model");
const ProductsApi = require("../service/ProductApi");
const productsApi = new ProductsApi();

// ****************************************************************************************
// GET route to get the default set of 20 vehicles and render index/landing page
// ****************************************************************************************
router.get("/", async (req, res) => {
  try {
    const vehiclesFromApi = await productsApi.getGeneralLisiting();
    let records = vehiclesFromApi.data;
    const trimmedArrOfCars = records.filter((curr, i) => i < 5 && curr);
    const trimmedArrOfCarsAndRevLength = trimmedArrOfCars.map(
      async (current) => {
        const dealerName = current.dealerName;

        let dealer = await Dealer.findOne({ dealerName: dealerName });
        if (!dealer) {
          dealer = { reviews: [] };
        }
        current.reviewLength = dealer.reviews.length;
        return {
          ...current,
          reviewLength: dealer.reviews?.length,
        };
      }
    );

    let data = await Promise.all(trimmedArrOfCarsAndRevLength);

    res.render("index", {
      vehiclesFromApi: data,
      isLoggedIn: req.session.user,
    });
  } catch (err) {
    console.log("Error appaeared during getting cars from API", err);
    res.render("index", {
      errorMessage: "Oops, something went wrong,\ntry one more time, please 😔",
    });
  }
});

module.exports = router;
