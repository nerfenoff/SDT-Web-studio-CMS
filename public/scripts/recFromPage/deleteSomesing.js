document.getElementById('del').addEventListener('click',deleteRec);


function deleteRec() {


	    var postReq = new XMLHttpRequest(); 
	    postReq.open('POST','/DeletePage',false); 
	    postReq.setRequestHeader('Content-Type', 'application/json');


	    postReq.onload = function(){
	    	if(this.responseText != 'next')
	    		alert(this.responseText);
			
			window.location = location.origin;
			
			
		}
		
	    
	    postReq.send(JSON.stringify({url: document.location.pathname}));
}