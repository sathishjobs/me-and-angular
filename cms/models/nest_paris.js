//grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//This is sub schema for heading
var headSchema = new Schema({
	title:{
		type:String,
		required:true
	}
});

//This is sub schema for What_is_next section contents
var what_is_next = new Schema({
	type:String,
	content:String

});

//This sub schema for faq
var faq = new Schema({
	type:String,
	title:String,
	position:String
});

//This sub schema for social_link
var social_link = new Schema({
	link_type:String,
	link_path:String
});

//This sub schema for image path
var image_path = new Schema({
	image_title:String,
	image_path:String
});


//This is main Schema for nest paris cms
var nest_paris = new Schema({
	menu_part:[headSchema],
	what_is_next:[what_is_next],
	faq:[faq],
	social_link:[social_link],
	image_path:[image_path]
});
//the schema is useless so far
//we need to create a model using it
var Nest_paris = mongoose.model('nest_paris',nest_paris);

//make this available to our node application
module.exports=Nest_paris;