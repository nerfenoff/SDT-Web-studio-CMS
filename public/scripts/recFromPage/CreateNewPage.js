	document.getElementById("submit").addEventListener('click',createNewPage);


    var Template = window.location.href.split("?")[1].split("=")[1];
    var Page = window.location.href.split("?")[1].split("=")[2];

    /*
	var getReq = new XMLHttpRequest(); 
	getReq.open('GET','/temmp',false); 

	let content = [];
	getReq.onload = function(){
		var y = this.responseText;
		document.getElementById('Errors').insertAdjacentHTML("afterend",y);
		var temmmp = document.getElementById('content');
		var contentt = document.getElementById("content").childNodes;
    	var resString = '';
    	var k = 0;
    	
    
    	for(var i = 0; i < contentt.length;++i)
   		{
	        if(contentt[i].id == k){
	            content.push(contentt[i].classList);
	            content.push(contentt[i].innerHTML);
	            k++;
	        } 
	    }
		temmmp.remove();
		
	}

	getReq.send();
	*/



function createNewPage(){
	
	var url = document.getElementById("url");
    var fileName = document.getElementById("fileName");
     
    let errorString = '';

    if(url.value == "" || fileName.value == "")
      errorString += '<p>Все поля должны быть заполнены</p>';

  	if(url.value[0] != '/')
  		errorString += '<p>url должен начинатся с "/"</p>';

  	if(errorString == ''){
  		
		var postReq = new XMLHttpRequest(); 
	    postReq.open('POST','/createNewPage',false); 
	    postReq.setRequestHeader('Content-Type', 'application/json');

	    postReq.onload = function(){
	    	alert(this.responseText);
			if(this.responseText == 'next')
			{
				window.location = location.origin + url.value;
			}
			
		}
	    var j = {
	          url: url.value,
	          fileName: fileName.value,
	          Template: Template,
	          Page: Page
	        }; 
	    postReq.send(JSON.stringify(j));
}

	document.getElementById("Errors").innerHTML = errorString;



	
}