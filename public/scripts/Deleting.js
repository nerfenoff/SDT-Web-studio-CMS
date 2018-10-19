const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');


module.exports = {
	deletePage: function(req, res){

if(req.cookies.login != undefined && req.cookies.login.isAdmin){
		let db = new sqlite3.Database('public/DB/Pages.db', sqlite3.OPEN_READWRITE, (err) => {
  		if (err) {
    		console.error(err.message);
  		}
  		});

  		let sql =  `SELECT * FROM Pages WHERE URL = ?;`;

		db.get(sql,[req.body.url], function(err, row){
			if(err) throw err;

			if(row == null){
							
				res.send('404');
			}
			else{	

				let sql2 =  `DELETE FROM PagesContent where PageID = ?`;

				
				db.run(sql2,[row._id], function(err, row2){
					if(err) throw err;					
				});

				db.run(`DELETE FROM Pages where URL = ?`,[req.body.url]);

				fs.unlinkSync('./views/userPages/'+ row.fileName +'.ejs');
				console.log('done');
				res.send('next');
			}

			db.close((err) => {
				if (err) {
					console.error(err.message);
				}
				  	
			});
		});
	} else res.send('you don`t have permission');
		
	}
}