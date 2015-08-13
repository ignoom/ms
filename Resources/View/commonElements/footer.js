//FirstView Component Constructor
function footer(params,refreshCallback) {
	
	Ti.API.info("Creating FooterBar");
	
	var menuHeight;
	var self;
	
	var contactoWindow;
  if (params.isTablet) {
    contactoWindow = require('ui/tablet/ApplicationWindow');
  } else {
    // Android uses platform-specific properties to create windows.
    // All other platforms follow a similar UI pattern.
    if (params.osname === 'android') {
      contactoWindow = require('View/contacto');
    } else {
      contactoWindow = require('ui/handheld/ApplicationWindow');
    }
  }
	
	if(Ti.Platform.osname=="android"){
		menuHeight = (Ti.Platform.displayCaps.platformHeight/Ti.Platform.displayCaps.logicalDensityFactor)*0.15;
		if(menuHeight>44)menuHeight=44;
		self = Ti.UI.createView({
		height:menuHeight,
		width:Ti.UI.FILL,
		backgroundColor:"red",
		zIndex:3,
		bottom:0
		});
	
	}else{
		
		menuHeight = (Ti.Platform.displayCaps.platformHeight)*0.15;
		if(menuHeight>44)menuHeight=44;
		self = Ti.UI.createView({
		height:menuHeight,
		width:Ti.UI.FILL,
		backgroundColor:"red",
		zIndex:3
		});
	
	}
	
	var title = Ti.UI.createLabel({
	  color:'white',
	  text: '\u00a9 2014 MS Motorsports \u00ae \n Todos los derechos reservados. \nCualquier infracción de estos derechos dará lugar a enjuiciamiento.',
	  font: { fontSize:8 },
	  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	  height:Ti.UI.FILL,
	  width:"70%"
	});
	
	var contactoButton = Ti.UI.createButton({
		backgroundImage : "/images/e_mail.png",
		right : 4,
		height: (menuHeight*0.85),
		width : (menuHeight*0.85)
	});
	contactoButton.addEventListener("click",function(){
		contactoButton.setEnabled(false);
		//var contact =  new contactoWindow(params);
	  //contact.open();
	  Ti.App.dispatcher.changeWindow(false,'contactForm',null);
	  contactoButton.setEnabled(true);
	});
	
	var refreshButton = Titanium.UI.createButton({
	   backgroundImage: '/images/refresh.png',
	   left:4,
	   height: (menuHeight*0.85),
	width : (menuHeight*0.85)
	});
	refreshButton.addEventListener("click",function(){
		refreshButton.setEnabled(false);
		//refreshCallback();
		refreshButton.setEnabled(true);
	});
	//self.add(refreshButton);
	self.add(title);
	self.add(contactoButton);

	return self;
}

module.exports = footer;
