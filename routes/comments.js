var express = require("express");
var router = express.Router({mergeParams: true});
//used to export routes, mergeParams make sure id is able to pass from campgrounds

var Campground = require("../models/campground")
var Comment = require("../models/comment")
//add other requirements

var middleware = require("../middleware")//automatically grabs index.js from this directory
//require middleware



/********COMMENTS ROUTES***************/
//COMMENT - NEW - add comment 
router.get("/new", middleware.isLoggedIn, function(req,res){
	//find campground by ID
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		}else{
			res.render("comments/new", {campground: campground});
		}
	})
})

//COMMENT - CREATE - send back comment to campgrounds show 
router.post("/", middleware.isLoggedIn, function(req,res){
	//lookup campground using id
	Campground.findById(req.params.id, function(err,campground){
		if(err){
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			//console.log(req.body.comment);
			//request.body.comment can be use because we pulled the object in the comments/new.ejs view
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					req.flash("error","Something went wrong.");
					console.log(err);
				}
				else
				{
					//add username and id to comment and then save comment
					//console.log("New comments user name will be " + req.user.username);
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					//push comments to the campground
					campground.comments.push(comment);
					campground.save();
					console.log(comment);
					req.flash("success","Succefully created a comment!");
					res.redirect("/campgrounds/" + campground._id);
				}
			})
		}
	})
	//create new comment
	//connect new comment to campground
	//redirect to campground show page
})

//COMMENT - EDIT - edit comment form appears 
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){
	//res.render("/comments/edit");
	//find comment ID, going to need it
	Comment.findById(req.params.comment_id, function(err,foundComment){
		if(err){
			res.redirect("back");
		}else{
			res.render("comments/edit", {campground_id:req.params.id, comment:foundComment});
		}	
	});
});

//COMMENT - UPDATE - 
//PUT request to /campgrounds/:id/comments/:comment_id
router.put("/:comment_id", middleware.checkCommentOwnership, function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if(err){
			res.redirect("back");
			
		}else{
			res.redirect("/campgrounds/" + req.params.id)
		}
	});
});

//*DESTROY - remove comment
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	//destroy campground
	//res.send("this is the destroy route.")
	Comment.findByIdAndRemove(req.params.comment_id, function(err){
		if(err){
			res.redirect("back");
		}else{
		//redirect	
			req.flash("success","Comment deleted");
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
})

//need this to send back routes
module.exports = router;