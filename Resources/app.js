consultaData();

var inicial = Ti.UI.createWindow({
	backgroundColor:'red',
	width:Ti.UI.FILL,
	height:Ti.UI.FILL,
	color:'white',
	layout:'vertical'	
}), boton = Ti.UI.createButton({
	title:'abrir chat',
	backgroundColor:'green'
}), cajaUsuario = Ti.UI.createTextArea({
	width:Ti.UI.FILL,
	height: 50
}), usuarios = Ti.UI.createListView({
	bottom:0,
	height:'50%',
	width:Ti.UI.FILL,
	backgroundColor:'pink',
	color:'red'
});

	 var gdata=[];


Ti.include('./chat.js');
var ventana = Ti.App.chatCreaturGeneral({
	
    "chat-room" : "my-random-conversation",
	"window":{
        title           : 'Cuarto',
        backgroundColor : '#e9e3dd',
        backgroundImage :'/wallpaper.jpg',
        layout:'vertical'
	},"usuario": cajaUsuario.getValue()
	
});
//usuarios.appendSection(data);
inicial.add(boton);
inicial.add(cajaUsuario);
inicial.add(usuarios);
inicial.open();

boton.addEventListener('click',function(){
	
	Ti.API.info(cajaUsuario.getValue());
	ventana.chatWindow.open();
	Ti.API.info('imprimiendo data:'+gdata);

	});
	boton.addEventListener('longpress',function(){
		var fruitSection = Ti.UI.createListSection({ headerTitle: 'Fruits'});
		fruitSection.setItems(gdata);
		usuarios.appendSection(fruitSection);
	});

function consultaData(){
	
	var url = "http://192.168.1.84:8000/v2/ChatChannel/";
	//Creamos el cliente
	var http= Ti.Network.createHTTPClient({
		//propiedad con callback que optiene los datos del servidor
		onload:function(){
		//Aqui vas a manipular los datos que obtienes del servidor
		//Los datos hay que parsearlos para ser usados JSON.parse(this.responseText);
		var data = JSON.parse(this.responseText);
		//verificar en doc
		
		for (var i=0; i < data.length; i++) {
		gdata[i] = "{properties:{title:"+ data[i].user.first_name+"}}";
		  Ti.API.info(gdata[i]+":"+data[i].user.first_name);
		  
		};
			return data;
		},
		//en caso de encontrar un error devuelve el error en el callback
		onerror:function(e){
			Ti.API.error('error yaz '+e.error);
		},
		timeout:10000
	});
	
	//Hay que abrir el cliente pero aun aqui no se hace la peticion
	http.open("GET",url);
	
	//Aqui se envia la peticion al servidor y las propiedades onload y onerror se encuentran escuchando
	http.send();
	
	//send(); cuando el metodo es POST aqui va el JSON con los datos o la variable
	
	
	
};
