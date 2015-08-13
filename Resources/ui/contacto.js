//Application Window Component Constructor
function ContactoWindow() {
    var viewsDesiredHeight = 44;
    
    var loadingViewObj = require('ui/loading');
    var loadingView = new loadingViewObj();
    
    //Menu
    var footerObject;
 
    var closeButton = Ti.UI.createButton({
    	title:"cerrar",
    	left:0,
    	top:20
    });
    
    //create component instance
    var window = Ti.UI.createWindow({
   	 backgroundColor:'white',
   	 title:"Contacto"
    });
    closeButton.addEventListener("click",function(e){
    	window.close();
    });
    window.add(loadingView);
    
    
    var mainView = Ti.UI.createView({
   	 height:Ti.UI.FILL,
   	 width:Ti.UI.FILL,
   	 layout:"vertical"
    });
    mainView.add(closeButton);
    
    var self = Ti.UI.createScrollView({
      contentWidth: '100%',
      contentHeight: 'auto',
      showVerticalScrollIndicator: true,
      showHorizontalScrollIndicator: false,
      height: "85%",
      width: '100%',
      layout:"vertical"
    });
    
    
    
    
    
    var titleLabel = Ti.UI.createLabel({
      color:'black',
      text: 'Envianos tus comentarios y nos pondremos en contacto para brindarte una mejor atención.',
      textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
      top: 30,
      width:"85%"
    });
    
    var nombreLabel = Ti.UI.createLabel({
      color:'black',
      text: 'Nombre:',
      textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
      top: "20dip",
      width:"85%"
    });
    
    var nombreTextField = Ti.UI.createTextField({
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 2,
      color: 'black',
      top: "2dip",
      backgroundColor : "white",
      width: "85%",
      height : viewsDesiredHeight
    });
    var correoLabel = Ti.UI.createLabel({
      color:'black',
      text: 'Correo:',
      textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
      top: 10,
      width:"85%"
    });
    
    var correoTextField = Ti.UI.createTextField({
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 2,
      color: 'black',
      top: "2dip",
      keyboardType : Ti.UI.KEYBOARD_EMAIL,
      backgroundColor : "white",
      width: "85%",
      height : viewsDesiredHeight
    });
    
    var comentariosLabel = Ti.UI.createLabel({
      color:'black',
      text: 'Comentarios:',
      textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
      top: 10,
      width:"85%"
    });
    
    var comentariosTextArea = Ti.UI.createTextArea({
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 2,
      color: 'black',
      top: "2dip",
      width: "85%",
      backgroundColor : "white",
      height : "35%"
    });
    
    var enviarButton = Titanium.UI.createButton({
   	title: 'Enviar',
   	top: 30,
   	width: "85%",
   	height: 44
    });
    
    enviarButton.addEventListener('click',function(e){
	loadingView.show();
   	 

    var xhr = Ti.Network.createHTTPClient({
    	onload: function(e) {
        	Ti.API.info(this.responseText);
        	var resp = JSON.parse(this.responseText);
        	if(resp.error){
        	loadingView.hide();
        	alert('Error con la conexión.');
        	}else{
        	alert("Enviado.");
   		 window.close();
        	}
       	 
    	},
    	onerror: function(e) {
   		 // this function is called when an error occurs, including a timeout
        	Ti.API.debug(e.error);
        	loadingView.hide();
        	alert('Error con la conexión.');
    	},
    	timeout:15000  /* in milliseconds */
    });
    xhr.open("POST", "http://www.msmotorsports.mx/ignoom/contacto.php");
    xhr.send({
   	 nombre:nombreTextField.getValue(),
   	 correo:correoTextField.getValue(),
   	 comentarios:comentariosTextArea.getValue()
    });  // request is actually sent with this statement


   	 
    });
    
    self.add(titleLabel);
    self.add(nombreLabel);
    self.add(nombreTextField);
    self.add(correoLabel);
    self.add(correoTextField);
    self.add(comentariosLabel);
    self.add(comentariosTextArea);
    self.add(enviarButton);
    
    mainView.add(self);
    window.add(mainView);
    window.addEventListener('open',function(){
   	 Ti.API.info("loadingView.hide();");
   	 loadingView.hide();
    });
 
    return window;
}

//make constructor function the public component interface
module.exports = ContactoWindow;



