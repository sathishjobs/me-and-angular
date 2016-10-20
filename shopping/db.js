var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;

var Cart = new Schema({
    user_id    : String,
    item_name    : String,
    quantity   : Number,
    updated_at : Date
});

mongoose.model( 'Cart', Cart );
mongoose.connect('mongodb://127.0.0.1:27017/shopping');
