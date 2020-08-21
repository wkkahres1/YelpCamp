var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

//test data
//var data = [
var seeds = [
    {
        name: "Cloud's Rest", 
        img: "https://images.unsplash.com/photo-1454335459109-cd8a2c230bc2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Desert Mesa", 
        img: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Floor", 
        img: "https://images.unsplash.com/photo-1512177927078-6edc22b835da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]

/*
function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
//added this to get rid of comments also
	    Comment.remove({},function(err){
			console.log(err);
		})
	   	console.log("removed comments!");
//up to here.	   
	   	//add a few campgrounds
	   	data.forEach(function(seed){
			Campground.create(seed,function(err, campground){
				if(err){console.log(err);}
				else{
					console.log("added a campground");
					//create a comment
					Comment.create({
						text: "This place is great but I wish there was internet",
						author: "Homer"
						}, function(err,comment){
							if(err){console.log(err);}
							else{
								campground.comments.push(comment);
								campground.save();
								console.log("Created new comment");
//closing brackets							
							}//else
						}//callback for save comment
					)};//callback for create comment
				//else
			});//create   
	   });//foreach
   });//remove	   
}//function
//closing brackets	   
 /*       Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
             //add a few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: "Homer"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            }); 
        });
    }); 
    //add a few comments
}
 */
 

/*AN EASIER WAY!*/
//use seeds instead of data variable when naming the data. 
//ex: let seeds = [{ name: , img: , description }]

async function seedDB(){
	await Campground.remove({});
	console.log("Campgrounds removed");
	await Comment.remove({}); 
	console.log("Comments removed");
/*		
	for(const seed of seeds){ //for/of loop, using seeds instead of data for the data
		let campground = await Campground.create(seed);
		console.log("Campground created");
		let comment = await Comment.create(
        	{
            	text: "This place is great, but I wish there was internet",
                author: "Homer"
            }
		)
		console.log("comment Created");
		campground.comments.push(comment);
		
		campground.save();		
		console.log("comment added to campground");
	}
*/
}

module.exports = seedDB;