var html=""
html =navs.map(function(item){
	if(item.txt ==""){
		return `<li style="background:#FFF url(${item.imgUrl}) no-repeat center;width:36px; padding:0;"></li>`
	}else{
		return `<li style="background:#FFF url(${item.imgUrl}) no-repeat 20px center ">${item.txt}</li>`
	}
	
	
})
 