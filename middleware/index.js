//all the middle ware goes here
var middlewareObj = {};

//require campground and comments
var Campground = require("../models/campground");
var Comment = require("../models/comment");


//Require that campground author ID = user ID
middlewareObj.checkCampgroundOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		//A)Find the campground with the provided id - req.params.id
		Campground.findById(req.params.id, function(err, foundCampground){
			if(err || !foundCampground){ //handles an issue where campground is updated
				req.flash("error","Campground not found");
				res.redirect("back"); //sends back to the previous page
			}else{
				//does the user own the campground?
				if(foundCampground.author.id.equals(req.user._id)) {
				//TRICKY - use .equals to get this string to check to object
				   	next();
				} else{
					req.flash("error","You don't have permission to do that.");
					res.redirect("back");//sends back to the previous page
				}//inner else close	
			}//outer else close
		});//Campground.findById close  
	}else{
		   req.flash("error","You need to be logged in to do that.");
		   res.redirect("back")//sends back to the previous page
	}//authenitication else close
}

//Require that Comment author id = user id
middlewareObj.checkCommentOwnership = function(req, res, next){
	if(req.isAuthenticated()){
		//A)Find the comment with the provided id - req.params.comment_id
		Comment.findById(req.params.comment_id, function(err, foundComment){
			if(err || !foundComment){
				req.flash("error","Comment not found");
				res.redirect("back"); //sends back to the previous page
			}else{
				//does the user own the comment?
				if(foundComment.author.id.equals(req.user._id)) {
				//TRICKY - use .equals to get this string to check to object
				   	next();
				} else{
					req.flash("error","You don't have permission to do that");
					res.redirect("back");//sends back to the previous page
				}//inner else close	
			}//outer else close
		});//Campground.findById close  
	}else{
		   req.flash("error","You need to be logged in to do that.");
		   res.redirect("back")//sends back to the previous page
	}//authenitication else close
}

//require that user is logged in
middlewareObj.isLoggedIn = function(req,res,next){ //standard for middleware, 
	if(req.isAuthenticated()){
		return next(); //next just refers to function(req, res)
	}
	//add flash message here
	req.flash("error","You need to be logged in to do that.");
	res.redirect("/login"); //returns to login if authentication fails
}


//module.exports

module.exports = middlewareObj;