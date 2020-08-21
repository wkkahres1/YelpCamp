var express = require("express");
var router = express.Router();
//used to export routes

var Campground = require("../models/campground")
//other requirements

var middleware = require("../middleware")//automatically grabs index.js from this directory
//require middleware


/********ROUTES******************************/

//*INDEX ROUTE - Campgrounds Page
//*REST should show all "campgrounds"
router.get("/", function(req,res){
	//console.log(req.user);
	//GET All campgrounds from mongodb
	Campground.find({},function(err,allCampgrounds){
		if(err){
			console.log("THERE WAS AN ERROR");
			console.log(err);
		}else{
			console.log("All campgrounds have been acquired");
			res.render("campgrounds/index",{	campgrounds: allCampgrounds }); 
			 //render campgrounds file, but the source is now allCampgrounds, and req.user
		}
	})
});

//*CREATE ROUTE - Post - Add new campground to database
//*convention called REST that post route is the same as get route
router.post("/", middleware.isLoggedIn, function (req,res){
	//res.send("you hit the post route"); //test with postman
	
	//get data from form and add to campgrounds array, req.body.<name attribute from form>
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var desc = req.body.description;
	//console.log(image);
	var author = {  //create variable object to add the author.
		id: req.user._id,
		username: req.user.username
	};
	
	var newCampground = {name: name, price: price, img: image, description: desc, author: author,} //added author!
	//var newCampground = {name: name, img: image, description: desc} //setup new object for the array
	//campgrounds.push(newCampground); //campgrounds array is now undefined, we need to 
	
	//console.log(req.user);
		
	//*Create a new campground and save to database
	Campground.create(newCampground, function(err,newlyCreated){
		if(err){
			console.log("Error creating new campground");
			console.log(err);
		}else{
			//redirect back to campgrounds page
			console.log(newlyCreated);
			req.flash("success","You added a campground to YelpCamp!");
			res.redirect("/campgrounds"); //default redirects as a get request		  
		}
	});
});

//*NEW - show form to create new campground
//*also REST convention - "campgrounds/new" should show the form that should sent data to post
//*!!!!!MUST BE BEFORE SHOW!!!!!!!!
router.get("/new", middleware.isLoggedIn, function(req, res){
	req.flash("error","You need to be logged in to do that.");
	res.render("campgrounds/new");
});

//*SHOW - shows more info about ONE campground
router.get("/:id", function(req, res){
	//find the campground with provide ID
	
//Campground.findById(req.params.id, function(err, foundCampground){ //needed refactoring after comments
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){	
		if(err || !foundCampground){
			req.flash("error","Campground not found");
			res.redirect("back");
		}else{
			console.log(foundCampground);
			//render show template with that campground
			res.render("campgrounds/show",{campground: foundCampground})
			//show template can access campground and it has value of foundCampground using 
			//the ID in findById
		}
	})
	//req.params.id
	//render show template with that campground
	//res.send("This will be the show page one day");
	//res.render("show");  //moved into else above and passes in found campground
});

//*EDIT - Edit the campground form
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	//A)Find the campground with the provided id - req.params.id
	Campground.findById(req.params.id, function(err, foundCampground){
	   	res.render("campgrounds/edit",{campground:foundCampground});
		console.log(req.params.id); //make sure its passing the right id
	});
});//router close


//*UPDATE - Add updates to the database and redirect
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
	
	//SANITIZER!
	//req.body.campgrounds.body = req.sanitize(req.body.campground.body);
	
	//Take ID in URL and find the existing campground and update with new data
	//Blog.findByIdAndUpdate(idToFindBy, newDATA, callback ) //description of parameters
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds");
		} else {
			//redirect to either the index or the show page.. we will use the show page.
			res.redirect("/campgrounds/" + req.params.id); //"blogs/3892859205djka325 	
		}
	})
});

//*DESTROY - remove campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
	//destroy campground
	Campground.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/campgrounds");
		}else{
		//redirect	
			res.redirect("/campgrounds");
		}
	});
})

module.exports = router;