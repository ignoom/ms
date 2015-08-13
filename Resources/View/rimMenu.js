function RimMenu(title) {
	var self = Ti.UI.createWindow({
		title : title,
		navBarHidden : true,
		backgroundColor : "white"
	});
	var rims = null;
	var selected = false;
	var inches = [];
	var loadingViewObj = require('View/commonElements/loading');
	var loadingView = new loadingViewObj();

	self.add(loadingView);

	var footerObject = require('View/commonElements/footer');
	var footer = new footerObject(Ti.App.params, function() {
	});
	footer.setBottom(0);
	var addViewsPass = function() {
		//  Ti.API.info("dfasdf"+passengerRimObj.data);
		passengerRimObj.view.top = '10%';
		passengerRimObj.view.left = '6%';
		self.add(passengerRimObj.view);
	};

	var addViewsPick = function() {
		//Ti.API.info("dfasdf"+pickupRimObj.data);
		pickupRimObj.view.top = '10%';
		pickupRimObj.view.right = '6%';
		self.add(pickupRimObj.view);

	};

	var hideAll = function() {
		for ( i = 0; i < rims.length; i++) {

		}
	};
	var addViewsRims = function(resp) {
		rims = resp.rines;

		var passRims = [];
		var pickRims = [];

		var passDm = {};
		var pickDm = {};

		var passBarr = {};
		var pickBarr = {};

		var hash = function(obj) {
			
			return obj.diametro;
		};
		var pickHash = function(obj) {
			
			return obj.diametro;
		};
		var hashBarr = function(obj) {
			// Ti.API.info(obj.barrenacion.split("ET")[0]);
			return obj.barrenacion.split("ET")[0];
		};

		for ( i = 0; i < rims.length; i++) {
			if (rims[i].tipo_rin == "passenger") {
				Ti.API.info("pass" + JSON.stringify(rims[i]));
				passRims.push(rims[i]);
				passDm[hash(rims[i])] = rims[i];
				//hashBarr(rims[i]);
				if ( typeof passBarr[hash(rims[i])] === "undefined") {
					passBarr[hash(rims[i])] = [];
				}
				if (passBarr[hash(rims[i])].indexOf(hashBarr(rims[i])) == -1)
					passBarr[hash(rims[i])].push(hashBarr(rims[i]));
 
			} else {
				Ti.API.info("pickup" + JSON.stringify(rims[i]));

				pickRims.push(rims[i]);
				pickDm[hash(rims[i])] = rims[i];
				
				
				if ( typeof pickBarr[hash(rims[i])] === "undefined") {
					pickBarr[hash(rims[i])] = [];
					Ti.API.info("pickup barrenacion nueva" + hash(rims[i]));
				}
				if (pickBarr[hash(rims[i])].indexOf(hashBarr(rims[i])) == -1){
					pickBarr[hash(rims[i])].push(hashBarr(rims[i]));
					Ti.API.info("pickup barrenacion ya" + hash(rims[i]) +"  \\\\\\  "+hashBarr(rims[i]));
				}
			}
		}
		Ti.API.info("pickups: " +  JSON.stringify(rims[i]));


		
		var inch = require('View/commonElements/inches');
		var passengerSizes = ['13', '14', '15', '16', '17', '18', '19', '20', '22', '24'];

		for ( i = 0; i < passengerSizes.length; i++) {
			var per = 30 + i * 5;
			var inch1 = new inch(passengerSizes[i], passBarr[passengerSizes[i]], 'passenger', per);
			self.add(inch1);
			inches.push(inch1);
		}

		var pickupSizes = ['14', '15', '16', '17', '18', '20', '22', '24', '26', '28'];
		for ( i = 0; i < pickupSizes.length; i++) {
			var per = 30 + i * 5;
			var inch1 = new inch(pickupSizes[i], pickBarr["P"+pickupSizes[i]], 'pickup', per);
			self.add(inch1);
			inches.push(inch1);
		}
		Ti.App.addEventListener('inchClick', function(data) {

			for ( i = 0; i < inches.length; i++) {
				if(typeof inches[i] !== "undefined"){
				if (inches[i].type.localeCompare(data.type) == 0 && inches[i].inch.localeCompare(data.inch) == 0) {
					
						if (selected && inches[i].selected) {
							inches[i].setVision(false);
							inches[i].inchButton.backgroundColor="#ffffff";
							
							selected = false;
						} else {
							inches[i].setVision(true);
							inches[i].inchButton.backgroundColor="#ff0000";
							selected = true;
						}
					} else {
						inches[i].setVision(false);
						inches[i].inchButton.backgroundColor="#ffffff";
					}
				}
			}

		});
		loadingView.hide();
	};
	
	var passengerRim = require('Model/rim');
	var passengerRimObj = passengerRim(2, addViewsPass);

	var pickupRim = require('Model/rim');
	var pickupRimObj = pickupRim(1, addViewsPick);


	var url = "http://msmotorsports.mx/ignoom/rines.php";
	//?id="+params.id;
	var conn = require('Controller/connections');

	conn.connect(url, addViewsRims);
	
	
	
	//self.add(Ti.App.menuBar);
	var menuBar = require('View/menuBar');
	var mB = new menuBar('Rines', Ti.App.dispatcher.changeWindow);
	self.add(mB);

	self.add(footer);

	self.addEventListener('open', function() {
		
		loadingView.show();
		setInterval(function(){loadingView.hide();},6000);
		//refresh(params.url,getHttpData(params.type),loadData);
		Ti.API.info("Rim Menu open");
	});

	return self;
};

module.exports = RimMenu;
