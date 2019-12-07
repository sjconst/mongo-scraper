const express = require("express");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3001;
// Initialize Express
const app = express();
//Cors middleware
const cors = require("cors");
app.use(cors());
//Mongoose settings
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Static assets
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}
// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI);
// Use routes
const routes = require("./routes/routes");
app.use(routes);
//Error handler
app.use((err, req, res, next) => {
  console.log(`There is an error, and it is ${err}`); 
  res.sendStatus(500);
});
// Start the server
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});