//*mongoose
const mongoose = require("mongoose"); //use const
/*mongoose.connect("mongodb://localhost:27017/yelp_camp_prod", { //must add port:27017 on 5.2.0 and above
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

/********SCHEMA SETUP*******************/

//Campground
var campgroundSchema = new mongoose.Schema({
	name: String,
	price: String,
	img: String,
	description: String,
	author: {  //each created campground has an author now
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		username: String
	},
	comments: [ //an array of comment IDs
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
});

/*******RETURN MODEL*******************/
module.exports = mongoose.model("Campground", campgroundSchema);



