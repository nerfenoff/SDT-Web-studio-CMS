	document.getElementById("submit").addEventListener('click',createNewPage);

function createNewPage(){
	
	var url = document.getElementById("url");
    var fileName = document.getElementById("fileName");
     
    let errorString = '';

    if(url.value == "" || fileName.value == "")
      errorString += '<p>Все поля должны быть заполнены</p>';

  	if(url.value[0] != '/')
  		errorString += '<p>url должен начинатся с "/"</p>';
//let tempp = document.getElementById("tempp");
//alert(tempp.innerHTML);
  	if(errorString == ''){
  		
		var postReq = new XMLHttpRequest(); 
	    postReq.open('POST','/createNewPage',false); 
	    postReq.setRequestHeader('Content-Type', 'application/json');

	    postReq.onload = function(){
	    	alert(this.responseText);
			if(this.responseText == 'next')
			{
				alert(location.origin + url.value);
				window.location = location.origin + url.value;
			}
			else
				document.getElementById('Errors').innerHTML = this.responseText; 
		}
	    var j = {
	          url: url.value,
	          fileName: fileName.value
	        }; 
	    postReq.send(JSON.stringify(j));
}

	document.getElementById("Errors").innerHTML = errorString;



	
}