//grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create a Leadership Schema
var feedback_schema = new Schema({
	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	feedback_txt:{
		type:String,
		required:true
	}
},{
	timestamps:true
});

//the schema is useless so far
//we need to create a model using it
var feedback = mongoose.model('feedback_schema',feedback_schema);

//make this available to our node application
module.exports=feedback;