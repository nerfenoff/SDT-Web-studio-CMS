const sqlite3 = require('sqlite3').verbose();



module.exports = {
	tableRows: '',
	addNew: function(req,res){
		var self = this; 		
		self.tableRows = ``;
		var user = req.body;
		//console.log(user);

		let db = new sqlite3.Database('public/DB/users.db', sqlite3.OPEN_READWRITE, (err) => {
  		if (err) {
    		console.error(err.message);
  		}
  });
		let sql =  `SELECT * FROM users WHERE username = ? OR email = ?`;

		db.get(sql,[user.username,user.email], function(err, row){
			if(err) throw err;


			if(row != null){
				let errorStr = '';

				if(user.username == row.username) errorStr += '<p>Это имя пользователя уже занято</p>';
				if(user.email == row.email) errorStr += '<p>Этот Email уже занят</p>';
				res.writeHead(200, {'Content-Type':'text/plan'}); 
  				res.end(errorStr);
			}
			else {
				db.close((err) => {
				  if (err) {
				    console.error(err.message);
				  }
				  	console.log('Close the database connection.');
				});
				//res.cookie('login', user, { maxAge : 35000 });
				res.cookie('login', user);
				add(user);
				res.end('next');
			}
		});	
	}
}

function add(user){
	let db = new sqlite3.Database('public/DB/users.db', sqlite3.OPEN_READWRITE, (err) => {
  	if (err) {
    	console.error(err.message);
  	}
  });

	db.serialize(() => {
  db.run(`INSERT INTO users
          VALUES ( ?,?,?,'user')`,[user.username, user.email,user.password])
    .each(`SELECT * FROM users`, (err, rows) => {
      if (err){
        throw err;
      }
      console.log(rows);
    });
});
	
 
	db.close((err) => {
	  if (err) {
	    console.error(err.message);
	  }
	  console.log('Close the database connection.');
	});
}

