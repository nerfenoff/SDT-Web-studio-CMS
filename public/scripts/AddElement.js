const fs = require( "fs" );
const sqlite3 = require('sqlite3').verbose();

var _content = '';
module.exports = {	

	AddToDB: function(req,res){
		var elem = req.body;

		let db = new sqlite3.Database('public/DB/Pages.db', sqlite3.OPEN_WRITE, (err) => {
  		if (err) {
    		console.error(err.message);
  		}
 		});

		let sql =  `INSERT INTO PagesContent VALUES ( ?,?,?,?)`;

		db.get(`select _rowid_ FROM Pages where URL = ?`,[elem.url],function(err,row){
			if(err) throw err;
			if(row == null) res.send('Page not found');
			else
			{
				db.all(`select ContentID FROM PagesContent where PageID = ?`,[row.rowid], function(err, row2){
					if(err) throw err;
					console.log('#######');
					console.log(row2.length);

					db.run(sql,[row.rowid,row2.length,elem.class,elem.innerHTML]);

				});
			}
		})

		db.close((err) => {
			if (err) {
			    console.error(err.message);
		    }
			  	
		});
			res.send('next');
		}
}