var dbConfig={
	client:'mysql',
    connection:{
	 host:'localhost',
	 user:'wd-agency',
	 password:'SysadminWD2015',
	 database:'wdi',
	 charset:'utf8'
  }
};
var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);
var DB=bookshelf;
module.exports.DB = DB;