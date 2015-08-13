//FirstView Component Constructor
function menuBar(title, buttonCallback) {
	
	Ti.API.info("Creating MenuBar");
	Ti.API.info(title);
	Ti.API.info("Ti.Platform.osname: "+Ti.Platform.osname);
	
	var menuHeight;
	var self;
	
	if(Ti.Platform.osname=="android"){
		menuHeight = (Ti.Platform.displayCaps.platformHeight/Ti.Platform.displayCaps.logicalDensityFactor)*0.15;
		if(menuHeight>44)menuHeight=44;
		self = Ti.UI.createView({
		height:menuHeight,
		width:Ti.UI.FILL,
		backgroundColor:"red"
		});
	
	}else{
		
		menuHeight = (Ti.Platform.displayCaps.platformHeight)*0.15;
		if(menuHeight>44)menuHeight=44;
		self = Ti.UI.createView({
		height:menuHeight,
		width:Ti.UI.FILL,
		backgroundColor:"red"
		});
	
	}
	Ti.API.info(title);
	var titleLabel = Ti.UI.createLabel({
	  color:'white',
	  text: title,
	  font: { fontSize:20 },
	  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
	});
	
	var logo = Ti.UI.createView({
		backgroundImage : "/images/logoLarge.png",
		right : 5,
		height: (menuHeight*0.85),
		width : ((menuHeight*0.85)*2.2)
	});
	
	var button = Titanium.UI.createButton({
	   backgroundImage: '/images/flecha2web.png',
	   left:4,
	  	height: (menuHeight*0.85),
		width : 'auto'
	});
	button.addEventListener("click",function(){
		button.setEnabled(false);
		buttonCallback();
	});
	self.add(button);
	self.add(titleLabel);
	self.add(logo);

	return self;
}

module.exports = menuBar;
