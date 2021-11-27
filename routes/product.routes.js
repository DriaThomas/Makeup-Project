// // module.exports = router;
// // const { response } = require("express");
// // const express = require("express");

// const router = require("express").Router();
// const Product = require("../models/Product.model");
// // const service = require("../service/ProductApi");

// /* GET products page */
// router.get("/", (req, res, next) => {
//   Product.find()
//     .lean()
//     .limit(30)
//     .then((productsFromDB) => {
//       const products = { productsFromDB };
//       console.log(productsFromDB);

//       productsFromDB.forEach((product) => {
//         product.warm = product.warm?.length || 0;
//         product.cool = product.cool?.length || 0;
//         product.neutral = product.neutral?.length || 0;
//       });

//       res.render("products/list", products);
//     });
// });

// // router.post("/", (req, res, next) => {
// //   Product.create.then((responseFromDB) => {
// //     res.render("products/list", { products: responseFromDB });
// //   });
// // });

// // router.post('/:id/rate', (req, res, next) => {
// //   const { rating } = req.body;
// //   const { id } = req.params;
// //   Product.findByIdAndUpdate(id, {
// //     // $set: {
// //     //   [rating]: {
// //     //     $cond: [{
// //     //       $in: [id, `$${rating}`]
// //     //     }, { $setDifference: [`$${rating}`, [id]] },
// //     //     { $concatArrays: [`$${rating}`, [id]] }
// //     //     ]
// //     //   }
// //     $set: { [rating]: id }
// //   }, { new: true }).then(responseFromDB => {
// //     console.log({ responseFromDB });
// //     // res.redirect('')
// //   })
// // })

// // router.get("/favorite-product/", (req, res, next) => {
// //   Product.findbyId()
// //     .then((responseFromDB) => {
// //       console.log({ responseFromDB })

// //       // responseFromDB.forEach(product => {
// //       //   product.warm = product.warm?.length || 0;
// //       //   product.cool = product.cool?.length || 0;
// //       //   product.neutral = product.neutral?.length || 0;
// //       // })
// //       // console.log({ responseFromDB })
// //       res.render("pages/warm", { products: responseFromDB });
// //     });
// // });

// router.get("/:id", (req, res, next) => {
//   Product.findById(req.params.id)
//     .then((productFromDB) => {
//       res.render("undertone/warm", productFromDB);
//     })
//     .catch((error) =>
//       console.log(
//         "An error occurred while deleting a book from the database: ",
//         error
//       )
//     ); // <--- .catch() - if some error happens handle it here
// });

// // router.get('/favorite-product/edit/:id', (req, res, next) => {

// //   Product.findById(req.params.id)
// //     .then((postToBeEditiedFromDB) => {  // bookToBeEditedFromDB - placeholder

// //       // console.log("Book to be edited: ", bookToBeEditedFromDB)
// //       res.render("undertone/warm", postToBeEditiedFromDB);
// //     })
// //     .catch(error => console.log("An error occurred while deleting a book from the database: ", error)); // <--- .catch() - if some error happens handle it here
// // });

// router.post("/product/favorite-product/delete/:id", (req, res, next) => {
//   // const { id } = req.params;
//   // console.log('The ID from the URL is: ', id);
//   Product.findByIdAndDelete(req.params.id)
//     .then(() => res.redirect("/product/favorite-product/:id"))
//     .catch((error) => next(error));
// });

// router.post("/:id/rate", (req, res, next) => {
//   const { rating } = req.body;
//   const { id } = req.params;
//   Product.findByIdAndUpdate(
//     id,
//     {
//       // $set: {
//       //   [rating]: {
//       //     $cond: [{
//       //       $in: [id, `$${rating}`]
//       //     }, { $setDifference: [`$${rating}`, [id]] },
//       //     { $concatArrays: [`$${rating}`, [id]] }
//       //     ]
//       //   }
//       $set: { [rating]: id },
//     },
//     { new: true }
//   ).then((responseFromDB) => {
//     console.log({ responseFromDB });
//     // res.redirect('')
//   });
// });

// // router.get("/favorite-product/", (req, res, next) => {
// //   Product.findbyId()
// //     .then((responseFromDB) => {
// //       console.log({ responseFromDB })

// //       // responseFromDB.forEach(product => {
// //       //   product.warm = product.warm?.length || 0;
// //       //   product.cool = product.cool?.length || 0;
// //       //   product.neutral = product.neutral?.length || 0;
// //       // })
// //       // console.log({ responseFromDB })
// //       res.render("pages/warm", { products: responseFromDB });
// //     });
// // });

// router.get("/favorite-product/:id", (req, res, next) => {
//   Product.findById(req.params.id)
//     .then((productFromDB) => {
//       res.render("undertone/warm", productFromDB);
//     })
//     .catch((error) =>
//       console.log(
//         "An error occurred while deleting a book from the database: ",
//         error
//       )
//     ); // <--- .catch() - if some error happens handle it here
// });

// // router.get('/favorite-product/edit/:id', (req, res, next) => {

// //   Product.findById(req.params.id)
// //     .then((postToBeEditiedFromDB) => {  // bookToBeEditedFromDB - placeholder

// //       // console.log("Book to be edited: ", bookToBeEditedFromDB)
// //       res.render("undertone/warm", postToBeEditiedFromDB);
// //     })
// //     .catch(error => console.log("An error occurred while deleting a book from the database: ", error)); // <--- .catch() - if some error happens handle it here
// // });

// router.post("/product/favorite-product/delete/:id", (req, res, next) => {
//   // const { id } = req.params;
//   // console.log('The ID from the URL is: ', id);
//   Product.findByIdAndDelete(req.params.id)
//     .then(() => res.redirect("/product/favorite-product/:id"))
//     .catch((error) => next(error));
// });

// module.exports = router;

const router = require("express").Router();
const User = require("../models/User.model");

const isLoggedIn = require("../middleware/isLoggedIn");

const ProductsApi = require("../service/ProductApi");
const productsApi = new ProductsApi();

// ****************************************************************************************
// GET route to get the default set of 20 vehicles and render index/landing page
// ****************************************************************************************
router.get("/", async (req, res) => {
  try {
    const productsFromApi = await productsApi.getGeneralLisiting();
    let records = productsFromApi.data.records;
    const trimmedArrOfProducts = (records || []).filter(
      (curr, i) => i < 5 && curr
    );
    console.log("products", productsFromApi.data);

    const trimmedArrOfProductsAndRevLength = trimmedArrOfProducts.map(
      async (current) => {
        const username = current.username;

        let dealer = await User.findOne({ username: username });
        if (!dealer) {
          dealer = { collections: [] };
        }
        current.reviewLength = dealer.collections.length;
        return {
          ...current,
          reviewLength: dealer.collections?.length,
        };
      }
    );

    let data = await Promise.all(trimmedArrOfProductsAndRevLength);
    // const products = { productsFromDB };
    res.render("products/list", {
      // productsFromApi: data,
      // productsFromApi: records,
      // productsApi: data,
      // productsFromApi,
      productsApi,

      isLoggedIn: req.session.user,
    });
  } catch (err) {
    console.log("Error appaeared during getting cars from API", err);
    res.render("products/list", {
      errorMessage: "Oops, something went wrong,\ntry one more time, please 😔",
    });
  }
});

// ****************************************************************************************
// POST route to submit search query
// ****************************************************************************************
router.post("/", (req, res) => {
  const { name, brand, price, tag_list, image_link, product_type } = req.body;
  console.log("our queries", {
    name,
    brand,
    price,
    tag_list,
    image_link,
    product_type,
  });

  productsApi
    .getQueriedListings(name, brand, price, tag_list, image_link, product_type)
    .then((queriedVehicles) => {
      const records = queriedVehicles.data;
      const product_type = records.filter(
        (car) => car.product_type === "lipstick"
      );
      res.status(200).render("products/list", {
        productsFromApi: records,
        product_type: product_type,
      });
    })
    .catch((err) => {
      console.log("Error appaeared during getting cars from API", err);
      res.render("products/list", {
        errorMessage:
          "Oops, something went wrong,\ntry one more time, please 😔",
      });
    });
});

// ****************************************************************************************
// POST route to get the details of selected vehicle and render details page
// ****************************************************************************************
router.post("/details/:id/:isSaved?", isLoggedIn, (req, res, next) => {
  let { _id } = req.session.user;
  const dealerLink = req.body.dealerLink
    ? req.body.dealerLink
    : req.session.dealerLinkFromGlobalScope;
  const { id, isSaved } = req.params;
  const errorDeletion = req.session?.errorDeletion;
  productsApi.getProductDetails(_idUser).then((productFromAPI) => {
    const dealerName = productFromAPI.data.dealerName;
    User.find({ dealerName: dealerName })
      .populate({
        path: "collections",
        populate: {
          path: "user_id",
        },
      })
      .then((foundDealerFromDB) => {
        const foundDealer = JSON.parse(JSON.stringify(foundDealerFromDB));
        const preparedDelaerLink = dealerLink?.startsWith(`http`)
          ? dealerLink
          : `https://${dealerLink}`;
        res.status(200).render("vehicles/vehicle-details", {
          currentActiveUserId: _id,
          product: productFromAPI.data,
          foundDealer: foundDealer,
          dealerName: dealerName,
          dealerLink: preparedDelaerLink,
          isSaved: isSaved,
          errorDeletion: errorDeletion,
        });
      });
    delete req.session.errorDeletion;
  });
});

// ****************************************************************************************
// HACK, POST route to get the details of selected vehicle and get the dealerUrl for single
// vehicle (pref of the API) to render vehcile details page with all the details. This route
// 98% repeats the previous one but with '*' which cannot be applied after this one ':isSaved?'
// ****************************************************************************************
// router.post('/details/:vin/:isSaved/*', isLoggedIn, (req, res, next) => {
//   let { _id } = req.session.user;
//   // Grab params that are attached on the end of the /details/:vin/:isSaved/ route
//   console.log('HEEEEEEEEEEEEERE!!!!!!');
//   const dealerLink = req.params[0];
//   const { vin, isSaved } = req.params;
//   const errorDeletion = req.session?.errorDeletion;
//   vehiclesApi.getVehicleDetails(vin).then((vehicleFromAPI) => {
//     const dealerName = vehicleFromAPI.data.dealerName;
//     Dealer.find({ dealerName: dealerName })
//       .populate({
//         path: 'reviews',
//         populate: {
//           path: 'user_id',
//         },
//       })
//       .then((foundDealerFromDB) => {
//         const foundDealer = JSON.parse(JSON.stringify(foundDealerFromDB));
//         res.render('vehicles/vehicle-details', {
//           currentActiveUserId: _id,
//           vehicle: vehicleFromAPI.data,
//           foundDealer: foundDealer,
//           dealerName: dealerName,
//           dealerLink: dealerLink,
//           isSaved: isSaved,
//           errorDeletion: errorDeletion,
//         });
//       });
//     delete req.session.errorDeletion;
//   });
// });

module.exports = router;
