let menuLinks = document.getElementsByTagName('a');
console.log(menuLinks);
for(i of menuLinks){
	i.addEventListener('onload' , function () {
		this.style = 'background-color: #4CAF50';
	});
}
