var express = require('express')
var exphbs = require('express-handlebars')
var mongoose = require('mongoose')

var app = express()
var PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))

var htmlRoutes = require("./Routes/htmlRoutes")(app)
var apiRoutes = require("./Routes/apiRoutes")(app)

app.engine('handlebars', exphbs({defaultLayout: "main"}))
app.set('view engine', 'handlebars')
app.use(express.static("public"))
 

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/nprMusic";

mongoose.connect(process.env.MONGODB_URI || "mongodb://adlee7:<Portland0>@ds119608.mlab.com:19608/heroku_35jhh70b", {
    useMongoClient: true
});

app.listen(PORT, function(){
    console.log("Listening on http://localhost:" + PORT)
})
