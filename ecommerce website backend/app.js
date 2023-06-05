const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const Product = require("./models/product");
const methodOverride = require("method-override");
const mongoose = require("mongoose");

// mongoose.connect ( "mongodb://localhost:27017/ecommerce", ()=>{  console.log(" connected to mongo")})
mongoose
  .connect('mongodb://localhost:27017/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database');
    // Start your server or perform other operations
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });
app.set("view engine", "ejs"); // to set the view engine for rendering dynamic templates.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Show product and homepage
app.get("/", (req, res) => {
  Product.find()
    .then((products) => {
      res.render("index", { products: products });
    })
    .catch((err) => {
      console.log(err);
    //   res.redirect("/");
    });
});

// Add Product
app.post("/add", (req, res) => {
  var name = req.body.name;
  var image = req.body.image;
  var price = req.body.price;
  var newProduct = { name: name, image: image, price: price };

  Product.create(newProduct)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    
    });
});

// Get EditForm
app.get("/:id/edit", (req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      res.render("edit", { product: product });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/");
    });
});

// Edit Put request
app.put("/:id/edit", (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body.product)
    .then((updatedata) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/");
    });
});

// Delete the product
app.delete("/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/");
    });
});

app.listen(3004, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Server Started At PORT 3004");
  }
});
