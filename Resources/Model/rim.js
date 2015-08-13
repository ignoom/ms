function Rim(param, callB) {
	var self= {};
	self.param = param;
	//this.param = param;
	
//	Ti.API.info("Get product");
	var url = "http://msmotorsports.mx/ignoom/rines.php?id="+self.param;
		//?id="+params.id;
	self.data = null;
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
				Ti.App.dispatcher.changeWindow(true,null,null);
			},
			timeout : 10000 /* in milliseconds */

		});
		
		xhr.open("GET", url,false);
		xhr.send();

	}

	retrieveData(function(returnVar,callb) {
		//If we get a null or undefined response, we'll just take an empty array
		self.data = JSON.parse(returnVar) || [];
		
		//Check there are some links
		
		var imagen = null;
		
		var logo = require('View/commonElements/rinLogo');
		if(self.param == 1){
			imagen = 'http://www.msmotorsports.mx/photo/rines/thumbs/ER%20009%20DB%2015%205B.jpg';
		}
		else{
			imagen = 'http://www.msmotorsports.mx/photo/rines/thumbs/E%204418%20MBRL%2013%204B.jpg';
		}
		self.view = new logo((self.param == 1) ? 'Pickup' : 'Passenger', imagen);
		if(callb){
		callb();	
		}
		
	}, callB);
	
	return self;
}

Rim.prototype.setAttributes = function(response, callb) {
	this.data = response;
	//Ti.API.info(this.data);


};
Rim.prototype.getDataLogo = function() {
	//Ti.API.info("Get product");
	var url = "http://msmotorsports.mx/ignoom/rines.php?id="+this.param;
		//?id="+params.id;
	var data = null;
	function retrieveData(callback) {


		

		var xhr = Ti.Network.createHTTPClient({
			onload : function() {

				//Ti.API.info(this.responseText);
				//Ti.API.info(JSON.parse(this.responseText).imagen);
				//data = this.responseText;
				callback(this.responseText);

			},
			onerror : function(e) {
			//	Ti.API.debug(e.error);
			Ti.App.dispatcher.changeWindow(true,null,null);
				alert('No hay internet.');
				//Ti.App.dispatcher.changeWindow(true,null,null);
			},
			timeout : 10000 /* in milliseconds */

		});
		
		xhr.open("GET", url);
		xhr.send();

	}

	retrieveData(function(returnVar) {
		//If we get a null or undefined response, we'll just take an empty array
		data = returnVar || [];
		//Check there are some links
		Ti.API.info(data);
		
	});

	
	
	return data;

};

module.exports = Rim;

