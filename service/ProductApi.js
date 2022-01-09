// module.exports = app => {
//     app.use('/', require('./base.routes'));
//     app.use('/rankings', require('./products')); // add this!
// };

// const axios = require("axios");

// class ProductsApi {
//   constructor() {
//     this.api = axios.create({
//       baseURL: "http://makeup-api.herokuapp.com/api/v1/products.json?brand",
//     });
//   }

//   getAllProducts = () => this.api.get("/product");

//   getOneProduct = (productId) => this.api.get(`/product/${productId}`);

//   createProduct = (productInfo) => this.api.post(`/rankings`, productInfo);

//   editProduct = (productId, productInfo) =>
//     this.api.put(`/product/${productId}`, productInfo);

//   deleteProduct = (productId) => this.api.delete(`/product/${productId}`);
// }

// module.exports = ProductsApi;

// const axios = require("axios");

// class ProductApi {
//   constructor() {
//     this.api = axios.create({
//       baseURL: `http://makeup-api.herokuapp.com/api/v1/products.json`,
//     });
//     this.customApi = axios.create({
//       baseURL: ``,
//     });
//   }

//   getGeneralLisiting = () => {
//     return this.api.get("/product");
//   };

//   getQueriedListings = (
//     brand,
//     name,
//     price,
//     description,
//     rating,
//     tag_list,
//     image_link
//   ) => {
//     if (model.length <= 3) {
//       model = model.toUpperCase();
//     } else {
//       model = model.charAt(0).toUpperCase() + model.slice(1).toLowerCase();
//     }

//     return this.api.get("", {
//       params: {
//         brand: brand,
//         name: name,
//         price: price,
//         description: description,
//         rating: rating,
//         tag_list: tag_list,
//         image_link: image_link,
//       },
//     });
//   };

//   getProductDetails = (id) => {
//     const baseUrl = this.api.defaults.baseURL;
//     const indexOfQuerySign = baseUrl.indexOf("?");
//     const preparedUrl = `${baseUrl.slice(
//       0,
//       indexOfQuerySign
//     )}/${id}${baseUrl.slice(indexOfQuerySign)}`;
//     this.customApi.defaults.baseURL = preparedUrl;
//     return this.customApi.get("");
//   };

//   getProductList = async (arrayOfVins) => {
//     const products = [];
//     for (let i = 0; i < arrayOfVins.length; i++) {
//       const prod = await this.getProductDetails(arrayOfVins[i].id);
//       prod.data.clickoffUrl = arrayOfVins[i].url;
//       products.push(prod);
//     }
//     return products;
//   };
// }

// module.exports = ProductApi;
const axios = require("axios");

class ProductsApi {
  constructor() {
    this.apiKey = process.env.API_KEY;
    this.api = axios.create({
      baseURL: `http://makeup-api.herokuapp.com/api/v1/products.json?apikey=${this.apiKey}`,
      // baseURL: `https://auto.dev/api/listings?apikey=${this.apiKey}`,
    });
    this.customApi = axios.create({
      baseURL: ``,
    });
  }

  getGeneralLisiting = () => {
    return this.api.get("");
  };

  // getQueriedListings = (name, brand, category) => {
  //   // if (brand.length <= 3) {
  //   //   brand = brand.toUpperCase();
  //   // } else {
  //   //   brand = brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase();
  //   // }

  //   return this.api.get("", {
  //     params: {
  //       name: name,
  //       brand: brand,
  //       category: category,
  //     },
  //   });
  // };

  getQueriedListings = (name, brand, category) => {
    // if (name.length <= 3) {
    //   name = name.toUpperCase();
    // } else {
    //   name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    // }

    return this.api.get("", {
      params: {
        name: name,
        brand: brand,
        category: category,
      },
    });
  };
  // getVehicleDetails = (id) => {
  //   console.log("hello api");
  //   const baseUrl = this.api.defaults.baseURL;
  //   const indexOfQuerySign = baseUrl.indexOf("?");
  //   const preparedUrl = `${baseUrl.slice(
  //     0,
  //     indexOfQuerySign
  //   )}/${id}${baseUrl.slice(indexOfQuerySign)}`;
  //   this.customApi.defaults.baseURL = preparedUrl;
  //   return this.customApi.get("");
  // };

  // http://localhost:3000/profile/savedvehicles
  // getVehicleDetails = (id) => this.api.get(`/product/details/${id}`);

  getVehicleDetails = (id) => {
    const baseUrl = this.api.defaults.baseURL;
    const indexOfQuerySign = baseUrl.indexOf("?");
    const preparedUrl = `${baseUrl.slice(
      0,
      indexOfQuerySign
    )}/${id}${baseUrl.slice(indexOfQuerySign)}`;
    this.customApi.defaults.baseURL = preparedUrl;
    return this.customApi.get("");
  };

  getVehiclesList = async (arrayOfVins) => {
    const products = [];
    for (let i = 0; i < products.length; i++) {
      const car = await this.getVehicleDetails(arrayOfVins[i].id);
      car.data.product_link = arrayOfVins[i].url;
      products.push(car);
    }
    return products;
  };
}

module.exports = ProductsApi;
