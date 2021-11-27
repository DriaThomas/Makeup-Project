document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("Makeup-Project JS imported successfully!");
  },
  false
);
// // const favorites = [];

// const getProductInfo = brand => {
//   axios
//     .get(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}`)

//     .then(response => {
//       const productDetail = response.data[0];
//       const productDetail1 = response.data[1];
//       const productDetail2 = response.data[2];
//       const productDetail3 = response.data[3];
//       const productDetail4 = response.data[4];

//       document.getElementById('product-brand').innerText = productDetail.brand;
//       document.getElementById('product-name').innerText = productDetail.name;
//       document.getElementById('product-description').innerText = productDetail.description;
//       // document.getElementById('num-fav').innerText = productDetail.name;
//       document.getElementById('image_link').setAttribute('src', productDetail.image_link);

//       document.getElementById('product-name1').innerText = productDetail1.name;
//       document.getElementById('product-description1').innerText = productDetail1.description;
//       // document.getElementById('num-fav1').innerText = productDetail1.name;
//       document.getElementById('image_link1').setAttribute('src', productDetail1.image_link);

//       document.getElementById('product-name2').innerText = productDetail2.name;
//       document.getElementById('product-description2').innerText = productDetail2.description;
//       // document.getElementById('num-fav2').innerText = productDetail2.name;
//       document.getElementById('image_link2').setAttribute('src', productDetail2.image_link);

//       document.getElementById('product-name3').innerText = productDetail3.name;
//       document.getElementById('product-description3').innerText = productDetail3.description;
//       // document.getElementById('num-fav3').innerText = productDetail3.name;
//       document.getElementById('image_link3').setAttribute('src', productDetail3.image_link);

//       document.getElementById('product-name4').innerText = productDetail4.name;
//       document.getElementById('product-description4').innerText = productDetail4.description;
//       // document.getElementById('num-fav4').innerText = productDetail4.name;
//       document.getElementById('image_link4').setAttribute('src', productDetail4.image_link);

//     })
//     .catch(error => {
//       console.log(error);
//       error.response.status === 404 ? alert(`The product${brand} doesn't exist.`) : alert('Server error! Sorry.');
//     });
// };

// document.getElementById('get-product-btn').addEventListener('click', () => {
//   const userInput = document.getElementById('product-name-input').value;
//   getProductInfo(userInput);

// });

// // const getFav = name => {
// //   axios
// //     .get(`http://makeup-api.herokuapp.com/api/v1/products.json?name=${name}`)

// //     .then(response => {
// //       const productid = response.data[0];
// //       const productid1 = response.data[1];
// //       const productid2 = response.data[2];
// //       const productid3 = response.data[3];
// //       const productid4 = response.data[4];

// //       document.getElementById('num-fav').innerText = productid.name;

// //       document.getElementById('num-fav1').innerText = productid1.name;

// //       document.getElementById('num-fav2').innerText = productid2.name;

// //       document.getElementById('num-fav3').innerText = productid3.name;

// //       document.getElementById('num-fav4').innerText = productid4.name;

// //     })
// //     .catch(error => {
// //       console.log(error);
// //       error.response.status === 404 ? alert(`The product${brand} doesn't exist.`) : alert('Server error! Sorry.');
// //     });
// // };

// // document.getElementById('add-favorites-button').addEventListener('click', () => {

// //   const productid = response.data[0];
// //   const productid1 = response.data[1];
// //   const productid2 = response.data[2];
// //   const productid3 = response.data[3];
// //   const productid4 = response.data[4];

// //   document.getElementById('num-fav').innerText = productid.name;

// //   document.getElementById('num-fav1').innerText = productid1.name;

// //   document.getElementById('num-fav2').innerText = productid2.name;

// //   document.getElementById('num-fav3').innerText = productid3.name;

// //   document.getElementById('num-fav4').innerText = productid4.name;

// //   alert("hitone");

// const fetchButton = document.getElementById("add-favorites-button");
// const fetchButton1 = document.getElementById("add-favorites-button1");
// fetchButton.addEventListener("click", () => {
//   const favName = document.getElementById("num-fav").name;
//   // use dom to get user input
//   // console.log(favName);
//   const url = `http://makeup-api.herokuapp.com/api/v1/products.json?brand`;

//   axios.get(url).then((responseFromAPI) => {
//     console.log(responseFromAPI, responseFromAPI.data[0]);
//     const productid = responseFromAPI.data[0];
//     // document.getElementById('num-fav').innerText = productid.name;
//     document.getElementById('num-fav').innerText = productid.name;
//     //button 2

//     // const fetchButton1 = document.getElementById("add-favorites-button1");
//     fetchButton1.addEventListener("click", () => {
//       const favName1 = document.getElementById("num-fav1").name;
//       // use dom to get user input
//       // console.log(favName);
//       const url = `http://makeup-api.herokuapp.com/api/v1/products.json?brand`;

//       axios.get(url).then((responseFromAPI) => {
//         console.log(responseFromAPI, responseFromAPI.data[1]);
//         const productid1 = responseFromAPI.data[1];
//         // document.getElementById('num-fav').innerText = productid.name;
//         document.getElementById('num-fav1').innerText = productid1.name;
//       });
//     })
//   })
// });

// window.onload = () => {
//   const fetchButton = document.getElementById("fetch");
//   fetchButton.addEventListener("click", () => {
//     const countryName = document.getElementById("country-name").value;
//     // use dom to get user input
//     console.log(countryName);
//     const url = `https://restcountries.eu/rest/v2/name/${countryName}`;

//     axios.get(url).then((responseFromAPI) => {
//       console.log(responseFromAPI, responseFromAPI.data[0].flag);
//       document.getElementById("flag").src = responseFromAPI.data[0].flag;
//     });
//   });
// };
