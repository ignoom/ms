//Application Window Component Constructor
function CatalogoGenericWindow(params, url) {
	var viewsDesiredHeight = 44;
	var pagina = 0;
	params.url=url;
	//Menu
	var menuObject;
	var footerObject;
	var loadingViewObj = require('View/commonElements/loading');
	var loadingView = new loadingViewObj();
	if (params.isTablet) {
		menuObject = require('ui/tablet/ApplicationWindow');
	} else {
		// Android uses platform-specific properties to create windows.
		// All other platforms follow a similar UI pattern.
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

	//window.add(header);
	var menuBar = require('View/menuBar');
	var mB = new menuBar('Catálogo', Ti.App.dispatcher.changeWindow);
	window.add(mB);
	//window.add(Ti.App.menuBar);
	window.add(footer); 
	window.add(loadingView);
	loadingView.hide();

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
		//Ti.API.info(JSON.stringify(parsedResponse));
		if (Array.isArray(parsedResponse['rines'])) {
			for (var i = 0; i < parsedResponse['rines'].length; i++) {
				Ti.API.info(JSON.stringify(parsedResponse['rines'][i]));
				var row = catalogRow(parsedResponse['rines'][i], params.type);
				
				tableData.push(row);
			}
		} else if (typeof parsedResponse['rines'] == "object"&&parsedResponse['rines']!=null) {
				var row = catalogRow(parsedResponse['rines'], params.type);
				tableData.push(row);
				
				
		}

		table.setData(tableData);
		loadingView.hide();
	}

	var table = Ti.UI.createTableView({
		height : (params.realHeight - (header.height + (footer.height*2))),
		top : header.height,
		width : Ti.UI.FILL,
		separatorColor : "gray"
	});

	Ti.API.info("table " + table.height + " params.realHeight-(header.height+footer.height)" + Ti.App.params.realHeight + " " + header.height + " " + footer.height);

	window.add(table);

	window.addEventListener('open', function() {
		loadingView.show();
		refresh(params.url, getHttpData(params.type), loadData);
		//self.activity.actionBar.hide();
	});

	return window;
};

function catalogRow(rowParams, type) {
	Ti.API.info("catalogoRow"+JSON.stringify(rowParams));
	var row = Ti.UI.createTableViewRow({
		className : 'row',
		height : 120,
		params : rowParams
	});
	row.addEventListener('click', function(){
					row.touchEnabled =false;
					Ti.App.dispatcher.changeWindow(false,'rimDetails',rowParams);
					row.touchEnabled =true;
					
	});
	var nombreLabel = Ti.UI.createLabel({
		color : 'black',
		text : rowParams.modelo,
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		top : 1,
		height : 22,
		left : 105,
		backgroundColor : "lightgray"
	});

	var infoLabel = Ti.UI.createLabel({
		color : 'black',
		text : ('Medida: ' + rowParams.medida), //+'\nBarrenación: '+rowParams.barrenacion+'\nModelo: '+rowParams.modelo,
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		left : 105,
		width : "60%",
		height : 74
	});

	var disponibilidadLabel = Ti.UI.createLabel({
		color : (rowParams.disponibilidad == "1" ? 'green' : 'red'),
		text : (rowParams.disponibilidad == "1" ? 'Disponible' : 'Agotado'),
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		bottom : 1,
		left : 105,
		height : 22,
		width : "60%"
	});

	var image = Ti.UI.createImageView({
		height : 90,
		width : 90,
		left : 10,
		image : rowParams.imagen
	});
	

	Ti.API.info(rowParams.image);
	row.add(nombreLabel);
	row.add(infoLabel);
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
	client.open("GET", url);
	// Send the request.
	client.send();

}

//make constructor function the public component interface
module.exports = CatalogoGenericWindow;
