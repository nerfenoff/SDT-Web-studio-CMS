const sqlite3 = require('sqlite3').verbose();
//const fs = require('fs');


module.exports.getPage = function(req, res, next){

		let db = new sqlite3.Database('public/DB/Pages.db', sqlite3.OPEN_READONLY, (err) => {
  		if (err) {
    		console.error(err.message);
  		}
  		});

  		let sql =  `SELECT _id,fileName FROM Pages WHERE URL = ?;`;

		db.get(sql,[req.url], function(err, row){
			if(err) throw err;

			if(row == null){
							
				next();
			}
			else{	

				let sql2 =  `select ContentID,class,innerHTML FROM PagesContent where PageID = ?`;

				
				db.all(sql2,[row._id], function(err, rows){
					if(err) throw err;
					var dataa = '';
					
					rows.forEach((row2) =>{
							dataa += `
							<div id = "${row2.ContentID}" class = "${row2.class}">
								${row2.innerHTML}
							</div>`
					});
					
					res.render('UserPages/'+row.fileName,{data:dataa,user: req.cookies.login});

				});
			}

			db.close((err) => {
				if (err) {
					console.error(err.message);
				}
				  	
			});
		});
		
}

module.exports.getAllPages = function(req,res){

	let db = new sqlite3.Database('public/DB/Pages.db', sqlite3.OPEN_READONLY, (err) => {
  		if (err) {
    		console.error(err.message);
  		}
  	});

  	let sql =  `SELECT URL FROM Pages;`;

  	db.all(sql, function(err, rows){
					if(err) throw err;
					var data = '';
					if(rows.length == 0)
						data = `<h1>Pages not found!</h1>`;
					else
						rows.forEach((row) =>{
								data += `
								<p id = "page_${row.URL}"><a id = "${row.URL}" href = "${row.URL}">${row.URL}</a> <button onclick="deleteRecMain('${row.URL}')">delete page</button></p>\n`
						});
					
					res.render('paralax',{data:data,user: req.cookies.login});

				});
			

	db.close((err) => {
		if (err) {
			console.error(err.message);
		}
				  	
	});		
}



