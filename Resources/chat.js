//(
	//function(){
/// -----------------------------------
/// VARIABLES PUBNUB & DECTECTAR PLATAFORMA
/// -----------------------------------
///EN CASO DE QUE SE QUIERA QUE EL CLIENTE NO PUBLIQUE SE ELIMINA EL publish_key


	var pubnub 	= require('pubnub')({
		publish_key		:'pub-c-8d8189b5-7660-4c5e-9195-93de952fcadc',
		subscribe_key	:'sub-c-f3da4d7e-bb95-11e5-bcee-0619f8945a4f',
		ssl				: false,
		origin			:'pubsub.pubnub.com',
		uuid			: 'Movil'  //CAMBIAR POR NOMBRE DE USUARIO, USUARIO UNICO 
										  //TANTO PARA UUID COMO PARA MANDAR MENSAJES	
	});


 
/// -----------------------------------
/// 	CONECTANDO AL CHAT M:M
/// -----------------------------------
Ti.App.chatCreaturGeneral = function(setup){	

/// -----------------------------------
/// 	CREANDO SUBSCRIPCIÓN
/// -----------------------------------
	pubnub.subscribe({
		channel:'creaturGeneral',
		connect : function(){
			star_chating();
		},
		callback: function(es){
			//SI LA APLICACION ESTÁ MINIMIZADA, REALIZAR LAS NOTIFICACIONES
			showMenssagesOnChat(es.text, es.user, es.data, es.color);
			Ti.API.info(':D >>>>   '+JSON.stringify(es));
			
		}, 
		error:function(e){
			Ti.API.info('OTRO ERRO '+JSON.stringify(e));
			error_connection_chat("Reestableciendo conexión"); 		}
		
	});
	


/// -----------------------------------
///				 INTERFAZ
/// -----------------------------------
var chatWindow = Ti.UI.createWindow( setup['window']),
	chatBox = Ti.UI.createView({
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		backgroundColor: 'transparent',
		bottom: 0,
		layout:'horizontal'
	}),
	chatText = Ti.UI.createTextArea({
		width	: '80%',
		height	: Ti.UI.SIZE,
		bottom:4,
		left	: 4,
		borderRadius: 5,
		backgroundColor: 'white',
		hintText:'Escribir mensaje',
		color: "black",
		editable:false
	}),
	sendButton = Ti.UI.createView({
		width: '12%',
		height: '40dp',
		backgroundColor: '#00ab84',
		right: 4,
		left:6,
		bottom:4,
		borderRadius: 19
	}),
	containerChat = Ti.UI.createScrollView({
		top:0,
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		contentHeight :Ti.UI.FILL,
		backgroundColor:'transparent'
	});
/// -----------------------------------
///				 TEMPLATE
/// -----------------------------------
var rightMenssage = { 
    childTemplates:[
    {
    	type:'Ti.UI.View',
    	properties:{
	    	//backgroundColor:'orange',
	    	right:1,
	    	width:'80%',
	    	height:Ti.UI.SIZE
	    },
	    childTemplates:[
	    	{
			type:'Ti.UI.View', //VISTA
			bindId:'MenssageLeft',
			properties:{
				backgroundColor:'#ddf7c8',
				width: Ti.UI.SIZE,
				height:Ti.UI.SIZE,
				right:2,
				top:2,
				borderRadius:5,
				layout:'vertical'
				},
			childTemplates:[
			{
				type:'Ti.UI.View',
				properties:{
					height:Ti.UI.SIZE,
					width:Ti.UI.SIZE,
					//backgroundColor:'pink',
					layout:'vertical'
				}, childTemplates:[
				
				{
					type: 'Ti.UI.Label',
					bindId: 'tagUserName',
					properties: {
						height:Ti.UI.SIZE,
						width:Ti.UI.SIZE,
						//backgroundColor:'red',
						left:4,
						right:4,
						top:4,
						color:'#9080f8',
						font: {
							fontFamily:'Arial', 
							fontSize:'6dp', 
							fontWeight:'bold'}
					}
				},
				{
					type: 'Ti.UI.Label',
					bindId: 'messageText',
					properties:{
						height:Ti.UI.SIZE,
						width:Ti.UI.SIZE,
						color:'#000',
						//backgroundColor:'blue',
						top:1,
						left:4,
						right:4,
						bottom:4,
						font: {fontSize:'12dp'}
					}
				},
				
				]
				
			},
			
				{
					type:'Ti.UI.Label',
					bindId:'messageDateLeft',
					properties:{
						height:Ti.UI.SIZE,
						width:Ti.UI.SIZE,
						//backgroundColor:'green',
						bottom:4,
						right:3,
						color:'#8d9092',
						font:{
							fontSize:'9dp'
						},
						textAlign:Titanium.UI.TEXT_ALIGNMENT_RIGHT
					}
				}
			]
		}
	    ]
    },
    	
			]
};
			
var leftMenssage = { 
	childTemplates:[
    {
    	type:'Ti.UI.View',
    	properties:{
	    	left:1,
	    	width:'80%',
	    	height:Ti.UI.SIZE
	    },
	    childTemplates:[
	    	{
			type:'Ti.UI.View', //VISTA
			bindId:'MenssageLeft',
			properties:{
				backgroundColor:'#ffffff',
				width: Ti.UI.SIZE,
				height:Ti.UI.SIZE,
				left:2,
				top:2,
				borderRadius:5,
				layout:'vertical'
				},
			childTemplates:[
			{
				type:'Ti.UI.View',
				properties:{
					height:Ti.UI.SIZE,
					width:Ti.UI.SIZE,
					//backgroundColor:'pink',
					layout:'vertical'
				}, childTemplates:[
				
				{
					type: 'Ti.UI.Label',
					bindId: 'tagUserName',
					properties: {
						height:Ti.UI.SIZE,
						width:Ti.UI.SIZE,
						//backgroundColor:'red',
						left:4,
						right:4,
						top:4,
						color:'#9080f8',
						font: {
							fontFamily:'Arial', 
							fontSize:'9dp', 
							fontWeight:'bold'}
					}
				},
				{
					type: 'Ti.UI.Label',
					bindId: 'messageText',
					properties:{
						height:Ti.UI.SIZE,
						width:Ti.UI.SIZE,
						color:'#000',
						//backgroundColor:'blue',
						top:1,
						left:4,
						right:4,
						bottom:4,
						font: {fontSize:'12dp'}
					}
				},
				
				]
				
			},
			
				{
					type:'Ti.UI.Label',
					bindId:'messageDateLeft',
					properties:{
						height:Ti.UI.SIZE,
						width:Ti.UI.SIZE,
						//backgroundColor:'green',
						bottom:4,
						right:3,
						color:'#8d9092',
						font:{
							fontSize:'9dp'
						},
						textAlign:Titanium.UI.TEXT_ALIGNMENT_RIGHT
					}
				}
			]
		}
	    ]
    },
    	
			]};
			
	var listChat = Ti.UI.createListView({
			width: Ti.UI.FILL,
			backgroundColor: "transparent",
			height: Ti.UI.SIZE,
			bottom: 4, 
			separatorColor: "transparent"
		}),
	    sendDcon = Ti.UI.createLabel({
			text:">",
			font: {
				fontSize: 26,
				fontWidth: 'blod'
			},
			color: 'white',
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
	}),
		chatLoad = Ti.UI.createActivityIndicator({
		  color: '#000',
		  font: {fontFamily:'AmericanTypewriter', fontSize:16, fontWeight:'bold'},
		  style: Ti.UI.ActivityIndicatorStyle.DARK,
		  height:Ti.UI.SIZE,
		  width:Ti.UI.SIZE
	});
	
	var menssageSection =  Ti.UI.createListSection();	
	var menssageData= [];
	//menssageSection.setItems(menssageData);
	listChat.appendSection(menssageSection);

/// -----------------------------------
/// 	ENVIAR MENSAJE
/// -----------------------------------
function sendMessagetoChat (este){
	if (!este) return;
	else {
	pubnub.publish({
		channel	: 'creaturGeneral',
		message : {text: este, user: "Movil", color:'red', data:tiempoEnviado()},
		callback: function (e){
			Ti.API.info('E: '+JSON.stringify(e));
		}
		 
	});
	}
};

function showMenssagesOnChat(textoChat, user, data, color){
	if(user==='Movil'){
		listChat.setTemplates({
			'template':rightMenssage
		});
		listChat.setDefaultItemTemplate('template');
		menssageData.push(
		{ messageText: {text:textoChat},messageDateLeft:{text:data} ,properties:{
			height:Ti.UI.SIZE, backgroundColor:'transparent'
		}
		});
	} else{
		listChat.setTemplates({
			'template':leftMenssage
		});
		listChat.setDefaultItemTemplate('template');
		menssageData.push(
		{tagUserName: { text:user, color:color}, messageText: {text:textoChat},messageDateLeft:{text:data} ,properties:{
			height:Ti.UI.SIZE, backgroundColor:'transparent'
		}
		});
	}
	
	/**var contentTextMessage = {
		message:textMessage.messageChat, 
		user : 'userRegister', // pen
		//date: textMessage.create_at //pendiente
	};	
	var messageChat = Alloy.createModel('Message',{
		content: textMessage.messageChat,
		emitter : 'Alloy.User.objectId'
		//create_at : textMessage.create_at
	});**/
	menssageSection.setItems(menssageData);
	listChat.scrollToItem(0,menssageData.length-1,{animated:true});	
}

var tiempoEnviado = function (){
	var fechaActual = new Date();
	var dia = fechaActual.getDate();
	var anio = fechaActual.getFullYear;
	var horas = fechaActual.getHours();
	var minutos = fechaActual.getMinutes().toString();
	
	if(minutos.length===2){
		var tiempo =horas+':'+ minutos;
		return tiempo;
	}
	else {
	var nminutos='0'+minutos;	
	var tiempo =horas+':'+ nminutos;
	return tiempo;
		}
		};
	
	function load_connection_chat (textMe){
		chatLoad.setMessage(textMe);
		chatLoad.show();

		
	};
	function star_chating (){
		pubnub.here_now({		// CONSULTANDO PRESENCIAS 
		channel:'creaturGeneral',
		state:true,
		callback:(function(e){
			Ti.API.info(JSON.stringify(e.uuids));
		})
			});
		chatLoad.hide();
		chatText.setEditable(true);	//ACTIVANDO CAMPO DE TEXTO 
		
	} 
	function error_connection_chat(e){
		Ti.API.info('ERROR!!:'+e);
		load_connection_chat(e);
	}
	
	
	chatText.addEventListener('return',function(e){ //ENTER LIKE SEND MENSSAGE
		
		sendMessagetoChat(chatText.value);
		chatText.value="";
		chatText.setHeight(Ti.UI.SIZE);
		listChat.setBottom(chatBox.rect.height);
	
	});
	
	sendButton.addEventListener('touchstart',function(){
		chatText.setHeight(Ti.UI.SIZE);
		sendMessagetoChat(chatText.value);
		chatText.value="";
		listChat.setBottom(chatBox.rect.height);
	});
	
	chatWindow.addEventListener('open', function(){
	
	//load_connection_chat("Conectando...");
	//chatText.setEditable(true);	
	Ti.API.info ('ABRIENDO APP');
	
	});
	chatText.addEventListener('change', function(){
		var t = chatText.rect.height,
			m = chatText.getMaxLength,
			l = chatText.getValue().length,
			c = 0;
			
			if (t>m){
				chatText.setHeight(l);
				c = c || l;
			} else if (l<c){
				chatText.setHeight(Ti.UI.SIZE);
			}
		
		listChat.scrollToItem(0,menssageData.length-1,{animated:false});	
		listChat.setBottom(chatBox.rect.height+2);
	});
	
 

Titanium.App.removeEventListener('open', function  (){
		pubnub.unsubscribe({
			channel:"creaturGeneral",
			callback: function(e){
				Ti.API.info('UNSUBSCRIBE:', JSON.stringify(e));
				sendMessagetoChat(e.action);
			}
		});
	
});


	
	
	sendButton.add(sendDcon); 
	chatBox.add(chatText);
	chatBox.add(sendButton);
	containerChat.add(listChat);
	containerChat.add(chatBox);
	//listChat.add(chatBox);
	chatWindow.add(containerChat);
	chatWindow.add(chatLoad);
	this.chatWindow = chatWindow;
	this.pubnub = pubnub;
	
	
	return this;
	
	
}; //TERMINA FUNCIÓN ENVIAR GRUPAL
	
 //});