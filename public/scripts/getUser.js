const sqlite3 = require('sqlite3').verbose();

module.exports = {
	getUser: function(req,res){


		var user = req.body;

		let db = new sqlite3.Database('public/DB/users.db', sqlite3.OPEN_READWRITE, (err) => {
  		if (err) {
    		console.error(err.message);
  		}
  	});

  		let sql =  `SELECT * FROM users WHERE username = ? AND password = ?`;

		db.get(sql,[user.username,user.password], function(err, row){
			if(err) throw err;

			console.log(row);
			if(row == null){
				res.writeHead(200, {'Content-Type':'text/plan'}); 
  				res.end('Неверное имя пользователя или пароль');
			}
			else {
				db.close((err) => {
				  if (err) {
				    console.error(err.message);
				  }
				});
				if(row.role == 'admin')
					user.isAdmin = true;

				if(user.remember)
					res.cookie('login', user, { maxAge : (Date.now() + 30)});
				else
					res.cookie('login', user);

				res.writeHead(200, {'Content-Type':'text/plan'}); 
				res.end('next');
			}
		});
	
}
}

