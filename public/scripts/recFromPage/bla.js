	var elem = document.getElementById("reg");
	var getReq = new XMLHttpRequest();
	getReq.open('GET','/getCurrentUser',false);
	getReq.onload = function(){
		var user = JSON.parse(this.responseText);
		if(user.username != null){
			elem.firstChild.id = 'UserPage';
			elem.firstChild.firstChild.innerHTML = user.username;
			elem.href = "../"
		}
		else {
			//elem.innerHTML = "Log In";
			var a = document.createElement('a');
			a.href = "login";
			var b = document.createElement('li');
			b.id = 'register';
			b.style = "margin:0;";
			var c = document.createElement('div');
			c.classList.add('buttons');
  			c.innerHTML = "Log In";
  			document.getElementById("ddd").appendChild(a);
  			a.appendChild(b);
  			b.appendChild(c);
		}

	}
	getReq.send();

	
