const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

module.exports = {
	getPageUrl: function(req, res, next){

		let db = new sqlite3.Database('public/DB/Pages.db', sqlite3.OPEN_READONLY, (err) => {
  		if (err) {
    		console.error(err.message);
  		}
  		});

  		let sql =  `SELECT * FROM Pages WHERE URL = ?;`;

		db.get(sql,[req.url], function(err, row){
			if(err) throw err;

			if(row == null){
				next();
			}
			else{				
				res.render('UserPages/'+row.fileName);
			}

			db.close((err) => {
				if (err) {
					console.error(err.message);
				}
				  	console.log('Close the database connection.');
			});
		});
		
	}
}