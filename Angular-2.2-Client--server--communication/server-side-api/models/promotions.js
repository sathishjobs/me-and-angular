//grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//mongoose currency for price
require('mongoose-currency').loadType(mongoose);
var Currency =mongoose.Types.Currency;


//create a Promotion Schema
var promotion = new Schema({
	name:{
		type:String,
		required:true,
	},
	image:{
		type:String,
		required:true
	},
	label:{
		type:String,
		default:""
	},
	price:{
		type:Currency,
		required:true
	},
	description:
	{
		type:String,
		required:true
	}
},{
	timestamps:true
});

//the schema is useless so far
//we need to create a model using it
var Promotion = mongoose.model('Promotion',promotion);

//make this available to our node application
module.exports=Promotion;