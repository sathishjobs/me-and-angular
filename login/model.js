var DB = require('./db').DB;

var User = DB.Model.extend({
   tableName: 'ankit',
   idAttribute: 'userId',
});

module.exports = {
   User: User
};