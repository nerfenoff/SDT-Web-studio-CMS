document.getElementById("submit").addEventListener('click',check);

  function check(){
    var username = document.getElementById("username");
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var _remember = document.getElementById("agree");
    var errorString = "";
    if(username.value == "")
      errorString += '<p>введите имя пользователя</p>';

    if(email.value == "")
      errorString += '<p>введите Email</p>';

    if(password.value.length < 8)
      errorString += '<p>размер пароля должен быть не менее 8 символов</p>';

    if(errorString == ""){
      document.getElementById("Errors").innerHTML = "send";

      var postReq = new XMLHttpRequest(); 
      postReq.open('POST','/registrationNewUser',false); 
      postReq.setRequestHeader('Content-Type', 'application/json'); 

      postReq.onload = function() {
        if(this.responseText == 'next')
          window.location = location.origin;
        else
          document.getElementById('Errors').innerHTML = this.responseText; 
      }; 

      var j = {
          username: username.value,
          email: email.value,
          password: password.value,
          remember: _remember.checked,
          isAdmin: false
        }; 
        var temp = JSON.stringify(j);

    postReq.send(JSON.stringify(j)); 

    }
    else
      document.getElementById("Errors").innerHTML = errorString;
  }

  