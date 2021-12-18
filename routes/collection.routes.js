const router = require("express").Router();
const axios = require("axios");
// const { create } = require("../models/Collection.model");

const ObjectId = require("mongodb").ObjectId;
const Post = require("../models/Collection.model");
const ProductModel = require("../models/Product.model");
const multer = require("multer");
// const cloud = require("../config/cloudinary.config");

// const upload = multer({ dest: "./public/uploads/" });

const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/upload/", (req, res, next) => {
  res.render("pages/create-form");
});

// router.post(
//   "/upload/",
//   cloud("Makeup-Collection").single("photo"),
//   (req, res) => {
//     console.log("file object", req.file);
//     res.render("pages/create", req.file);
//   }
// );

router.get("/create/", isLoggedIn, (req, res, next) => {
  Post.find().then((responseFromDB) => {
    const cop = responseFromDB.map((favPost) => ({
      brand: favPost.brand,
      name: favPost.name,
      name2: favPost.name2,
      name3: favPost.name3,
      collectionName: favPost.collectionName,
      products: favPost.products,
      description: favPost.description,
      _id: favPost._id,
      top3: favPost.top3,
      imageUrl: favPost.imageUrl,
      collectionName: favPost.collectionName,
      undertone: favPost.undertone,
      // img: favPost.img,
      // cloudinary_id: favPost.cloudinary_id,
      // user: favPost.user.username,
    }));

    res.render("pages/create", { cop });
  });
});

router.post("/create/", (req, res, next) => {
  // const productInfo = req.body;
  // Post

  //     .create(

  const { name, name2, name3, description, collectionName, brand, undertone } =
    req.body;
  Post.create({
    name,
    name2,
    name3,
    description,
    collectionName,
    brand,
    undertone,
  })
    .then((newSavedProduct) => {
      // console.log("is this a new book: ", newSavedBook);
      res.redirect("/collection/create/"); // 🏃‍♀️ 🏃‍♀️ 🏃‍♀️ GO TO LIST OF ALL BOOKS PAGE TO SEE YOUR NEW BOOK THERE
    })
    .catch((error) =>
      console.log(
        "An error occurred while saving a book to the database: ",
        error
      )
    ); // <--- .catch() - if some error happens handle it here
});

// )
//         .then(() => res.redirect(`/collection/create/`))
//         .catch((error) => console.log(error));
// });

//     })
//     .catch(error => next(error));

//     })
//     .catch(error => next(error));

//delete

router.post("/create/delete/:id", (req, res, next) => {
  // const { id } = req.params;
  // console.log('The ID from the URL is: ', id);
  Post.findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/collection/create/"))
    .catch((error) => next(error));
});

//edit

router.get("/create/edit/:id", isLoggedIn, (req, res, next) => {
  Post.findById(req.params.id)
    .then((postToBeEditiedFromDB) => {
      // bookToBeEditedFromDB - placeholder

      // console.log("Book to be edited: ", bookToBeEditedFromDB)
      res.render("pages/edit", postToBeEditiedFromDB);
    })
    .catch((error) =>
      console.log(
        "An error occurred while deleting a book from the database: ",
        error
      )
    ); // <--- .catch() - if some error happens handle it here
});

router.post("/create/edit/:id", (req, res, next) => {
  const {
    brand,
    name,
    products,
    description,
    top3,
    collectionName,
    undertone,
  } = req.body;

  Post.findByIdAndUpdate(
    req.params.id,
    {
      brand,
      name,
      products,
      description,
      top3,
      collectionName,
      undertone,
    },
    { new: true }
  )

    .then((updatePostFromDB) => {
      res.redirect(`/collection/create/`);
    })
    .catch((error) =>
      console.log(
        "An error occurred while updating a product in the database: ",
        error
      )
    ); // <--- .catch() - if some error happens handle it here
});

router.get("/create/:id", (req, res, next) => {
  Post.findById(req.params.id).then((postFromDB) => {
    Post.findById(req.params.id)
      .then((postFromDB) => {
        res.render("pages/edit", postFromDB);
      })
      .catch((error) =>
        console.log(
          "An error occurred while getting a product from database: ",
          error
        )
      ); // <--- .catch() - if some error happens handle it here
  });
});

// const cop = responseFromDB.map((favPost) => ({
//     brand: favPost.brand,
//     name: favPost.name,
//     products: favPost.products,
//     description: favPost.description,
//     _id: favPost._id,
//     top3: favPost.top3,
//     imageUrl: favPost.imageUrl,
//     collectionName: favPost.collectionName,
//     undertone: favPost.undertone,
//     cloudinary_id: favPost.cloudinary_id,
//     // user: favPost.user.username,
// }))

module.exports = router;
