//Application Window Component Constructor
function CatalogoWindow(params, criteria, data) {
	var viewsDesiredHeight = 44;
	var pagina = 0;

	//Menu
	var menuObject;
	var footerObject;
	var loadingViewObj = require('View/commonElements/loading');
	var loadingView = new loadingViewObj();
	if (params.isTablet) {
		menuObject = require('ui/tablet/ApplicationWindow');
	} else {
		if (params.osname === 'android') {
			menuObject = require('View/commonElements/Menu');
			footerObject = require('View/commonElements/footer');
		} else {
			menuObject = require('ui/handheld/ApplicationWindow');
		}
	}

	//create component instance
	var window = Ti.UI.createWindow({
		backgroundColor : 'white',
		navBarHidden : true,
		 titleControl : false,
        fullScreen : true
	});

	var header = new menuObject("Catálogo", function() {
		window.close();
	});
	var footer = new footerObject(params, function() {
		loadingView.show();
		refresh(params.url, getHttpData(params.type), loadData);
	});
	header.setTop(0);
	footer.setBottom(0);
	var menuBar = require('View/menuBar');
	var title = (params.type==1) ? "Llantas" : "Accesorios";
	var mB = new menuBar(title);
	window.add(mB);
	window.add(footer);
	window.add(loadingView);
	loadingView.hide();

	////////////FUNCTIONS
	function getHttpData(type) {
		var httpData;

		switch(type) {
			case 0:
				httpData = {
					pag : pagina,
					diametro : params.diametro
				};
				break;
			case 1:
				httpData = {
					page : pagina
				};
				break;
			case 2:
				httpData = {
					page : pagina
				};
				break;
		}

		return httpData;
	}

	function loadData(response) {

		var tableData = [];
		var parsedResponse = JSON.parse(response);
		for (var i = 0; i < parsedResponse.length; i++) {
			var row = catalogRow(parsedResponse[i], params.type);
			tableData.push(row);
		}

		table.setData(tableData);
		loadingView.hide();
	}

	var table = Ti.UI.createTableView({
		height : (params.realHeight - (header.height + footer.height)),
		top : header.height,
		width : Ti.UI.FILL,
		separatorColor : "gray"
	});

	Ti.API.info("table " + table.height + " params.realHeight-(header.height+footer.height)" + Ti.App.params.realHeight + " " + header.height + " " + footer.height);
	table.addEventListener("click",function(e){
					
		switch(params.type) {
		case 1:
			Ti.App.dispatcher.changeWindow(false,'llantaDetails',e.row.params);
			break;
		case 2:
			Ti.App.dispatcher.changeWindow(false,'acceDetails',e.row.params);
			break;
	}
	});
	window.add(table);

	window.addEventListener('open', function() {
		loadingView.show();
		refresh(params.url, getHttpData(params.type), loadData);
window.activity.actionBar.hide();
	});

	return window;
};

function catalogRow(rowParams, type) {

	var row = Ti.UI.createTableViewRow({
		className : 'row',
		height : 120,
		params : rowParams
	});

	var nombreLabel = Ti.UI.createLabel({
		color : 'black',
		text : rowParams.nombre,
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		top : 1,
		height : 22,
		left : 105,
		backgroundColor : "lightgray"
	});

	// var infoLabel = Ti.UI.createLabel({
		// color : 'black',
		// text : ('Medida: ' + rowParams.medida), //+'\nBarrenación: '+rowParams.barrenacion+'\nModelo: '+rowParams.modelo,
		// textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		// left : 105,
		// width : "60%",
		// height : 74
	// });

	var disponibilidadLabel = Ti.UI.createLabel({
		color : (rowParams.disponibilidad == "0" ? 'green' : 'red'),
		text : (rowParams.disponibilidad == "0" ? 'Disponible' : 'Agotado'),
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		bottom : 1,
		left : 105,
		height : 22,
		width : "60%"
	});

	var image = Ti.UI.createImageView({
		height : 90,
		width : 90,
		left : 10
	});
	switch(type) {
		case 1:
			image.setImage("http://msmotorsports.mx/photo/llanta/thumbs/" + Ti.Network.encodeURIComponent(rowParams.nombre) + ".jpg");
			break;
		case 2:
			image.setImage("http://msmotorsports.mx/photo/accesorios/thumbs/" + Ti.Network.encodeURIComponent(rowParams.nombre) + ".jpg");
			break;
	}

	Ti.API.info(image.image);
	row.add(nombreLabel);
	//row.add(infoLabel);
	row.add(disponibilidadLabel);
	row.add(image);
	return row;

}

function refresh(url, data, callback) {
	Ti.API.info(url + " datos: " + JSON.stringify(data));

	var client = Ti.Network.createHTTPClient({
		// function called when the response data is available
		onload : function(e) {
			Ti.API.info("Received text: " + this.responseText);
			callback(this.responseText);
		},
		// function called when an error occurs, including a timeout
		onerror : function(e) {
			Ti.API.debug(e.error);
			alert('error');
		},
		timeout : 10000 // in milliseconds
	});
	
	// Prepare the connection.
	client.open("POST", url);
	
	// Send the request.
	client.send();

}

//make constructor function the public component interface
module.exports = CatalogoWindow;
