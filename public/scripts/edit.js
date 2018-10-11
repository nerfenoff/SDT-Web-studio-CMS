var currentElem = null;
function select(id){
    var x = document.getElementById(id);

    if(id != currentElem)
    {
    	var elements = document.getElementById("center");
            if(elements.hasChildNodes)
            {
                var arr = elements.childNodes;
                
                for(var i = 1 ; i < arr.length;i += 2)
                {
                	if(arr[i].id != id){
                		arr[i].style.border = "none";

              		}
                }
                
            }
    }
    currentElem = id;
    x.style.border = "1px solid black";
    prepereToEdit();
}

function prepereToEdit(){
		
	if(currentElem != null){
		var x = document.getElementById(currentElem);
		var pos = document.getElementById("position");
		pos.value = currentElem;
	}

}

function edit(id){
	if(currentElem != null){
		var x = document.getElementById(currentElem);
		var p = document.getElementById(id);
		x.id = '-1';
	
	}
}

