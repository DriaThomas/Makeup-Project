// const router = require("express").Router();
// const { collection } = require("../models/Collection.model");
// const Post = require("../models/Collection.model");
// const User = require("../models/User.model");

// // const { Router } = require('express');
// // const router = new Router();
// // const router = require("express").Router();
// const mongoose = require("mongoose");

// // Require the User model in order to interact with the database
// // const User = require('../models/User.model');
// // const Vehicle = require('../models/Vehicle.model');

// // const fileUploader = require("../config/cloudinary.config");

// // Require necessary (isLoggedOut and isLoggedIn) middleware in order to control access to specific routes
// const isLoggedOut = require("../middleware/isLoggedOut");
// const isLoggedIn = require("../middleware/isLoggedIn");

// // const VehiclesApi = require('../service/VehiclesApi');
// // const Review = require('../models/Review.model');
// // const vehiclesApi = new VehiclesApi();

// // ****************************************************************************************
// // GET route to show profile page
// // ****************************************************************************************

// router.get("/", isLoggedIn, (req, res) => {
//   const user = req.session.user;
//   const user_id = mongoose.Types.ObjectId(user._id);
//   User.findById(user_id).then((foundUser) => {
//     res.render("user/profile", {
//       userObject: foundUser,
//       isLoggedIn: user,
//     });
//   });
// });

// // ****************************************************************************************
// // GET route to show edit profile page
// // ****************************************************************************************

// router.get("/edit", isLoggedIn, (req, res) => {
//   const user = req.session.user;
//   const user_id = mongoose.Types.ObjectId(user._id);
//   res.render("user/edit", {
//     user: user,
//     _id: user_id,
//     isLoggedIn: req.session.user,
//   });
// });

// // ****************************************************************************************
// // POST route to edit profile page
// // ****************************************************************************************

// router.post(
//   "/",
//   isLoggedIn,
//   // fileUploader.single("profilePic"),
//   (req, res, next) => {
//     const user = req.session.user;
//     const user_id = mongoose.Types.ObjectId(user._id);
//     const {
//       firstName,
//       lastName,
//       email,
//       undertone,
//       currentProduct,
//       // currentVehicle,
//       // existingImage,
//     } = req.body;

//     let profilePic;
//     if (req.file) {
//       profilePic = req.file.path;
//     } else {
//       profilePic = existingImage;
//     }

//     User.findByIdAndUpdate(
//       user_id,
//       {
//         firstName: firstName,
//         lastName: lastName,
//         email: email,

//         undertone: undertone,
//         currentProduct: currentProduct,
//         profilePic,
//       },
//       {
//         new: true,
//       }
//     )
//       .then((updatedProfile) => {
//         res.render("user/profile", {
//           userObject: updatedProfile,
//           _id: user_id,
//           isLoggedIn: req.session.user,
//         });
//       })
//       .catch((error) => {
//         if (error instanceof mongoose.Error.ValidationError) {
//           return res.status(400).render("auth/signup", {
//             errorMessage: error.message,
//           });
//         }
//       });
//   }
// );

// // ****************************************************************************************
// // POST route to delete user from database
// // ****************************************************************************************
// router.post("/delete/:user_id", isLoggedIn, (req, res, next) => {
//   const { user_id } = req.params;
//   const objUserId = mongoose.Types.ObjectId(user_id);
//   User.findByIdAndDelete(user_id)
//     .then((removedAccount) => {
//       console.log({ removedAccount: removedAccount });
//       res.redirect("/auth/logout");
//     })
//     .catch((error) => next(error));
// });

// // ****************************************************************************************
// // GET route to show saved vehicles
// // ****************************************************************************************
// // router.get("/savedfavs", isLoggedIn, (req, res) => {
// //   const user = req.session.user;
// //   const user_id = req.session.user._id;
// //   User.findById(user_id)
// //     .populate({
// //       path: "vehicles",
// //     })
// //     .then((foundUserWithVehicles) => {
// //       vehiclesApi
// //         .getVehiclesList(foundUserWithVehicles.savedVehicles)
// //         .then((list) => {
// //           const normalizedList = list.map((current) => {
// //             return current.data;
// //           });
// //           res.render("vehicles/vehicles-list", {
// //             vehiclesFromApi: normalizedList,
// //             savedVehiclesPage: true,
// //             usersListOfVehicles: true,
// //           });
// //         });
// //     });
// // });

// // ****************************************************************************************
// // POST route to add saved vehicles
// // ****************************************************************************************
// router.post("/savedproducts", (req, res) => {
//   const user_id = req.session.user._id;
//   const { vin, dealerLink } = req.body;
//   User.findByIdAndUpdate(
//     user_id,
//     {
//       $push: {
//         savedproducts: { vin: vin, url: dealerLink },
//       },
//     },
//     { new: true }
//   ).then(() => {
//     res.redirect(307, `/products/details/${vin}/${true}`);
//   });
// });

// // ****************************************************************************************
// // GET route to delete a saved vehicle
// // ****************************************************************************************
// router.get("/savedproducts/delete/:vin", (req, res) => {
//   const user_id = req.session.user._id;
//   const { vin } = req.params;
//   User.findByIdAndUpdate(
//     user_id,
//     {
//       $pull: {
//         savedproducts: { vin: vin },
//       },
//     },
//     { new: true }
//   ).then((updatedSave) => {
//     console.log("deleted", updatedSave);
//     res.redirect("/profile/savedproucts");
//   });
// });

// module.exports = router;
/* GET home page */
// router.get("/user/profile", isLoggedIn, (req, res, next) => {
//   console.log(user);
//   res.render("auth/profile", user);
// });

// module.exports = router;
// router.get("/profile", (req, res, next) => {
//   // console.log(req.session)
//   User.find().populate({ path: "products", select: "name" });

//   // Post.find().populate("posts");
//   .then((updatePostFromDB) => {
//     console.log("hello", post.products.name);
//     res.render("auth/profile");
//   })
//   .catch((error) =>
//   console.log(
//     "An error occurred while updating a product in the database: ",
//     error
//   )
// );

//   User.findById(req.params.id).then((postFromDB) => {
//     User.findById(req.params.id)
//       .populate("")
//       .then((postFromDB) => {
//         console.log("hello", collections.name);
//         res.render("auth/profile", postFromDB);
//       })
//       .catch((error) =>
//         console.log(
//           "An error occurred while getting a product from database: ",
//           error
//         )
//       ); // <--- .catch() - if some error happens handle it here
//   });
// });

// router.post("/profile/:id", (req, res, next) => {
//   console.log(req.session)
//     .then(req.session=> {
//     res.render("auth/profile");
//   })
//   .catch (error => console.log("An error occurred while getting a product from database: ", error)); // <--- .catch() - if some error happens handle it here
// })

// module.exports = router;
// const { Router } = require('express');
// const router = new Router();
// const router = require("express").Router();
// const mongoose = require("mongoose");

// // Require the User model in order to interact with the database
// const User = require("../models/User.model");
// const Vehicle = require("../models/Vehicle.model");

// // const fileUploader = require("../config/cloudinary.config");

// // Require necessary (isLoggedOut and isLoggedIn) middleware in order to control access to specific routes
// const isLoggedOut = require("../middleware/isLoggedOut");
// const isLoggedIn = require("../middleware/isLoggedIn");

// const ProductsApi = require("../service/ProductApi");
// const Review = require("../models/Review.model");
// const productsApi = new ProductsApi();

// // ****************************************************************************************
// // GET route to show profile page
// // ****************************************************************************************

// router.get("/", isLoggedIn, (req, res) => {
//   const user = req.session.user;
//   const user_id = mongoose.Types.ObjectId(user._id);
//   User.findById(user_id).then((foundUser) => {
//     res.render("user/profile", {
//       userObject: foundUser,
//       isLoggedIn: user,
//     });
//   });
// });

// // ****************************************************************************************
// // GET route to show edit profile page
// // ****************************************************************************************

// router.get("/edit", isLoggedIn, (req, res) => {
//   const user = req.session.user;
//   const user_id = mongoose.Types.ObjectId(user._id);
//   res.render("user/edit", {
//     user: user,
//     _id: user_id,
//     isLoggedIn: req.session.user,
//   });
// });

// // ****************************************************************************************
// // POST route to edit profile page
// // ****************************************************************************************

// router.post(
//   "/",
//   isLoggedIn,
//   // fileUploader.single("profilePic"),
//   (req, res, next) => {
//     const user = req.session.user;
//     const user_id = mongoose.Types.ObjectId(user._id);
//     const {
//       firstName,
//       lastName,
//       email,
//       undertone,
//       currentVehicle,
//       existingImage,
//       collectionCreate,
//     } = req.body;

//     // let profilePic;
//     // if (req.file) {
//     //   profilePic = req.body.file.path;
//     // } else {
//     //   profilePic = existingImage;
//     // }
//     // console.log("profilepic", profilePic);

//     User.findByIdAndUpdate(
//       user_id,
//       {
//         firstName: firstName,
//         lastName: lastName,
//         email: email,
//         undertone: undertone,
//         currentVehicle: currentVehicle,
//         collectionCreate: collectionCreate,
//         // profilePic,
//       },
//       {
//         new: true,
//       }
//     )
//       .then((updatedProfile) => {
//         res.render("user/profile", {
//           userObject: updatedProfile,
//           _id: user_id,
//           isLoggedIn: req.session.user,
//         });
//       })
//       .catch((error) => {
//         if (error instanceof mongoose.Error.ValidationError) {
//           return res.status(400).render("auth/signup", {
//             errorMessage: error.message,
//           });
//         }
//       });
//   }
// );

// // ****************************************************************************************
// // POST route to delete user from database
// // ****************************************************************************************
// router.post("/delete/:user_id", isLoggedIn, (req, res, next) => {
//   const { user_id } = req.params;
//   const objUserId = mongoose.Types.ObjectId(user_id);
//   Review.deleteMany({ user_id: objUserId })
//     .then((removedReviews) => {
//       console.log({ removedReviews: removedReviews });
//     })
//     .catch((err) => {
//       console.log("Something went wrong during removing the reviews", err);
//       res.render("error");
//     });
//   User.findByIdAndDelete(user_id)
//     .then((removedAccount) => {
//       console.log({ removedAccount: removedAccount });
//       res.redirect("/auth/logout");
//     })
//     .catch((error) => next(error));
// });

// // ****************************************************************************************
// // GET route to show saved vehicles
// // ****************************************************************************************
// router.get("/savedproducts", isLoggedIn, (req, res) => {
//   const user = req.session.user;
//   const user_id = req.session.user._id;
//   User.findById(user_id)
//     .populate({
//       path: "product",
//     })
//     .then((foundUserWithVehicles) => {
//       productsApi
//         .getVehiclesList(foundUserWithVehicles.savedproducts)
//         .then((list) => {
//           const normalizedList = list.map((current) => {
//             return current.data;
//           });
//           res.render("vehicles/vehicles-list", {
//             vehiclesFromApi: normalizedList,
//             savedVehiclesPage: true,
//             usersListOfVehicles: true,
//           });
//         });
//     });
// });
// ///
// ///
// // ****************************************************************************************
// // POST route to add saved vehicles
// // ****************************************************************************************
// router.post("/savedproducts", (req, res) => {
//   const user_id = req.session.user._id;
//   const { id, product_api_url } = req.body;
//   User.findByIdAndUpdate(
//     user_id,
//     {
//       $push: {
//         savedproducts: { id: id, url: product_api_url },
//       },
//     },
//     { new: true }
//   ).then(() => {
//     res.redirect(307, `/product/${id}/${true}`);
//   });
// });

// // ****************************************************************************************
// // GET route to delete a saved vehicle
// // ****************************************************************************************
// router.get("/savedproducts/delete/:id", (req, res) => {
//   const user_id = req.session.user._id;
//   const { id } = req.params;
//   User.findByIdAndUpdate(
//     user_id,
//     {
//       $pull: {
//         savedproducts: { id: id },
//       },
//     },
//     { new: true }
//   ).then((updatedSave) => {
//     console.log("deleted", updatedSave);
//     res.redirect("/profile/savedproducts");
//   });
// });

// module.exports = router;

// const { Router } = require('express');
// const router = new Router();
const router = require("express").Router();
const mongoose = require("mongoose");

// Require the User model in order to interact with the database
const User = require("../models/User.model");

const fileUploader = require("../config/cloudinary.config");

// Require necessary (isLoggedOut and isLoggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

const ProductsApi = require("../service/ProductApi");
const Review = require("../models/Review.model");
const productsApi = new ProductsApi();
// ****************************************************************************************
// GET route to show profile page
// ****************************************************************************************

router.get("/", isLoggedIn, (req, res) => {
  const user = req.session.user;
  const user_id = mongoose.Types.ObjectId(user._id);
  User.findById(user_id).then((foundUser) => {
    res.render("user/profile", {
      userObject: foundUser,
      isLoggedIn: user,
    });
  });
});

// ****************************************************************************************
// GET route to show edit profile page
// ****************************************************************************************

router.get("/edit", isLoggedIn, (req, res) => {
  const user = req.session.user;
  const user_id = mongoose.Types.ObjectId(user._id);
  res.render("user/edit", {
    user: user,
    _id: user_id,
    isLoggedIn: req.session.user,
  });
});

// ****************************************************************************************
// POST route to edit profile page
// ****************************************************************************************

router.post(
  "/",
  isLoggedIn,
  fileUploader.single("profilePic"),
  (req, res, next) => {
    const user = req.session.user;
    const user_id = mongoose.Types.ObjectId(user._id);
    const {
      firstName,
      lastName,
      email,
      undertone,
      currentVehicle,
      existingImage,
    } = req.body;

    let profilePic;
    if (req.file) {
      profilePic = req.file.path;
    } else {
      profilePic = existingImage;
    }

    User.findByIdAndUpdate(
      user_id,
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        undertone: undertone,
        currentVehicle: currentVehicle,
        profilePic,
      },
      {
        new: true,
      }
    )
      .then((updatedProfile) => {
        res.render("user/profile", {
          userObject: updatedProfile,
          _id: user_id,
          isLoggedIn: req.session.user,
        });
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res.status(400).render("auth/signup", {
            errorMessage: error.message,
          });
        }
      });
  }
);

// ****************************************************************************************
// POST route to delete user from database
// ****************************************************************************************
router.post("/delete/:user_id", isLoggedIn, (req, res, next) => {
  const { user_id } = req.params;
  const objUserId = mongoose.Types.ObjectId(user_id);
  Review.deleteMany({ user_id: objUserId })
    .then((removedReviews) => {
      console.log({ removedReviews: removedReviews });
    })
    .catch((err) => {
      console.log("Something went wrong during removing the reviews", err);
      res.render("error");
    });
  User.findByIdAndDelete(user_id)
    .then((removedAccount) => {
      console.log({ removedAccount: removedAccount });
      res.redirect("/auth/logout");
    })
    .catch((error) => next(error));
});

// ****************************************************************************************
// GET route to show saved products
// ****************************************************************************************
router.get("/savedproducts", isLoggedIn, (req, res) => {
  const user = req.session.user;
  const user_id = req.session.user._id;
  User.findById(user_id)
    .populate({
      path: "products",
    })
    .then((foundUserWithVehicles) => {
      productsApi
        .getVehiclesList(foundUserWithVehicles.savedVehicles)
        .then((list) => {
          const normalizedList = list.map((current) => {
            return current.data;
          });
          res.render("vehicles/vehicles-list", {
            vehiclesFromApi: normalizedList,
            savedVehiclesPage: true,
            usersListOfVehicles: true,
          });
        });
    });
});

// ****************************************************************************************
// POST route to add saved products
// ****************************************************************************************
router.post("/savedproducts", (req, res) => {
  const user_id = req.session.user._id;
  const { id, dealerLink } = req.body;
  User.findByIdAndUpdate(
    user_id,
    {
      $push: {
        savedVehicles: { id: id, url: dealerLink },
      },
    },
    { new: true }
  ).then(() => {
    // console.log("dfs", savedVehicles);
    res.redirect(307, `/product/details/${id}/${true}`);
    // console.log("savedproducts", dealerLink);
  });
});
//get route
// ****************************************************************************************
// GET route to delete a saved product
// ****************************************************************************************
router.get("/savedproducts/delete/:id", (req, res) => {
  const user_id = req.session.user._id;
  const { id } = req.params;
  User.findByIdAndUpdate(
    user_id,
    {
      $pull: {
        savedVehicles: { id: id },
      },
    },
    { new: true }
  ).then((updatedSave) => {
    console.log("deleted", updatedSave);
    res.redirect("/profile/savedproducts");
  });
});

module.exports = router;
