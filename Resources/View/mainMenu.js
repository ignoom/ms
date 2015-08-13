function MainMenu(title) {
var realHeight = (Ti.App.params.width/Ti.App.params.densityFactor);
var realWidth = (Ti.App.params.width/Ti.App.params.densityFactor);
								/*	var contactoWindow;
								  if (Ti.App.params.isTablet) {
								    contactoWindow = require('ui/tablet/ApplicationWindow');
								  } else {
								    // Android uses platform-specific properties to create windows.
								    // All other platforms follow a similar UI pattern.
								    if (Ti.App.params.osname === 'android') {
								      contactoWindow = require('ui/handheld/android/contacto');
								    } else {
								      contactoWindow = require('ui/handheld/ApplicationWindow');
								    }
								  }*/
  
		var realHeight = (Ti.App.params.height/Ti.App.params.densityFactor);
		var realWidth = (Ti.App.params.width/Ti.App.params.densityFactor);
		
		var contactoWindow;
		var catalogoWindow;
	  if (Ti.App.params.isTablet) {
	    contactoWindow = require('View/tablet/mainMenuTablet');
	  } else {
	    // Android uses platform-specific properties to create windows.
	    // All other platforms follow a similar UI pattern.
	    if (Ti.App.params.osname === 'android') {
	      contactoWindow = require('View/contacto');
	      catalogoWindow = require('View/catalogo');
	    } else {
	      contactoWindow = require('View/tablet/mainMenuTablet');
	    }
	  }
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ff0000',
		navBarHidden:true,
		exitOnClose:true
	});
	
	
	var logoImage = Ti.UI.createImageView({
	  image:'/images/logoLarge.png',
	  width : (realWidth*0.80),
	  height : (realWidth*0.80*0.40),
	  top:10
	});
	self.add(logoImage);
	var rinesButton = Titanium.UI.createButton({
       color : "#FFFFFF",
       shadowColor : "#000000",
       title: "Rines",
       shadowOffset : {x:1,y:1},
       shadowRadius : 0.6,
       backgroundGradient: {type: "radial", colors: [ { color: "#080909", offset: 0.0}, { color: "#626b70", offset: 0.25 }]},
       borderRadius : 3,
       height:((realHeight*0.20) > 44 ? 44 : realHeight*0.20),
       width:"60%",
       top:(realHeight*0.33)
	});
											rinesButton.addEventListener('click',function(e)
											{
												rinesButton.setEnabled(false);
											  	Ti.App.dispatcher.changeWindow(false,'rimMenu',null);
											  	rinesButton.setEnabled(true);
											});
	
	var llantasButton = Titanium.UI.createButton({
       color : "#FFFFFF",
       shadowColor : "#000000",
       title: "Llantas",
       shadowOffset : {x:1,y:1},
       shadowRadius : 0.6,
       backgroundGradient: {type: "radial", colors: [ { color: "#080909", offset: 0.0}, { color: "#626b70", offset: 0.25 }]},
       borderRadius : 3,
       height:((realHeight*0.20) > 44 ? 44 : realHeight*0.20),
       width:"60%",
       top:(rinesButton.top+rinesButton.height+15)
	});
				llantasButton.addEventListener('click',function(e)
				{
				   llantasButton.setEnabled(false);
				  Ti.App.params.url = "http://www.msmotorsports.mx/ignoom/tires.php";
				  Ti.App.params.type = 1;
				 // var catalogo =  new catalogoWindow(Ti.App.params);
				 Ti.App.dispatcher.changeWindow(false,'catalogo',null);
				 // catalogo.open();
				  llantasButton.setEnabled(true);
				});
	
	var accesoriosButton = Titanium.UI.createButton({
       color : "#FFFFFF",
       shadowColor : "#000000",
       title: "Accesorios",
       shadowOffset : {x:1,y:1},
       shadowRadius : 0.6,
       backgroundGradient: {type: "radial", colors: [ { color: "#080909", offset: 0.0}, { color: "#626b70", offset: 0.25 }]},
       borderRadius : 3,
       height:((realHeight*0.20) > 44 ? 44 : realHeight*0.20),
       width:"60%",
        top:(llantasButton.top+llantasButton.height+15)
	});
	accesoriosButton.addEventListener('click',funcClick);
	
	
	self.add(rinesButton);
	
	self.add(llantasButton);
	
	self.add(accesoriosButton);
	
					function funcClick(info){
						llantasButton.setEnabled(false);
						
						  Ti.App.params.url = "http://www.msmotorsports.mx/ignoom/accesories.php";
						  Ti.App.params.type = 2;
						 // var catalogo =  new catalogoWindow(Ti.App.params);
						 // catalogo.open();
						  
						  Ti.App.dispatcher.changeWindow(false,'catalogo',null);
						  llantasButton.setEnabled(true);
					}
					
	var derechosLabel = Ti.UI.createLabel({
	  color: 'white',
	  font: { fontSize:16 },
	  text: '\u00a9 2014 MS Motorsports \u00ae \n Todos los derechos reservados.',
	  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	  bottom: 15,
	  width: Ti.UI.SIZE, height: Ti.UI.SIZE
	});
	self.add(derechosLabel);
	self.addEventListener("open",function(e){
self.activity.actionBar.hide();
});
	return self;
};

module.exports = MainMenu;