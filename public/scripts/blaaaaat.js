const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');


module.exports = {
	getPageUrl: function(req, res, next){

		let db = new sqlite3.Database('public/DB/Pages.db', sqlite3.OPEN_READONLY, (err) => {
  		if (err) {
    		console.error(err.message);
  		}
  		});

  		let sql =  `SELECT _rowid_,fileName FROM Pages WHERE URL = ?;`;

		db.get(sql,[req.url], function(err, row){
			if(err) throw err;

			if(row == null){
							
				next();
			}
			else{	

				let sql2 =  `select ContentID,class,innerHTML  FROM PagesContent where PageID = ?`;

				
				db.all(sql2,[row.rowid], function(err, rows){
					if(err) throw err;
					var dataa = '';
					rows.forEach((row2) =>{
							dataa += `
							<div id = "${row2.ContentID}" class = "${row2.class}">
							${row2.innerHTML}
							</div>`
					});

					console.log(dataa);
					res.render('UserPages/'+row.fileName,{_data:dataa});

				});
			}

			db.close((err) => {
				if (err) {
					console.error(err.message);
				}
				  	
			});
		});
		
	}
}

function temp(id,fileName){

	let db = new sqlite3.Database('public/DB/Pages.db', sqlite3.OPEN_READONLY, (err) => {
  		if (err) {
    		console.error(err.message);
  		}
  		});




			

		db.close((err) => {
				if (err) {
					console.error(err.message);
				}
				  	console.log('Close the database connection.');
			});

}