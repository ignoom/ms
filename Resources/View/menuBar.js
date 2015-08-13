//FirstView Component Constructor
function menuBar(title) {
	
	Ti.API.info("Creating MenuBar");
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
	   backgroundImage: '/images/back.png',
	   left:4,
height: (menuHeight*0.80),
width:((menuHeight*0.80)/2)
	});
	button.addEventListener("click",function(){
		Ti.App.dispatcher.changeWindow(true,null,null);
	});
	self.add(button);
	self.add(titleLabel);
	self.add(logo);
	self.top =0;

	return self;
}

module.exports = menuBar;
