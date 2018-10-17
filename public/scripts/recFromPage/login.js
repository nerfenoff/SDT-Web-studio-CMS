document.getElementById("submit").addEventListener('click',login);

function login(){
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    var _remember = document.getElementById("agree");
     
    let errorString = '';

    if(username.value == "" || password.value == "")
      errorString += '<p>Все поля должны быть заполнены</p>';

    if(errorString == ""){
      document.getElementById("Errors").innerHTML = "send";
  
      var postReq = new XMLHttpRequest(); 
      postReq.open('POST','/login',false); 
      postReq.setRequestHeader('Content-Type', 'application/json'); 

      postReq.onload = function() {
        if(this.responseText == 'next')
          window.location = location.origin;
        else
          document.getElementById('Errors').innerHTML = this.responseText; 
      }; 

      var j = {
          username: username.value,
          password: password.value,
          remember: _remember.checked,
          isAdmin: false
        }; 
        var temp = JSON.stringify(j);

    postReq.send(JSON.stringify(j)); 

    }
    else{
      document.getElementById("Errors").innerHTML = errorString;
    }


}