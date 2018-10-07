var elem = document.getElementById("ddd");
var getReq = new XMLHttpRequest();
getReq.open('GET', '/getCurrentUser', false);
getReq.onload = function () {
    var user = JSON.parse(this.responseText);
    //alert(user.username);

    if (user.username != null) {
        elem.innerHTML = user.username;
        elem.href = "../UserPage"
    }
    else {
        elem.innerHTML = "регистраия";
        var a = document.createElement('a');
        a.href = "../login";
        a.id = "login";
        a.innerHTML = "Войти";
        document.getElementById("header").innerHTML += '/';
        document.getElementById("header").appendChild(a);
    }

}
getReq.send();

	
