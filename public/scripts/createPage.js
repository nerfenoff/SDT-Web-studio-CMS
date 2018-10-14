const fs = require( "fs" );
const sqlite3 = require('sqlite3').verbose();

var _content = '';
module.exports = {	

	CreateNewPage: function(req,res){
		var options = req.body;
		var fileContent = fs.readFileSync('./views/Templates/'+ options.Template +'/'+options.Page+'.ejs');
		fs.writeFileSync('./views/userPages/'+ options.fileName +'.ejs',fileContent);
		addToDB(options.url,options.fileName,0);
		//addContent();
		res.send('next');
	}
}

function addToDB(url,name,mult){

	let db = new sqlite3.Database('public/DB/Pages.db', sqlite3.OPEN_WRITE, (err) => {
  		if (err) {
    		console.error(err.message);
  		}
 	});
	let sql =  `INSERT INTO Pages VALUES ( ?,?,?)`;

	db.run(sql,[url,name,mult], function(err, row){
		if(err) throw err;
	});

	db.close((err) => {
		if (err) {
		    console.error(err.message);
	    }
		  	console.log('Close the database connection.');
	});
}

function addContent(cont){
	console.log(cont);
}