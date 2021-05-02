const mongoose = require("mongoose");
mongoose.Promise = Promise;

mongoose.connect(process.env.URL_DB, {useNewUrlParser: true});