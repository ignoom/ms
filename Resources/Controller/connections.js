
// Trae todos los productos
exports.getRims = function(params,rim,errorCallback) {
 
 Ti.API.info("Get product");
var url = "http://msmotorsports.mx/ignoom/rines.php?id="+params;//?id="+params.id;

var xhr = Ti.Network.createHTTPClient({
    onload: function(e) {
    Ti.API.info("First: "+JSON.stringify(rim));
		//callback(this.responseText,rim);
		
		Ti.API.info(this.responseText);
		Ti.API.info(JSON.parse(this.responseText).imagen);
	
		Ti.API.info("Second: "+JSON.stringify(rim));
		var atts = JSON.parse(this.responseText);
		
		rim.nombre = atts.nombre;
		rim.id =  atts.id;
		rim.tipoRin = atts.tipo_rin;
		rim.imagen = atts.imagen;
		rim.modelo = atts.modelo;
		rim.dimension = atts.dimension;
		Ti.API.info("Third: "+JSON.stringify(rim));
		
		var logo = require('View/commonElements/rinLogo');
	 	Ti.API.info("Fifth: "+JSON.stringify(rim));
		rim.view = new logo((rim.id==1)?'Pickup':'Passenger', rim.imagen);
		
		
    },
    onerror: function(e) {
        Ti.API.debug(e.error);
        alert('No hay internet.');
        
        Ti.App.dispatcher.changeWindow(true,null,null);
        
    },
    timeout:10000  /* in milliseconds */
});
xhr.open("GET", url, true);
xhr.send();  // request is actually sent with this statement


};

exports.connect = function(url,callB) {
 
 Ti.API.info("Connecting to WS");
 
// var resp = null;
	function retrieveData(callback,callb) {


		

		var xhr = Ti.Network.createHTTPClient({
			onload : function() {

			//	Ti.API.info(this.responseText);
			//	Ti.API.info(JSON.parse(this.responseText).imagen);
				////data = this.responseText;
				callback(this.responseText,callb);

			},
			onerror : function(e) {
				//Ti.API.debug(e.error);
				alert('No hay internet.');
				//Ti.App.dispatcher.changeWindow(true,null,null);
			},
			timeout : 10000 /* in milliseconds */

		});
		
		xhr.open("GET", url,false);
		xhr.send();

	}

	retrieveData(function(returnVar,callb) {
		//If we get a null or undefined response, we'll just take an empty array
		var resp = JSON.parse(returnVar) || [];
		Ti.API.info("respuesta: "+resp);
		//Check there are some links
		//Ti.API.info(self.data);
		//Ti.API.info("Fifth: " + JSON.stringify(self.data));
		//var logo = require('View/commonElements/rinLogo');
		//self.view = new logo((self.data.id == 1) ? 'Pickup' : 'Passenger', self.data.imagen);
		if(callb){
			callb(resp);	
		}
		
	}, callB);
	
	
	//return resp;

	
};
