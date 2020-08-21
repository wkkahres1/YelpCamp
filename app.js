/********SETUP**************************/

//*EXPRESS
var express = require("express");
var app = express();

//*APIs - request, axios 
//var request = require("request"); //include if using request
const axios = require('axios'); //include if using axios

//*FLASH - connect-flash
var flash = require("connect-flash");
app.use(flash());

//*FORMS - body-parser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
//body-parser docs (copy and paste most of the time)

//*USE FOR PUT AND DESTROY - method-override
var methodOverride = require("method-override");
app.use(methodOverride("_method"));

//*DATABASE - mongoose
// dev URL console.log(process.env.databaseURL);

const mongoose = require("mongoose"); //use const

//Local host version for testing
//**with no environmental variable set **
/*mongoose.connect("mongodb://localhost:27017/yelp_camp_v115", { //must add port:27017 on 5.2.0 and above
			useNewUrlParser: true, //add this to remove deprecation warning
			useUnifiedTopology: true //add this to remove deprecation warning
});
*/

//environmental variable databaseURL is set to "mongodb://localhost:27017/yelp_camp_v115"
mongoose.connect(process.env.databaseURL, { //must add port:27017 on 5.2.0 and above
			useNewUrlParser: true, //add this to remove deprecation warning
			useCreateIndex: true,
			useUnifiedTopology: true //add this to remove deprecation warning
}).then(() => {
	console.log("Connected to Database!")
}).catch(err => { //no paretheses needed when only one in arrow function 
	console.log("ERROR:", err.message)
});


//UPDATED THIS FOR DEPLOYMENT - hide password in environment vaiable with dotenv package 
//This is using mongo dB atlas
/*
mongoose.connect("mongodb+srv://W_Kahres:*********@yelpcamp.mbt03.mongodb.net/<dbname>?retryWrites=true&w=majority", { //must add port:27017 on 5.2.0 and above
			useNewUrlParser: true, //add this to remove deprecation warning
			useCreateIndex: true,
			useUnifiedTopology: true //add this to remove deprecation warning
}).then(() => {
	console.log("Connected to Database!")
}).catch(err => { //no paretheses needed when only one in arrow function 
	console.log("ERROR:", err.message)
});
*/

//*DATABASE - models
var Campground 	= require("./models/campground.js") 
var Comment 	= require("./models/comment.js")
var User 		= require("./models/user.js")

//DATABASE - seeds
//seeds not needed in production version
//var seedDB = require("./seeds");
//seedDB();

//CUSTOM STYLESHEETS AND EJS TEMPLATES
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs"); //no .ejs needed

//*AUTHENTICATION - passport, passport-local, passport-local-mongoose passport-express
var passport = require("passport");
//*via passport-local
var LocalStrategy = require("passport-local");
//*Authentication with passport and mongoose
var passportLocalMongoose = require("passport-local-mongoose")
//* add and use passport and express-session
app.use(require("express-session")({
	secret: "What is the meaning of life?  Who Knows?  Who cares?", //used to encode and decode the session
	resave: false,
	saveUninitialized: false
}));
//*Set passport up
app.use(passport.initialize());
app.use(passport.session());
//*create new local strategy using user.authenticate method that comes from passportLocalMongoose
passport.use(new LocalStrategy(User.authenticate()));
//*encode and decode serialization using passport-local-mongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//*OTHER APP.USE
// use this function on every route 
//needed for header to display correctly in all pages. header uses currentUser
app.use(function(req, res, next){
	// res.locals is always in the response and it will always equal request user
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

//used for routes
//*ROUTE FILES
var commentRoutes 		= require("./routes/comments.js");
var	campgroundRoutes 	= require("./routes/campgrounds.js");
var	indexRoutes			= require("./routes/index.js");
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/",indexRoutes);

/*******LISTEN*************************/
// Tell express to listen for request
/*
app.listen(3000, function(){
	console.log('The YelpCamp Server has started');
});
*/

//use this for heroku
app.listen(process.env.PORT || process.env.IP || 3000)
{
	console.log('The YelpCamp Server has started locally');
}