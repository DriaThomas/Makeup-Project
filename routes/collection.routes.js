

// const { default: axios } = require("axios");
const { default: axios } = require("axios");
const express = require("express");
const { create } = require("../models/Collection.model");
const router = require("express").Router();

const Post = require('../models/Collection.model');
const ProductModel = require("../models/Product.model");





router.post("/create/", (req, res, next) => {

    // const productInfo = req.body;
    Post

        .create(
            req.body
        )
        .then(() => res.redirect(`/collection/create/`))
        .catch((error) => console.log(error));
});







router.get("/create", (req, res, next) => {
    Post.find()
        .then((responseFromDB) => {

            const cop = responseFromDB.map((favPost) => ({
                brand: favPost.brand,
                name: favPost.name,
                products: favPost.products,
                description: favPost.description,
                top3: favPost.top3,
                imageUrl: favPost.imageUrl,
                collectionName: favPost.collectionName,
                undertone: favPost.undertone,
                makeupId: req.params.makeId,
                // user: favPost.user.username,
            }))

            res.render("pages/create", { cop });

        })

})

// router.get("/create/edit", (req, res, next) => {
//     res.render("pages/edit");
// });




router.post('/create/:postId/delete', (req, res, next) => {
    const { postId } = req.query;
    console.log('The ID from the URL is: ', postId);
    Post.findByIdAndDelete(postId)
        .then(() => res.redirect('/create'))
        .catch(error => next(error));

});




//edit



// router.post('/create/:postId/edit', (req, res, next) => {
//     const { postId } = req.params;
//     const { name, brand, description, undertone } = req.body;

//     Post.findByIdAndUpdate(postId, { name, brand, description, undertone }, { new: true })
//         .then(updatedPost => res.redirect(`/create/${updatedPost.id}`)) // go to the details page to see the updates
//         .catch(error => next(error));
// });



router.get('/create/:postId/edit', (req, res, next) => {
    const { postId } = req.params;

    Post.findById(postId)
        .then(postToEdit => {
            res.render('create/edit.hbs', { post: postToEdit }); // <-- add this line

        })
        .catch(error => next(error));
});



// router.get('/create/post:Id', (req, res, next) => {
//     const { postId } = req.params;

//     Post.findById(postId)
//       .then(thePost=> res.render('create/book-details.hbs', { book: theBook }))
//       .catch(error => {
//         console.log('Error while retrieving book details: ', error);

//         // Call the error-middleware to display the error page to the user
//         next(error);
//       });
//   });


module.exports = router;

// ****************************************************************************************
// GET route to update (edit) a book
// ****************************************************************************************

// router.get("/create/:postId/edit", (req, res, next) => {

//     Post.findById(req.params.postId)
//         .then((postToBeEditedFromDB) => {  // bookToBeEditedFromDB - placeholder

//             // console.log("Book to be edited: ", bookToBeEditedFromDB)
//             res.render("pages/edit", postToBeEditedFromDB);
//         })
//         .catch(error => console.log("An error occurred while deleting a book from the database: ", error)); // <--- .catch() - if some error happens handle it here
// });



// router.get('/create/:postId/edit', (req, res, next) => {
//     const { postId } = req.params;

//     Post.findById(postId)
//         .then(postToEdit => {
//             res.render('create/edit.hbs', { post: postToEdit }); // <-- add this line

//         })
//         .catch(error => next(error));
// });


// ****************************************************************************************
// POST route to update (edit) a book
// ****************************************************************************************
// <form action="/books/{{_id}}/edit" method="POST">

// router.post("/create/:postId/edit", (req, res, next) => {

//     // console.log("is this UPDATED book: ", req.body);

//     const {
//         brand,
//         name,
//         products,
//         description,
//         top3,
//         collectionName,
//         undertone,
//         makeupId,
//     } = req.body;

//     Post.findByIdAndUpdate(req.params.postId, {
//         brand,
//         name,
//         products,
//         description,
//         top3,
//         collectionName,
//         undertone,
//         makeupId,
//     }, { new: true })
//         .then(updatedPostFromDB => { // updatedBookFromDB - placeholder
//             // console.log("is this updated >>>>> ", updatedBookFromDB);

//             res.redirect(`/create/${req.params.postId}`); // 🏃‍♀️ 🏃‍♀️ 🏃‍♀️ GO TO DETAILS PAGE TO SEE THE UPDATED BOOK
//         })
//         .catch(error => console.log("An error occurred while updating a book in the database: ", error)); // <--- .catch() - if some error happens handle it here
// });







// router.get("/list", (req, res, next) => {
//     Room.find()
//       .populate("owner")
//       .then((roomsFromDB) => {
//         const copyOfRooms = roomsFromDB.map((room) => ({
//           _id: room._id,
//           name: room.name,
//           description: room.description,
//           imageUrl: room.imageUrl,
//           owner: room.owner.username,
//           isOwner: req.session.user._id.toString() === room.owner._id.toString(),
//         }));
//         res.render("room/list", copyOfRooms);
//       });
//   });



// router.get("/create", (req, res) => {
//     // const productInfo = req.body;
//     Post
//         .find({}.limit(10)

//             .then((responseFromDB) => res.render(`pages/create`, { posts: responseFromDB });

// });



// router.post("/delete/:id", (req, res, next) => {
//     Post.findByIdAndDelete(req.params.id).then(() => {
//         const deletePost = responseFromDB.map((byePost) => ({

//             makeupId: req.params.makeId,
//             // user: favPost.user.username,
//         }))
//         res.render("pages/create", { deletePost });
//     });
// })



// router.post('/delete/:id').delete((req, res) => {
//     Post.findByIdAndDelete(req.params.id)
//     console.log(req.id);
//     res.redirect("/create");
// });


// router.post('/delete', function (req, res, next) {
//     var id = req.body.id;
//     Post.findByIdAndDelete(id).exec();
//     res.redirect('/create');
// });
/* <form action="/room/{{_id}}/delete" method="post"></form> */
// router.post("/create/:postId/delete", (req, res, next) => {

//     Post.findByIdAndDelete(req.params.postId)
//         .then(() => {
//             res.redirect("/create"); // 🏃‍♀️ 🏃‍♀️ 🏃‍♀️ GO TO LIST OF ALL BOOKS PAGE TO SEE THAT YOUR BOOK IS NOT THERE ANY MORE
//         })
//         .catch(error => console.log("An error occurred while deleting a book from the database: ", error)); // <--- .catch() - if some error happens handle it here
// })

// router.get("/:id/edit", (req, res, next) => {
//     Post.findById(req.params.id).then((responseFromDB) => {
//         if (req.session.user._id.toString() === roomFromDB.owner.toString()) {
//             res.render("create/edit", responseFromDB);
//         } else {
//             res.redirect("/room/list");
//         }
//     });
// });

// router.get("/create/:postId/edit", (req, res, next) => {

//     Post.findById(req.params.postId)
//     console.log(req.params.postId)
//         .then((postToBeEditedFromDB) => {  // bookToBeEditedFromDB - placeholder

//             // console.log("Book to be edited: ", bookToBeEditedFromDB)
//             res.render("pages/edit", postToBeEditedFromDB);
//         })
//         .catch(error => console.log("An error occurred while deleting a book from the database: ", error)); // <--- .catch() - if some error happens handle it here
// });



// module.exports = router;
