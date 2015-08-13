//Application Window Component Constructor
function ApplicationWindow() {

var mainMenuObj = require('ui/mainMenu');
var mainMenu = new mainMenuObj({
	openWindow:function(window){
		navWindow.openWindow(window, {animated:true});
	}
});
var navWindow = Titanium.UI.iOS.createNavigationWindow({
   window: mainMenu
});


return navWindow;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
