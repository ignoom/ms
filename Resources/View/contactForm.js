//Application Window Component Constructor
function Contacto(params) {
	var realHeight = (Ti.App.params.width/Ti.App.params.densityFactor);
	
//	var menuObject;
  
   //   menuObject = require('ui/common/Menu');

  

	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'white',
		navBarHidden:true,
		layout:"vertical"
	});
	
	//var menu = new menuObject("Contacto",function(){self.close();});
	
	//self.add(menu);
	self.add(Ti.App.menuBar);
	
	return self;
}

//make constructor function the public component interface
module.exports = Contacto;
