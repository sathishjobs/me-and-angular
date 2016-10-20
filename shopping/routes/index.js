var utils    = require( '../utils' );
var mongoose = require( 'mongoose' );
var Cart     = mongoose.model( 'Cart' );

exports.index = function ( req, res, next ){
  var user_id = req.cookies ?
    req.cookies.user_id : undefined;

  Cart.
    find({ user_id : user_id }).
    sort( '-updated_at' ).
    exec( function ( err, Carts ){
      if( err ) return next( err );

      res.render( 'index', {
          title : 'Node js assignment(3).Simple CRUD operation.',
          Carts : Carts
      });
    });
};

exports.create = function ( req, res, next ){
  new Cart({
      user_id    : req.cookies.user_id,
      item_name    : req.body.item_name,
      quantity   : parseInt(req.body.quantity),
      updated_at : Date.now()
  }).save( function ( err, Cart, count ){
    if( err ) return next( err );
    res.redirect( '/' );
  });
};

exports.destroy = function ( req, res, next ){
  Cart.findById( req.params.id, function ( err, Cart ){
    var user_id = req.cookies ?
      req.cookies.user_id : undefined;

    if( Cart.user_id !== user_id ){
      return utils.forbidden( res );
    }

    Cart.remove( function ( err, Cart ){
      if( err ) return next( err );

      res.redirect( '/' );
    });
  });
};

exports.edit = function( req, res, next ){
  var user_id = req.cookies ?
      req.cookies.user_id : undefined;

  Cart.
    find({ user_id : user_id }).
    sort( '-updated_at' ).
    exec( function ( err, Carts ){
      if( err ) return next( err );

      res.render( 'edit', {
        title : 'Node js assignment(3).Simple CRUD operation.',
        Carts   : Carts,
        current : req.params.id,
        edit_column:req.params.type_of_edit
      });
    });
};

exports.update = function( req, res, next ){
  Cart.findById( req.params.id, function ( err, Cart ){
    var user_id = req.cookies ?
      req.cookies.user_id : undefined;

    if( Cart.user_id !== user_id ){
      return utils.forbidden( res );
    }

    if(req.body.item_name)
    {
      Cart.item_name = req.body.item_name;
    }
    else if(req.body.quantity)
    {
      Cart.quantity = req.body.quantity;
    }
    
    Cart.updated_at = Date.now();
    Cart.save( function ( err, Cart, count ){
      if( err ) return next( err );

      res.redirect( '/' );
    });
  });
};

// ** express turns the cookie key to lowercase **
exports.current_user = function ( req, res, next ){
  var user_id = req.cookies ?
      req.cookies.user_id : undefined;

  if( !user_id ){
    res.cookie( 'user_id', utils.uid( 32 ));
  }

  next();
};
