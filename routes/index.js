var express = require("express");
var router = express.Router();
//used to export routes

var passport = require("passport");
var User = require("../models/user");
//other requirements

var middleware = require("../middleware")//automatically grabs index.js from this directory
//require middleware

/*******LANDING ROUTE**************/
//*Landing Page
router.get("/", function(req,res){
	//res.send("This will be the landing page soon.") //check
	res.render("landing")
})


/********AUTH ROUTES***************/
//AUTH - show REGISTER form
router.get("/register",function(req,res){
	res.render("register");
})

//AUTH - handle signup logic and redirect
router.post("/register", function(req,res){
	//res.send("Registered!")
	//GET username and password from the form
	/*m
	req.body.username;
	req.body.password;
	//new user object not saved yet and only pass in username, don't pass password to the database
	*/
	var newUser = new User({username: req.body.username});
	User.register(newUser,req.body.password, function (err,user){
	//User register hashes password and if all goes correctly, it returns new username.
		if(err){
			req.flash("error",err.message); //can use err to just give passport err
			return res.redirect("/register"); //return to short circuit everything
		}
		//passport.authenticate logs user in and runs serialize user method, specifying local stratey
		passport.authenticate("local")(req, res, function(){
			req.flash("success","Welcome to YelpCamp " + user.username);
			res.redirect("/campgrounds"); // moves to the secret if registration is good.
		})
		
	});
});

//AUTH - show LOGIN form
router.get("/login", function(req, res){
		//res.render("login",{message:req.flash("error")});
	        //flash message is handled in app.js
		res.render("login");
});

//AUTH - handle LOGIN logic
router.post("/login", passport.authenticate("local",{
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}), function(req, res){
//code above includes authentication of password if successful or failure if not
//using passport.authenticate("local") - uses MIDDLEWARE
//MIDDLEWARE is code that runs before call back
	
});

//*AUTH - LOGOUT ROUTE
router.get("/logout", function (req, res){
	//res.send("OK, I will log you out.. but not yet.");
	req.logout(); //this is all we do.  Passport destroys session userdata.
	req.flash("success","You have logged out.")
	res.redirect("/campgrounds");
})

//need this to send back routes
module.exports = router;