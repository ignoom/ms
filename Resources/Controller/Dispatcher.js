function Dispatcher() {

	var menuBar = require('View/menuBar');
	this.menuBar = new menuBar('Bar', Dispatcher.prototype.changeWindow);
	Ti.App.menuBar = this.menuBar;

	var mainMenu = require('View/mainMenu');
	this.mainMenu = new mainMenu('Menu');

	var tabletMenu;

}

Dispatcher.prototype.init = function() {
	/*Ti.UI.currentWindow = this.rimDetails;
	 Ti.UI.currentWindow.open();
	 Ti.App.windowStack.push(this.rimDetails);*/

	Ti.UI.currentWindow = this.mainMenu;
	Ti.UI.currentWindow.orientationModes=[Titanium.UI.PORTRAIT];
	Ti.UI.currentWindow.open();
	Ti.App.windowStack.push(this.mainMenu);
};
Dispatcher.prototype.changeWindow = function(isBack, ventana, opciones) {
	Ti.API.info(isBack + ventana + opciones);

	//Temporary... DELETE LATER (HARDCODED)
	var tempData = {
		id : "1",
		tipo_rin : "pickup",
		nombre : "P14 5-114.3",
		modelo : "VK 302 MC 14 5B",
		medida : "14x7.0",
		barrenacion : "5X114.3 ET-09",
		dimension : "VK-302 14x7.0 5X114.3 ET-09",
		diametro : "14",
		disponibilidad : "0",
		imagen_id : "http://www.mckarts.com/ITPSS212_12X7_10230.00.jpg"
	};

	if (!isBack) {
		if (Titanium.Network.online) {
			switch(ventana) {
				case "rimMenu":
					if (this.rimMenu == null) {
						var rimMenu = require('View/rimMenu');
						this.rimMenu = new rimMenu('Rines');
					}
					Ti.API.info(ventana + opciones);
					Ti.UI.currentWindow = this.rimMenu;
					
					Ti.App.windowStack.push(this.rimMenu);
					break;
				case "rimDetails":
					this.rimDetails = null;
					if (this.rimDetails == null) {
						var rimDetails = require('View/rimDetails');
						this.rimDetails = new rimDetails('Detalles', opciones);
					}
					Ti.API.info(ventana + opciones);
					Ti.UI.currentWindow = this.rimDetails;
					Ti.App.windowStack.push(this.rimDetails);
					break;
				case "llantaDetails":
					this.llantaDetails = null;
					if (this.llantaDetails == null) {
						var llantaDetails = require('View/llantaDetail');
						this.llantaDetails = new llantaDetails('', opciones);
					}
					Ti.API.info(ventana + opciones);
					Ti.UI.currentWindow = this.llantaDetails;
					Ti.App.windowStack.push(this.llantaDetails);
					break;
				case "acceDetails":
					this.acceDetails = null;
					if (this.acceDetails == null) {
						var acceDetails = require('View/AccesoriosDetail');
						this.acceDetails = new acceDetails('', opciones);
					}
					Ti.API.info(ventana + opciones);
					Ti.UI.currentWindow = this.acceDetails;
					Ti.App.windowStack.push(this.acceDetails);
					break;
				case "contactForm":
					if (this.contactForm == null) {
						var contactForm = require('View/contacto');
						this.contactForm = new contactForm(Ti.App.params);
					}
					Ti.API.info(ventana + opciones);
					Ti.UI.currentWindow = this.contactForm;
					Ti.App.windowStack.push(this.contactForm);
					break;
				case "catalogo":
					this.catalogoWindow = null;
					if (this.catalogoWindow == null) {
						var catalogoWindow = require('View/catalogo');
						this.catalogoWindow = new catalogoWindow(Ti.App.params);
					}
					Ti.API.info(ventana + opciones);
					Ti.UI.currentWindow = this.catalogoWindow;
					Ti.App.windowStack.push(this.catalogoWindow);
					break;
				case "catalogoGeneric":
					Ti.App.params.url = null;
					this.catalogoWindow = null;
					if (this.catalogoWindow == null) {
						var catalogoGenWindow = require('View/catalogoGeneric');
						this.catalogoGenWindow = new catalogoGenWindow(Ti.App.params, opciones);
					}

					Ti.API.info(ventana + opciones);
					Ti.UI.currentWindow = this.catalogoGenWindow;
					Ti.App.windowStack.push(this.catalogoGenWindow);
					break;
				default:

			}
		} else {
			alert("No hay internet");
		}
	} else {

		Ti.App.windowStack.pop().close();
		Ti.UI.currentWindow = Ti.App.windowStack.slice(-1)[0];
		Ti.API.info(Ti.UI.currentWindow);
	}
	Ti.UI.currentWindow.orientationModes=[Titanium.UI.PORTRAIT];
	Ti.API.info(Ti.App.windowStack.length);
	Ti.UI.currentWindow.open();
};

module.exports = Dispatcher;
