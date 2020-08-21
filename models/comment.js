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

//Comment
var commentSchema = new mongoose.Schema({
	text: String,
	//author: String
	//turned authored in a UserID object
	author: {
		id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User" //model
		},
		username: String
	}
});


/*******RETURN MODEL*******************/
module.exports = mongoose.model("Comment", commentSchema);