
var _url = window.location.href.split("?")[1].split("=")[1];


  		function addToPage(id){

  			alert(id);
			var postReq = new XMLHttpRequest(); 
		    postReq.open('POST','/ContentSelector',false); 
		    postReq.setRequestHeader('Content-Type', 'application/json');

		    var elem = document.getElementById(id);

	    postReq.onload = function(){

			if(this.responseText == 'next')
			{
				alert('Added');

			}
			else
				document.getElementById('Errors').innerHTML = this.responseText; 
		}
		alert(elem.classList.toString());
	    var j = {

	          url:     	 	_url,
	          class: 		elem.classList.toString(),
	          innerHTML:    elem.innerHTML
	          
	        }; 

	    postReq.send(JSON.stringify(j));
	}